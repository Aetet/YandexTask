// Require chai.js expect module for assertions

var chai = require('chai');
var expect = chai.expect;


// Create a new test suite for our Bank Account
describe('Convert query-string to javascript object', function() {
  var parse;
  beforeEach(function () {
    parse = require('../parseModule.js');
  });
  it('trailing &amp processing', function () {
    expect(parse('?&Jedi=ObiVan&Sith=Palpatin&'))
      .to.deep.equal({
        'Jedi': 'ObiVan',
        'Sith': 'Palpatin'
      });
  });

  it('doubling &amp', function () {
    expect(parse('?&Jaja=SithLord&&foo=bar&'))
      .to.deep.equal({
        'Jaja': 'SithLord', 
        'foo': 'bar'
      });
  });

  it('spaces and cyrillic in keys processing', function () {
    expect(parse('?Empire is наша=Council&Emperror=Империя наносит'))
      .to.deep.equal({
        'Empire+is+наша': 'Council',
        'Emperror': 'Империя+наносит'
      });
  });

  it('double equals processing', function () {
    expect(parse('?Leya==Organa&Han=Solo'))
      .to.deep.equal({
        'Leya': '=Organa',
        'Han': 'Solo'
      });
  });

  it('key without value', function () {
    expect(parse('?&Corusant&Holocron=Sith&Jedi=Knight'))
      .to.deep.equal({
        'Corusant': null,
        'Holocron': 'Sith',
        'Jedi': 'Knight'
      });
  });

  it('doubling keys', function () {
    expect(parse('?Skywalker=Jedi&Skywalker=Sith&Joda=Master'))
      .to.have.property('Skywalker').to.have.members(["Jedi", "Sith"]);
    expect(parse('?Skywalker=Jedi&Skywalker=Sith&Joda=Master'))
      .to.have.property('Joda', 'Master');
  });
});
