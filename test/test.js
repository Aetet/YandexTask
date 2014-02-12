// Require chai.js expect module for assertions

var chai = require('chai');
var expect = chai.expect;

var parser, queryStringBuilder, Diff;

 
describe('Convert query-string to javascript object', function() {
  beforeEach(function () {
    parser = require('../src/QueryString/QueryParser');
  });
  describe('Test for inner parser components', function () {
    describe('slice fragment testing', function () {
      it('slice #fragment', function () {
        expect(parser.sliceFragment('?robot=R2D2#1robot').url)
          .to.equal('?robot=R2D2');
      });
      it('slice empty string', function () {
        expect(parser.sliceFragment('').url)
          .to.equal('');
      });
      it('slice without fragment', function () {
        expect(parser.sliceFragment('?robot=R2D2').url)
          .to.equal('?robot=R2D2');
      });
    });
    describe('normalize queryString testing', function () {
      it('normalize prepend &amp and trailing &amp', function () {
        expect(parser.normalizeQuery('?&Jedi=ObiVan&Sith=Palpatin&'))
          .to.equal('Jedi=ObiVan&Sith=Palpatin');
      });
      it('normalize several &amp and ? in a row', function () {
        expect(parser.normalizeQuery('????&&&&Jedi=ObiVan&&Han=Solo&Sith=Palpatin&&&'))
          .to.equal('Jedi=ObiVan&Han=Solo&Sith=Palpatin');
      });
      it('normalize empty string', function () {
        expect(parser.normalizeQuery(''))
          .to.equal('');
      });
      it('normalize normalized string', function () {
        expect(parser.normalizeQuery('Jedi=ObiVan&Han=Solo&Sith=Palpatin'))
          .to.equal('Jedi=ObiVan&Han=Solo&Sith=Palpatin');
      });
    });
    describe('decodeQueryString testing', function() {
      it('decode string', function () {
        expect(parser.decodeQuery('?Empire%20is%20%D0%BD%D0%B0%D1%88%D0%B0=Council&Emperror=%D0%98%D0%BC%D0%BF%D0%B5%D1%80%D0%B8%D1%8F%20%D0%BD%D0%B0%D0%BD%D0%BE%D1%81%D0%B8%D1%82'))
          .to.equal('?Empire is наша=Council&Emperror=Империя наносит');

      });
      it('decode normal string', function () {
        expect(parser.decodeQuery('?Empire is наша=Council&Emperror=Империя наносит'))
          .to.equal('?Empire is наша=Council&Emperror=Империя наносит');

      });
      it('decode empty string', function () {
        expect(parser.decodeQuery(''))
          .to.equal('');

      });
    });
  });
  describe('parse testing', function () {
    it('trailing &amp processing', function () {
      expect(parser.parse('?&Jedi=ObiVan&Sith=Palpatin&'))
        .to.deep.equal({
          'Jedi': 'ObiVan',
          'Sith': 'Palpatin'
        });
    });

    it('doubling &amp', function () {
      expect(parser.parse('?&Jaja=SithLord&&foo=bar&'))
        .to.deep.equal({
          'Jaja': 'SithLord',
          'foo': 'bar'
        });
    });

    it('spaces and cyrillic in keys processing', function () {
      expect(parser.parse('?Empire is наша=Council&Emperror=Империя наносит'))
        .to.deep.equal({
          'Empire is наша': 'Council',
          'Emperror': 'Империя наносит'
        });
    });
    it('decoded spaces and cyrillic in keys processing', function () {
      expect(parser.parse('?Empire%20is%20%D0%BD%D0%B0%D1%88%D0%B0=Council&Emperror=%D0%98%D0%BC%D0%BF%D0%B5%D1%80%D0%B8%D1%8F%20%D0%BD%D0%B0%D0%BD%D0%BE%D1%81%D0%B8%D1%82'))
        .to.deep.equal({
          'Empire is наша': 'Council',
          'Emperror': 'Империя наносит'
        });
    });

    it('double equals processing', function () {
      expect(parser.parse('?Leya==Organa&Han=Solo'))
        .to.deep.equal({
          'Leya': '=Organa',
          'Han': 'Solo'
        });
    });

    it('key without value', function () {
      expect(parser.parse('?&Corusant&Holocron=Sith&Jedi=Knight'))
        .to.deep.equal({
          'Corusant': null,
          'Holocron': 'Sith',
          'Jedi': 'Knight'
        });
    });

    it('doubling keys', function () {
      expect(parser.parse('?Skywalker=Jedi&Skywalker=Sith&Joda=Master'))
        .to.have.property('Skywalker').to.have.members(["Jedi", "Sith"]);
      expect(parser.parse('?Skywalker=Jedi&Skywalker=Sith&Joda=Master'))
        .to.have.property('Joda', 'Master');
    });
  });
});
describe('Convert query-string to javascript object', function() {
  beforeEach(function () {
    Diff = require('../src/QueryString/Diff');
  });
  describe('Difference always matter', function () {
    it('test for equal objects', function () {
      expect(Diff.diffQueryStringObjects({a: 1}, {a: 1}))
        .to.deep.equal({});
    });
    it('just one difference between us', function () {
      expect(Diff.diffQueryStringObjects({a: 1}, {a: 2}))
        .to.deep.equal({a: {obj1: 1, obj2: 2}});
    });
    it('difference between array and single value', function () {
      expect(Diff.diffQueryStringObjects({a: 1}, {a: [1,2]}))
        .to.deep.equal({a: {obj1: [], obj2: [2]}});
    });
    it('equality in the crowd is possible?', function () {
      expect(Diff.diffQueryStringObjects({a: [1,2,3]}, {a: [1,2,3]}))
        .to.deep.equal({});
    });
    it('but not in crowd is always equal', function () {
      expect(Diff.diffQueryStringObjects({
        a: [1,2,3]
      }, {
        a: [1,2,4]
      })).to.deep.equal({
          a: {
            obj1: [3],
            obj2: [4]
          }
        });
    });
    it('We are too different arrays', function () {
      expect(Diff.diffQueryStringObjects({a: [1,2,3]}, {a: [4,5,6]}))
        .to.deep.equal({
          a: {
            obj1: [1,2,3],
            obj2: [4,5,6]
          }
        });
    });
    it('mighty test for every case', function () {
      var obj1 = {
        a: 1,
        b: 2,
        c: [1,2,3,1],
        d: 3,
        f: 0,
        h: 4,
        g: [1,2,3,1]
      };
      var obj2 = {
        a: 1,
        b: 3,
        c: [1,2,3,1],
        e: 4,
        f: undefined,
        h: '4',
        g: [1,2,4]
      };

      expect(Diff.diffQueryStringObjects(obj1, obj2))
        .to.deep.equal({
          b: {obj1: 2, obj2: 3},
          d: 3,
          e: 4,
          f: {obj1: 0, obj2: undefined},
          g: {obj1: [3], obj2: [4]}
        });
    });
  });
});
describe('Object to queryString', function () {
  var obj;
  beforeEach(function () {
    queryStringBuilder = require('../src/QueryString/queryStringBuilder');

    obj = {
        Sith: ["Дарт", "Sidius", "Anakin"],
        Jedi: ["ObiVan", "Quai-gon", "Mace Vindoo"],
        Yoda: "Master"
    };
  });

  it('add queryString to normal URL', function () {

    expect(queryStringBuilder(obj, 'http://ya.ru'))
      .to.be.equal('http://ya.ru?Sith%3D%D0%94%D0%B0%D1%80%D1%82%26Sith%3DSidius%26Sith%3DAnakin%26Jedi%3DObiVan%26Jedi%3DQuai-gon%26Jedi%3DMace%20Vindoo%26Yoda%3DMaster');
  });
  it('add queryString to fragmentedURL', function () {
    expect(queryStringBuilder(obj, 'http://ya.ru#frag'))
      .to.be.equal('http://ya.ru?Sith%3D%D0%94%D0%B0%D1%80%D1%82%26Sith%3DSidius%26Sith%3DAnakin%26Jedi%3DObiVan%26Jedi%3DQuai-gon%26Jedi%3DMace%20Vindoo%26Yoda%3DMaster%23frag');
  });
  it('add queryString to already-defined query url', function () {
    expect(queryStringBuilder(obj, 'http://ya.ru?flag=first&flag=second&Jedi=Solo#frag'))
      .to.be.equal('http://ya.ru?flag=first&flag=second&Jedi=Solo%26Sith%3D%D0%94%D0%B0%D1%80%D1%82%26Sith%3DSidius%26Sith%3DAnakin%26Jedi%3DObiVan%26Jedi%3DQuai-gon%26Jedi%3DMace%20Vindoo%26Yoda%3DMaster%23frag');
  });

});
