jQuery.fn.inlineLabels = function() {
  return this.each(function(options){
    var settings = jQuery.extend({
      opacity: 0.5,
      speed: 400
    }, options);

    var $input = jQuery(this)
    var labelId = '#' + jQuery(this).attr('id') + '_label';
    var $label = jQuery(labelId)

    jQuery(this).focus(function () {
      if ($input.val()) {
        $label.animate({
          opacity: 0
        }, settings['speed']);
      } else {
        $label.animate({
          opacity: settings['opacity']
        }, settings['speed']);
      };
    });

    $input.keypress(function (event) {
      $label.animate({
        opacity: 0
      }, 50)
    });

    $input.blur(function () {
      if (!$input.val()) {
        $label.animate({
          opacity: 1
        }, settings['speed'])
      };
    });
  });
};