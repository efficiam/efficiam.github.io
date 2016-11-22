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
      _hide(element);
    });
  };

  FadeOnScroll.prototype.init = function() {
    var self = this;

    if(!Array.isArray(self.elements))
      return;

    // First check
    self.requestUpdate();

    window.onscroll = function() {
      self.requestUpdate();
    };
  };

  FadeOnScroll.prototype.requestUpdate = function() {
    var self = this;

    if(!self.tick)
      reqAF(_doFade.bind(self));

    self.tick = true;
  };

  function _doFade() {
    var self = this;

    self.tick = false;

    if(!self.elements.length)
      return;

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
    var elementPosition = element.getBoundingClientRect().top;

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

  // Three js to refactor
  addPolyTo(document.querySelector('.u-bg-poly'));
  addPolyTo(document.querySelector('footer'), {size: 'small', lightPosition: 'up'});

  function addPolyTo(el, opts) {
    var opts = opts || {};
    var windowWidth = window.outerWidth;
    var windowHeight = window.outerHeight;
    var screenWidth = screen && screen.width;
    var screenHeight = screen && screen.height;
    var width = el.getBoundingClientRect().width;
    var height = el.getBoundingClientRect().height;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    var blue = new THREE.Color(0xbd19f5);
    var violet = new THREE.Color(0x3c73db);
    var gradientGeometry;
    var gradientMaterial;
    var gradientPlane;
    var polyGeometry;
    var polyMaterial;
    var polyPlane;
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(width, height);
    el.appendChild(renderer.domElement);

    var light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(0, 1, 0);
    scene.add(light);

    camera.position.z = 12;
    var compound = function(x, time) {
      return (Math.sin(x + time /500) + Math.sin(2.2 * x + time /500 - 2.3) + Math.sin(4.75 * x + time /500 + 8)) / 8
    };

    var initialTime = new Date();

    function addPlanes(width, height) {
      var ratio = width/height;
      var round = Math.round;
      var baseSize = 50;
      var baseSegments = opts.size === 'small' ? 5 : 10;
      var width = round(baseSize * ratio);
      var height = round(baseSize * ratio);
      var widthSegments = round(baseSegments * ratio);
      var heightSegments = round(baseSegments * ratio);

      gradientGeometry = new THREE.PlaneGeometry(width, height);
      gradientMaterial = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
      });

      gradientPlane = new THREE.Mesh(gradientGeometry, gradientMaterial);
      gradientPlane.position.z = -5
      gradientPlane.rotation.z -= 1

      gradientGeometry.faces[0].vertexColors = [violet, violet, blue];
      gradientGeometry.faces[1].vertexColors = [violet, blue, blue];
      scene.add(gradientPlane);

      polyGeometry = new THREE.PlaneGeometry(
        width,
        height,
        widthSegments,
        heightSegments
      );

      polyMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xff0000,
        shading: THREE.FlatShading,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      polyGeometry.vertices.forEach(function(v) {
        v.x += (Math.random() - 0.5)*1.5;
        v.y += (Math.random() - 0.5)*1.5;
      });


      polyPlane = new THREE.Mesh(polyGeometry, polyMaterial);
      polyPlane.rotation.z -= 1

      scene.add(polyPlane);
    }

    function render() {
      requestAnimationFrame(render);
      var newTime = new Date();
      var time = (newTime - initialTime) / 2.5;
      polyGeometry.vertices.forEach(function(v) {
        v.z =  compound(Math.cos(v.x), time);
      });
      polyPlane.material.needsUpdate =true
      polyPlane.geometry.verticesNeedUpdate = true;
    	renderer.render(scene, camera);
    }

    addPlanes(width, height);
    render();

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('orientationchange', onWindowResize, false);

    function onWindowResize() {
      var newWidth = el.getBoundingClientRect().width;
      var newHeight = el.getBoundingClientRect().height;
      if (newHeight !== height || newWidth !== width) {
        height = newHeight;
        width = newWidth;
        scene.children.pop();
        scene.children.pop();
        addPlanes(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
    		camera.updateProjectionMatrix();
    		renderer.setSize(newWidth, newHeight);
      }
  	}
  }

})(document, window);
