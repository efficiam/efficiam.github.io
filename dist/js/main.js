Number.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e};var matches=function(e,t){return(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector).call(e,t)},reqAF=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};!function(e,t){function n(){var e=this;if(e.tick=!1,e.elements.length){var t=[];e.elements.forEach(function(n,o){return i(n,e.threshold)?void r(n):void t.push(n)}),e.elements=t}}function i(e,n){var i=t.innerHeight,r=e.getBoundingClientRect().top;return-(r-i)>=n}function r(e){e.style.visibility="visible",e.style.opacity=1,matches(e,".js-fadeFromLeft")&&(e.style.transform="translateX(0)"),matches(e,".js-fadeFromRight")&&(e.style.transform="translateX(0)")}function o(e){e.style.visibility="hidden",e.style.opacity=0,matches(e,".js-fadeFromLeft")&&(e.style.transform="translateX(-50px)"),matches(e,".js-fadeFromRight")&&(e.style.transform="translateX(50px)")}function a(e,n){function i(e,t){var i=e/t,r=Math.round,o=50,u="small"===n.size?5:10,e=r(o*i),t=r(o*i),m=r(u*i),E=r(u*i);a=new THREE.PlaneGeometry(e,t),s=new THREE.MeshBasicMaterial({vertexColors:THREE.VertexColors}),c=new THREE.Mesh(a,s),c.position.z=-5,c.rotation.z-=1,a.faces[0].vertexColors=[p,p,w],a.faces[1].vertexColors=[p,w,w],f.add(c),l=new THREE.PlaneGeometry(e,t,m,E),h=new THREE.MeshPhongMaterial({color:16777215,specular:16711680,shading:THREE.FlatShading,blending:THREE.AdditiveBlending,transparent:!0}),l.vertices.forEach(function(e){e.x+=1.5*(Math.random()-.5),e.y+=1.5*(Math.random()-.5)}),d=new THREE.Mesh(l,h),d.rotation.z-=1,f.add(d)}function r(){requestAnimationFrame(r);var e=new Date,t=(e-y)/2.5;l.vertices.forEach(function(e){e.z=R(Math.cos(e.x),t)}),d.material.needsUpdate=!0,d.geometry.verticesNeedUpdate=!0,g.render(f,E)}function o(){var t=e.getBoundingClientRect().width,n=e.getBoundingClientRect().height;n===m&&t===u||(m=n,u=t,f.children.pop(),f.children.pop(),i(t,n),E.aspect=t/n,E.updateProjectionMatrix(),g.setSize(t,n))}var a,s,c,l,h,d,n=n||{},u=(t.outerWidth,t.outerHeight,screen&&screen.width,screen&&screen.height,e.getBoundingClientRect().width),m=e.getBoundingClientRect().height,f=new THREE.Scene,E=new THREE.PerspectiveCamera(75,u/m,.1,1e3),w=new THREE.Color(12392949),p=new THREE.Color(3961819),g=new THREE.WebGLRenderer;g.setSize(u,m),e.appendChild(g.domElement);var v=new THREE.DirectionalLight(16777215,.8);v.position.set(0,1,0),f.add(v),E.position.z=12;var R=function(e,t){return(Math.sin(e+t/500)+Math.sin(2.2*e+t/500-2.3)+Math.sin(4.75*e+t/500+8))/8},y=new Date;i(u,m),r(),t.addEventListener("resize",o,!1),t.addEventListener("orientationchange",o,!1)}var s=function(e){this.elements=e.elements||null,this.threshold=Number.isInteger(e.threshold)?e.threshold:5,this.tick=!1,this.elements.forEach(function(e){o(e)})};s.prototype.init=function(){var e=this;Array.isArray(e.elements)&&(e.requestUpdate(),t.onscroll=function(){e.requestUpdate()})},s.prototype.requestUpdate=function(){var e=this;e.tick||reqAF(n.bind(e)),e.tick=!0},t.FadeOnScroll=s,a(e.querySelector(".u-bg-poly")),a(e.querySelector("footer"),{size:"small",lightPosition:"up"})}(document,window);