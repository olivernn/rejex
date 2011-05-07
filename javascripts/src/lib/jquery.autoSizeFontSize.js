// # autoScaleFontSize
// A jQuery plugin to autoscale the fontsize of an input elem so that the text can fit without scrolling.
// 
// ## Example
// 
//    $("input").autoScaleFontSize()
// 
// ## Options
// * minFontSize - used to set the minimum font size to scale to
;(function($){
  $.fn.autoScaleFontSize = function(options) {

    // minFontSize is the smallest size in px that the text will be sized at
    var defaults = {
      minFontSize: 9
    }

    var settings = $.extend({}, defaults, options)

    // cache the elems that will be used throughout the plugin
    // input is the form input to auto scale
    // div is a hidden div that will be used to calculate the lenght of the inputs text
    var input = $(this)
    var div = $('<div>', {'id': ['autoScaleFontSize', new Date ().valueOf()].join('-')})

    // the original font size of the input, the font size will never be incremented above this
    var inputFontSize = parseInt(input.css("font-size"), 10)

    // convinience functions to either incrememnt or decrement a number with a given limit.  Any attempt
    // to increment or decrement beyond this limit will do nothing
    var decrementWithLimit = function (number, limit) {
      var number = parseInt(number, 10)
      var limit = limit || 10
      return --number > limit ? number : limit
    }

    var incrementWithLimit = function (number, limit) {
      var number = parseInt(number, 10)
      var limit = limit || 10
      return ++number > limit ? limit : number
    }

    // set the styles for the div so that it is hidden and can be used to calculate the text width
    div.css({
      'position': 'absolute',
      'visibility': 'hidden',
      'height': 'auto',
      'width': 'auto'
    })

    $('body').append(div)

    // explicitly set the input width and height
    input.css({
      'width': input.outerWidth(),
      'height': input.outerHeight()
    })

    // set the text of the div to the value of the input on every keyup
    // if the width of the div is longer than 80% of the input width then reduce the font size
    // if the width of the div is shorter than 70% of the input width then increase the font size
    input.bind('keyup', function () {
      var fontSize = input.css('font-size')
      div.text(input.val())
      if (div.width() > 0.8 * input.width()) {
        input.css("font-size", decrementWithLimit(fontSize, settings.minFontSize))
        div.css("font-size", decrementWithLimit(fontSize, settings.minFontSize))
      } else if (div.width() < 0.7 * input.width()) {
        input.css("font-size", incrementWithLimit(fontSize, inputFontSize))
        div.css("font-size", incrementWithLimit(fontSize, inputFontSize))
      };
    })
  };
})(jQuery);