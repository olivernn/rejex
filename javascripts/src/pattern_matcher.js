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
  },

  matches: function () {
    if (this.valid) {
      return Array.wrap(this.regExp.exec(this.testString)).filter(function (str, idx) {
        return (idx > 0)
      })
    };
  }
}