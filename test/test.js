// Require chai.js expect module for assertions

var chai = require('chai');
var expect = chai.expect;


// Create a new test suite for our Bank Account
describe('Convert query-string to javascript object', function() {
  var parser;
  beforeEach(function () {
    parser = require('../src/parseModule.js');
  });
  describe('Test for inner parser components', function () {
    describe('slice fragment testing', function () {
      it('slice #fragment', function () {
        expect(parser.sliceFragment('?robot=R2D2#1robot'))
          .to.equal('?robot=R2D2');
      });
      it('slice empty string', function () {
        expect(parser.sliceFragment(''))
          .to.equal('');
      });
      it('slice without fragment', function () {
        expect(parser.sliceFragment('?robot=R2D2'))
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
          'Empire+is+наша': 'Council',
          'Emperror': 'Империя+наносит'
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
