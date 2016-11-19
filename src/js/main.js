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
  
  // Three js to refactor
  var container = document.querySelector('.u-bg-poly');
  var width = container.getBoundingClientRect().width;
  var height = container.getBoundingClientRect().height;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
  
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  
  var light = new THREE.PointLight();
  light.position.set(200, 200, 400);
  scene.add(light);
  
  var compound = function(x, time) {
    return (Math.sin(x + time /500) + Math.sin(2.2 * x + time /500 - 2.3) + Math.sin(4.75 * x + time /300 + 8)) / 8
  };
  
  var geometry = new THREE.PlaneGeometry(50, 50);
  var material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors
  });
  
  var plane = new THREE.Mesh(geometry, material);
  plane.position.z = -5
  plane.rotation.z += 2
  
  var blue = new THREE.Color(0xbd19f5);
  var violet = new THREE.Color(0x3c73db);
  geometry.faces[0].vertexColors = [blue, blue, violet];
  geometry.faces[1].vertexColors = [blue, violet, violet];
  scene.add(plane);
  
  var geometry = new THREE.PlaneGeometry(30, 50, 10, 15);
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xF52E0F,
    shading: THREE.FlatShading,
    blending: THREE.MultiplyBlending,
    transparent: true
  });
  geometry.vertices.forEach(function(v) {
    v.x += (Math.random() - 0.5);
    v.y += (Math.random() - 0.5);
  });
  var plane = new THREE.Mesh(geometry, material);
  plane.rotation.z += 2
  scene.add(plane);
  
  camera.position.z = 10
  
  var initialTime = new Date()
  
  function render() {
    requestAnimationFrame( render );
    var newTime = new Date()
    var time = newTime - initialTime
    geometry.vertices.forEach(function(v) {
      v.z =  compound(v.x, time/3);
    });
    plane.material.needsUpdate =true
    plane.geometry.verticesNeedUpdate = true;  
  	renderer.render(scene, camera);
  }
  
  render();
  
  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize() {
    var width = container.getBoundingClientRect().width;
    var height = container.getBoundingClientRect().height;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize( width, height );
	}


})(document, window);
