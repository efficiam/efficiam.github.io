// IE polyfill for isInteger
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

(function(document, window) {

  var FadeOnScroll = function(opts) {
    this.elements   = opts.elements || null;
    this.threshold  = Number.isInteger(opts.threshold) ? opts.threshold : 5;

    this.elements.forEach(function(element) {
      _hide(element);
    });
  };

  FadeOnScroll.prototype.init = function() {
    var self = this;

    if(!Array.isArray(this.elements))
      return;

    // First check
    self.elements.forEach(function(element) {
      if(_isOnScreen(element, self.threshold))
        _show(element);
    });

    window.addEventListener('scroll', function() {
      self.elements.forEach(function(element) {
        if(_isOnScreen(element, self.threshold))
          _show(element);
      });
    });
  };

  function _isOnScreen(element, threshold) {
    var viewportHeight  = window.innerHeight;
    var elementPosition = element.getBoundingClientRect().top;

    return -(elementPosition - viewportHeight) >= threshold;
  }

  function _show(element) {
    element.style.visibility  = 'visible';
    element.style.opacity     = 1;
  }

  function _hide(element) {
    element.style.visibility  = 'hidden';
    element.style.opacity     = 0;
  }

  window.FadeOnScroll = FadeOnScroll;

})(document, window);
