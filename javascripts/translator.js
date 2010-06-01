Translator = function () {
  this.translatorCounter = 0
  this.phraseCount = 4
  this.text = {
    expression_label: {
      en: 'Your Regular Expression'
    },
    options_label: {
      en: 'Options'
    },
    test_string_label:{
      en: 'Your Test String'
    },
    matches_label: {
      en: 'Match Result'
    }
  };
}

Translator.prototype = {

  detectLanguage: function () {
    // won't work in IE yet
    // this.language = window.navigator.language.substr(0, 2)
    this.language = 'es'
  },

  displayTranslation: function () {
    var self = this
    if (self.translationCount == self.phraseCount) {
      $.each(this.text, function (id, dictionary) {
        $('#' + id).text(self.text[id][self.language])
      })
    };
  },

  performTranslation: function () {
    var self = this
    $.each(this.text, function (id, dictionary) {
      google.language.translate(dictionary.en, 'en', self.language, function (result) {
        if (!result.error) {
          self.text[id][self.language] = result.translation
          self.translationCount++
          self.displayTranslation();
        };
      })
    })
  },

  translate: function () {
    this.translationCount = 0
    this.detectLanguage()
    this.performTranslation()
  }
}