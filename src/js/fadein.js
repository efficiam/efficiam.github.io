// IE polyfill for isInteger
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

// Matches polyfill
var matches = function(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};

// requestAnimationFrame
var reqAF = window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.msRequestAnimationFrame     ||
            window.oRequestAnimationFrame      ||
            function(callback){ window.setTimeout(callback, 1000/60) };

(function(document, window) {

  var FadeOnScroll = function(opts) {
    this.elements   = opts.elements || null;
    this.threshold  = Number.isInteger(opts.threshold) ? opts.threshold : 5;
    this.tick       = false;

    this.elements.forEach(function(element) {
      // The position of the element from top.
      element.positionFromTop =
        element.getBoundingClientRect().top + document.body.scrollTop;

      _hide(element);
    });

    this.requestUpdate = this.requestUpdate.bind(this);
  };

  FadeOnScroll.prototype.init = function() {
    var self = this;

    if(!Array.isArray(self.elements))
      return;

    // First check
    self.requestUpdate();

    window.addEventListener('scroll', self.requestUpdate, false);
  };

  FadeOnScroll.prototype.requestUpdate = function() {
    var self = this;

    if(!self.tick) {
      reqAF(_doFade.bind(self));
    }

    self.tick = true;
  };

  function _doFade() {
    var self = this;

    self.tick = false;

    if (!self.elements.length) {
      window.removeEventListener('scroll', self.requestUpdate, false);
      return;
    }

    var updatedElements = [];

    self.elements.forEach(function(element, index) {
      if(!_isOnScreen(element, self.threshold)) {
        updatedElements.push(element);
        return;
      }

      _show(element);
    });

    self.elements = updatedElements;
  }

  function _isOnScreen(element, threshold) {
    var viewportHeight  = window.innerHeight;
    var elementPosition =
      element.positionFromTop - document.body.scrollTop;

    return -(elementPosition - viewportHeight) >= threshold;
  }

  function _show(element) {
    element.style.visibility  = 'visible';
    element.style.opacity     = 1;

    if(matches(element, '.js-fadeFromLeft'))
      element.style.transform = 'translateX(0)';

    if(matches(element, '.js-fadeFromRight'))
      element.style.transform = 'translateX(0)';
  }

  function _hide(element) {
    element.style.visibility  = 'hidden';
    element.style.opacity     = 0;

    if(matches(element, '.js-fadeFromLeft'))
      element.style.transform = 'translateX(-50px)';

    if(matches(element, '.js-fadeFromRight'))
      element.style.transform = 'translateX(50px)';
  }

  window.FadeOnScroll = FadeOnScroll;

})(document, window);
