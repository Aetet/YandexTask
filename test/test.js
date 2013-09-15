// Require chai.js expect module for assertions

var chai = require('chai');
var expect = chai.expect;

var URI;

// Create a new test suite for our Bank Account
describe('Convert query-string to javascript object', function() {
  beforeEach(function () {
    URI = require('../src/util/URIParser.js');
  });
  describe('constructor test', function () {
    describe('constructor with empty string', function () {
      var uri;
      beforeEach(function () {
        uri = URI('');
      });
      it('test path after constructor init', function () {
        expect(uri.parts.path).is.equal(null);
      });
      it('test query after constructor init', function () {
        expect(uri.parts.query).is.equal(null);
      });
      it('test fragment after constructor init', function () {
        expect(uri.parts.fragment).is.equal(null);
      });
    });
    describe('constructor with query without fragment', function () {
      beforeEach(function () {
        uri = URI('/home?foo=bar&foo=baz');
      });
      it('test path after constructor init', function () {
        expect(uri.parts.path).is.equal('/home');
      });
      it('test query after constructor init', function () {
        expect(uri.parts.query).is.equal('foo=bar&foo=baz');
      });
      it('test fragment after constructor init', function () {
        expect(uri.parts.fragment).is.equal(null);
      });
    });
    describe('constructor with fragment without query', function () {
      beforeEach(function () {
        uri = URI('/home#foo');
      });
      it('test path after constructor init', function () {
        expect(uri.parts.path).is.equal('/home');
      });
      it('test query after constructor init', function () {
        expect(uri.parts.query).is.equal(null);
      });
      it('test fragment after constructor init', function () {
        expect(uri.parts.fragment).is.equal('foo');
      });
    });
    describe('constructor with path only', function () {
      beforeEach(function () {
        uri = URI('/path');
      });
      it('test path after constructor init', function () {
        expect(uri.parts.path).is.equal('/path');
      });
      it('test query after constructor init', function () {
        expect(uri.parts.query).is.equal(null);
      });
      it('test fragment after constructor init', function () {
        expect(uri.parts.fragment).is.equal(null);
      });
    });
    describe('constructor with all elements', function () {
      beforeEach(function () {
        uri = URI('/path?foo=bar&foo=baz#lock');
      });
      it('test path after constructor init', function () {
        expect(uri.parts.path).is.equal('/path');
      });
      it('test query after constructor init', function () {
        expect(uri.parts.query).is.equal('foo=bar&foo=baz');
      });
      it('test fragment after constructor init', function () {
        expect(uri.parts.fragment).is.equal('lock');
      });
    });
  });
  describe('Test for inner parser components', function () {
    describe('slice fragment testing', function () {
      it('slice #fragment', function () {
        expect(URI.sliceFragment('?robot=R2D2#1robot'))
          .to.equal('?robot=R2D2');
      });
      it('slice empty string', function () {
        expect(URI.sliceFragment(''))
          .to.equal('');
      });
      it('slice without fragment', function () {
        expect(URI.sliceFragment('?robot=R2D2'))
          .to.equal('?robot=R2D2');
      });
    });
    describe('normalize queryString testing', function () {
      it('normalize prepend &amp and trailing &amp', function () {
        expect(URI.normalizeQuery('?&Jedi=ObiVan&Sith=Palpatin&'))
          .to.equal('Jedi=ObiVan&Sith=Palpatin');
      });
      it('normalize several &amp and ? in a row', function () {
        expect(URI.normalizeQuery('????&&&&Jedi=ObiVan&&Han=Solo&Sith=Palpatin&&&'))
          .to.equal('Jedi=ObiVan&Han=Solo&Sith=Palpatin');
      });
      it('normalize empty string', function () {
        expect(URI.normalizeQuery(''))
          .to.equal('');
      });
      it('normalize normalized string', function () {
        expect(URI.normalizeQuery('Jedi=ObiVan&Han=Solo&Sith=Palpatin'))
          .to.equal('Jedi=ObiVan&Han=Solo&Sith=Palpatin');
      });
    });
    describe('decodeQueryString testing', function() {
      it('decode string', function () {
        expect(URI.decodeQuery('?Empire%20is%20%D0%BD%D0%B0%D1%88%D0%B0=Council&Emperror=%D0%98%D0%BC%D0%BF%D0%B5%D1%80%D0%B8%D1%8F%20%D0%BD%D0%B0%D0%BD%D0%BE%D1%81%D0%B8%D1%82'))
          .to.equal('?Empire is наша=Council&Emperror=Империя наносит');

      });
      it('decode normal string', function () {
        expect(URI.decodeQuery('?Empire is наша=Council&Emperror=Империя наносит'))
          .to.equal('?Empire is наша=Council&Emperror=Империя наносит');

      });
      it('decode empty string', function () {
        expect(URI.decodeQuery(''))
          .to.equal('');

      });
    });
  });
  describe('parse testing', function () {
    it('trailing &amp processing', function () {
      expect(URI.parseQuery('?&Jedi=ObiVan&Sith=Palpatin&'))
        .to.deep.equal({
          'Jedi': 'ObiVan',
          'Sith': 'Palpatin'
        });
    });

    it('doubling &amp', function () {
      expect(URI.parseQuery('?&Jaja=SithLord&&foo=bar&'))
        .to.deep.equal({
          'Jaja': 'SithLord', 
          'foo': 'bar'
        });
    });

    it('spaces and cyrillic in keys processing', function () {
      expect(URI.parseQuery('?Empire is наша=Council&Emperror=Империя наносит'))
        .to.deep.equal({
          'Empire is наша': 'Council',
          'Emperror': 'Империя наносит'
        });
    });
    it('decoded spaces and cyrillic in keys processing', function () {
      expect(URI.parseQuery('?Empire%20is%20%D0%BD%D0%B0%D1%88%D0%B0=Council&Emperror=%D0%98%D0%BC%D0%BF%D0%B5%D1%80%D0%B8%D1%8F%20%D0%BD%D0%B0%D0%BD%D0%BE%D1%81%D0%B8%D1%82'))
        .to.deep.equal({
          'Empire is наша': 'Council',
          'Emperror': 'Империя наносит'
        });
    });

    it('double equals processing', function () {
      expect(URI.parseQuery('?Leya==Organa&Han=Solo'))
        .to.deep.equal({
          'Leya': '=Organa',
          'Han': 'Solo'
        });
    });

    it('key without value', function () {
      expect(URI.parseQuery('?&Corusant&Holocron=Sith&Jedi=Knight'))
        .to.deep.equal({
          'Corusant': null,
          'Holocron': 'Sith',
          'Jedi': 'Knight'
        });
    });

    it('doubling keys', function () {
      expect(URI.parseQuery('?Skywalker=Jedi&Skywalker=Sith&Joda=Master'))
        .to.have.property('Skywalker').to.have.members(["Jedi", "Sith"]);
      expect(URI.parseQuery('?Skywalker=Jedi&Skywalker=Sith&Joda=Master'))
        .to.have.property('Joda', 'Master');
    });
  });
  describe('difference between requests', function () {
    describe('difference between two strings with the same property name', function () {
      expect(URI.diffQuery('?Skywalker=Enakin','?Skywalker=Luke'))
        .to.have.property('Skywalker')
          .to.have.property('first', 'Enakin');
      expect(URI.diffQuery('?Skywalker=Enakin','?Skywalker=Luke'))
        .to.have.property('Skywalker')
          .to.have.property('second', 'Luke');
      expect(URI.diffQuery('?Skywalker=Enakin','?Skywalker=Luke'))
        .to.have.property('Skywalker')
          .to.have.property('both', '');
    });
    describe('difference between array and other property value with the same property name', function () {
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Skywalker=Luke'))
        .to.have.property('Skywalker')
          .to.have.property('first').to.have.members(['Enakin', 'Mara']);
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Skywalker=Luke'))
        .to.have.property('Skywalker')
          .to.have.property('second', 'Luke');
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Skywalker=Luke'))
        .to.have.property('Skywalker')
          .to.have.property('both', '');

    });
    describe('difference between different objects', function () {
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Wookie=Chubaka'))
        .to.have.property('Skywalker')
          .to.have.property('first', 'Enakin');
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Wookie=Chubaka'))
        .to.have.property('Skywalker')
          .to.have.property('first', 'Mara');
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Wookie=Chubaka'))
        .to.have.property('Skywalker')
          .to.have.property('second', '');
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Wookie=Chubaka'))
        .to.have.property('Skywalker')
          .to.have.property('both', '');
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Wookie=Chubaka'))
        .to.have.property('Wookie')
          .to.have.property('first', '');
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Wookie=Chubaka'))
        .to.have.property('Wookie')
          .to.have.property('second', 'Chubaka');
      expect(
        URI.diffQuery('?Skywalker=Enakin&Skywalker=Mara', '?Wookie=Chubaka'))
        .to.have.property('Wookie')
          .to.have.property('both', '');
    });
  });
});
