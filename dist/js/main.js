Number.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},function(e,t){function n(e,n){var i=t.innerHeight,o=e.getBoundingClientRect().top;return-(o-i)>=n}function i(e){e.style.visibility="visible",e.style.opacity=1}function o(e){e.style.visibility="hidden",e.style.opacity=0}function r(e,n){function i(e,t){var i=e/t,o=Math.round,r=50,u="small"===n.size?5:10,e=o(r*i),t=o(r*i),E=o(u*i),f=o(u*i);a=new THREE.PlaneGeometry(e,t),s=new THREE.MeshBasicMaterial({vertexColors:THREE.VertexColors}),l=new THREE.Mesh(a,s),l.position.z=-5,l.rotation.z-=1,a.faces[0].vertexColors=[R,R,v],a.faces[1].vertexColors=[R,v,v],m.add(l),h=new THREE.PlaneGeometry(e,t,E,f),c=new THREE.MeshPhongMaterial({color:16777215,specular:16711680,shading:THREE.FlatShading,blending:THREE.AdditiveBlending,transparent:!0}),h.vertices.forEach(function(e){e.x+=1.5*(Math.random()-.5),e.y+=1.5*(Math.random()-.5)}),d=new THREE.Mesh(h,c),d.rotation.z-=1,m.add(d)}function o(){requestAnimationFrame(o);var e=new Date,t=(e-M)/2.5;h.vertices.forEach(function(e){e.z=H(Math.cos(e.x),t)}),d.material.needsUpdate=!0,d.geometry.verticesNeedUpdate=!0,y.render(m,p)}function r(){if(u!==t.outerWidth||E!==t.outerHeight){var n=e.getBoundingClientRect().width,o=e.getBoundingClientRect().height;m.children.pop(),m.children.pop(),i(n,o),p.aspect=n/o,p.updateProjectionMatrix(),y.setSize(n,o)}}var a,s,l,h,c,d,n=n||{},u=t.outerWidth,E=t.outerHeight,f=e.getBoundingClientRect().width,g=e.getBoundingClientRect().height,m=new THREE.Scene,p=new THREE.PerspectiveCamera(75,f/g,.1,1e3),v=new THREE.Color(12392949),R=new THREE.Color(3961819),y=new THREE.WebGLRenderer;y.setSize(f,g),e.appendChild(y.domElement);var w=new THREE.DirectionalLight(16777215,.8);w.position.set(0,1,0),m.add(w),p.position.z=12;var H=function(e,t){return(Math.sin(e+t/500)+Math.sin(2.2*e+t/500-2.3)+Math.sin(4.75*e+t/500+8))/8},M=new Date;i(f,g),o(),t.addEventListener("resize",r,!1),t.addEventListener("orientationchange",r,!1)}var a=function(e){this.elements=e.elements||null,this.threshold=Number.isInteger(e.threshold)?e.threshold:5,this.elements.forEach(function(e){o(e)})};a.prototype.init=function(){var e=this;Array.isArray(this.elements)&&(e.elements.forEach(function(t){n(t,e.threshold)&&i(t)}),t.addEventListener("scroll",function(){e.elements.forEach(function(t){n(t,e.threshold)&&i(t)})}))},t.FadeOnScroll=a,r(e.querySelector(".u-bg-poly")),r(e.querySelector("footer"),{size:"small",lightPosition:"up"})}(document,window);