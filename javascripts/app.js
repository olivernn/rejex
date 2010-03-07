$(document).ready(function() {
  // fade in and out the inline form labels
  $('input, textarea').focus(function () {
    var label_id = "#" + $(this).attr('id') + "_label"
    $(label_id).animate({
      opacity: 0
    }, 400);
  }).blur(function () {
    var label_id = "#" + $(this).attr('id') + "_label"
    if (!$(this).val()) {
      $(label_id).animate({
        opacity: 1
      }, 400);
    };
  });

  // display the options help
  $('#options').focus(function () {
    $('#options_help').animate({
      opacity: 1
    }, 400);
  }).blur(function () {
    $('#options_help').animate({
      opacity: 0
    }, 400);
  });

  // highlight any matches and display them
  $('form').find('input, textarea').keyup(function (e) {
    // don't try and do any highlighting when pressing the tab key
    if ($('#expression').val()) {
      var p = new PatternMatcher ({
        pattern: $('#expression').val(),
        testString: $('#test_string').val(),
        regExpOptions: $('#options').val()
      });
      $('#matches').html(p.highlight());
    };
  })
});
