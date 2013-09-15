$(document).ready(function () {
  $('.jsSubmit').click(function (e) {
    var serialized;

    e.preventDefault();
    e.stopPropagation();

    serialized = $('.jsForm').serialize();

    $.ajax({
      url: '/submit?' + serialized,
      success: function () {
        console.log('hey we are success at handling');
      },
      error: function () {
        console.log('we are failed');
      }
    });

    console.log('serialized form', serialized);
    
  });
});
