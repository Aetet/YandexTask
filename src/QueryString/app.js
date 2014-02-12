(function () {
  var firstField,
      secondField,
      resultField,
      resultButton;
      
  firstField = document.querySelector('.jsFirstQuery');
  secondField = document.querySelector('.jsSecondQuery');
  resultField = document.querySelector('.jsResultQuery');
  resultButton = document.querySelector('.jsSubmit');

  resultButton.addEventListener('click', function (e) {
    var firstValue,
        secondValue,
        firstQueryObject,
        secondQueryObject,
        diff;
    firstValue = firstField.value;
    secondValue = secondField.value;

    firstQueryObject = QueryParser.parse(firstValue);
    secondQueryObject = QueryParser.parse(secondValue);

    diff = Diff.diffQueryStringObjects(firstQueryObject, secondQueryObject);

    resultField.innerHTML = JSON.stringify(diff);
  });
})();