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
    // won't work in IE yet
    // this.language = window.navigator.language.substr(0, 2)
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