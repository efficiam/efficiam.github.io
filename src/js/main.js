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
  var windowWidth = window.outerWidth;
  var windowHeight = window.outerHeight;
  var container = document.querySelector('.u-bg-poly');
  var width = container.getBoundingClientRect().width;
  var height = container.getBoundingClientRect().height;
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
  container.appendChild(renderer.domElement);
  
  var light = new THREE.DirectionalLight();
  light.position.set(0, 300, 250);
  // var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.3 );/
  scene.add(light);
  
  camera.position.z = 12;  
  var compound = function(x, time) {
    return (Math.sin(x + time /500) + Math.sin(2.2 * x + time /500 - 2.3) + Math.sin(4.75 * x + time /500 + 8)) / 8
  };
  
  var initialTime = new Date();
  
  function addPlanes(width, height) {
    var ratio = width/height;
    var round = Math.round;
    var width = round(40 * ratio);
    var height = round(40 * ratio);
    var widthSegments = round(10 * ratio);
    var heightSegments = round(10 * ratio);
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
      // specular: 0xF52E0F,rgb(156, 74, 146)
      shading: THREE.FlatShading,
      blending: THREE.MultiplyBlending,
      transparent: true
    });
    
    polyGeometry.vertices.forEach(function(v) {
      v.x += (Math.random() - 0.5)*2.2;
      v.y += (Math.random() - 0.5)*2.2;
    });
    
    
    polyPlane = new THREE.Mesh(polyGeometry, polyMaterial);
    polyPlane.rotation.z -= 1
    
    scene.add(polyPlane);
  }
  
  function render() {
    requestAnimationFrame(render);
    var newTime = new Date();
    var time = (newTime - initialTime) / 3;
    polyGeometry.vertices.reverse().forEach(function(v) {
      v.z =  compound(v.x, time);
    });
    polyPlane.material.needsUpdate =true
    polyPlane.geometry.verticesNeedUpdate = true;
  	renderer.render(scene, camera);
  }
  
  addPlanes(width, height);
  render();
  
  window.addEventListener('resize', onWindowResize, false);
  
  function onWindowResize() {
    if (windowWidth === window.outerWidth && 
        windowHeight === window.outerHeight) return;
    var newWidth = container.getBoundingClientRect().width;
    var newHeight = container.getBoundingClientRect().height;
    scene.children.pop();
    scene.children.pop();
    addPlanes(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(newWidth, newHeight);
	}


})(document, window);
