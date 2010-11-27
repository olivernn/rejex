/*  Rejex JavaScript Application, version 40bca0c8c4eb4e105fb80e971efb3c47059a7a74
 *  (c) 2010 Oliver Nightingale
 *
 *  Released under MIT license.
 */
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
PatternMatcher = function (options) {
  this.regExpOptions = options.regExpOptions || ""
  this.pattern = options.pattern || "";
  this.testString = options.testString || "";
  if (this.pattern) {
    this.buildRegExp(this.pattern, this.regExpOptions)
  };
  this.matchClass = options.matchClass || 'match';
}

PatternMatcher.prototype = {
  buildRegExp: function (pattern, opts) {
    try {
      this.regExp = new RegExp (pattern, opts);
      this.valid = true;
    }
    catch (e) {
      this.valid = false;
      this.regExp = null;
    }
  },

  highlight: function () {
    if (this.valid) {
      if (this.regExp.test(this.testString)) {
        return this.testString.replace(this.regExp, function (match) {
          return "<span class='match'>" + match + "</span>";
        });
      } else {
        return "No Match";
      };
    } else {
      return "<span class='error'>Invalid regular expression</span>";
    };
  }
}
Translator = function () {
  this.translatorCounter = 0
  this.phraseCount = 4
  this.text = {
    en: {
      expression_label: 'Your Regular Expression',
      options_label: 'Options',
      test_string_label: 'Your Test String',
      matches_label: 'Match Result',
      case_insensitive_matching: 'case insensitive matching',
      global_matching: 'global matching',
      multiline_matching: 'multiline matching'
    }
  }
}

Translator.prototype = {

  detectLanguage: function () {
    this.language = 'en'
  },

  displayTranslation: function () {
    var self = this
    if (self.translationCount == self.phraseCount) {
      $.each(this.text[this.language], function (id, translatedString) {
        $('#' + id).text(translatedString)
      })
    };
  },

  performTranslation: function () {
    var self = this
    $.each(this.text['en'], function (id, englishString) {
      google.language.translate(englishString, 'en', self.language, function (result) {
        if (!result.error) {
          self.text[self.language][id] = result.translation
          self.translationCount++
          self.displayTranslation();
        };
      })
    })
  },

  translate: function () {
    this.translationCount = 0
    this.detectLanguage()
    this.text[this.language] = {}
    this.performTranslation()
  }
}
$(document).ready(function() {


  $('input, textarea').inlineLabels();

  $('#options').focus(function () {
    $('#options_help').animate({
      opacity: 1
    }, 400);
  }).blur(function () {
    $('#options_help').animate({
      opacity: 0
    }, 400);
  });

  $('form').find('input, textarea').keyup(function (e) {
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
