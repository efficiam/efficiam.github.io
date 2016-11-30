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
    });

    this.requestUpdate = this.requestUpdate.bind(this);
  };

  FadeOnScroll.prototype.init = function() {
    if (!Array.isArray(this.elements)) return;

    // First check
    this.requestUpdate();

    window.addEventListener('scroll', this.requestUpdate, false);
  };

  FadeOnScroll.prototype.requestUpdate = function() {
    if (this.tick) return;
    this.tick = true;
    reqAF(_doFade.bind(this));
  };

  function _doFade() {
    if (!this.elements.length) {
      window.removeEventListener('scroll', this.requestUpdate, false);
      return;
    }

    this.elements.forEach(function(element, index) {
      if(_isOnScreen(element, this.threshold)) {
        _show(element);
        delete this.elements[index];
      }
    }, this);
    
    this.tick = false;
  }

  function _isOnScreen(element, threshold) {
    var viewportHeight  = window.innerHeight;
    var scrollTop = window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop || 0;
    var relElementPosition = scrollTop - element.positionFromTop;

    return (viewportHeight + relElementPosition) >= threshold;
  }

  function _show(element) {
    if (element.classList) {
      element.classList.add('c-fadein-box--visible');
    } else {
      element.className += ' ' + 'c-fadein-box--visible';
    }
  }

  window.FadeOnScroll = FadeOnScroll;

})(document, window);
