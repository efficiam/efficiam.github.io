!function(e,n){function t(e,t){function i(e,n){var i=e/n,o=Math.round,r=50,l="small"===t.size?5:10,e=o(r*i),n=o(r*i),w=o(l*i),g=o(l*i);a=new THREE.PlaneGeometry(e,n),s=new THREE.MeshBasicMaterial({vertexColors:THREE.VertexColors}),d=new THREE.Mesh(a,s),d.position.z=-5,d.rotation.z-=1,a.faces[0].vertexColors=[p,p,R],a.faces[1].vertexColors=[p,R,R],u.add(d),c=new THREE.PlaneGeometry(e,n,w,g),E=new THREE.MeshPhongMaterial({color:16777215,specular:16711680,shading:THREE.FlatShading,blending:THREE.AdditiveBlending,transparent:!0}),c.vertices.forEach(function(e){e.x+=1.5*(Math.random()-.5),e.y+=1.5*(Math.random()-.5)}),h=new THREE.Mesh(c,E),h.rotation.z-=1,u.add(h)}function o(){requestAnimationFrame(o);var e=new Date,n=(e-T)/2.5;c.vertices.forEach(function(e){e.z=m(Math.cos(e.x),n)}),h.material.needsUpdate=!0,h.geometry.verticesNeedUpdate=!0,v.render(u,g)}function r(){var n=e.getBoundingClientRect().width,t=e.getBoundingClientRect().height;t===w&&n===l||(w=t,l=n,u.children.pop(),u.children.pop(),i(n,t),g.aspect=n/t,g.updateProjectionMatrix(),v.setSize(n,t))}var a,s,d,c,E,h,t=t||{},l=(n.outerWidth,n.outerHeight,screen&&screen.width,screen&&screen.height,e.getBoundingClientRect().width),w=e.getBoundingClientRect().height,u=new THREE.Scene,g=new THREE.PerspectiveCamera(75,l/w,.1,1e3),R=new THREE.Color(12392949),p=new THREE.Color(3961819),v=new THREE.WebGLRenderer;v.setSize(l,w),e.appendChild(v.domElement);var H=new THREE.DirectionalLight(16777215,.8);H.position.set(0,1,0),u.add(H),g.position.z=12;var m=function(e,n){return(Math.sin(e+n/500)+Math.sin(2.2*e+n/500-2.3)+Math.sin(4.75*e+n/500+8))/8},T=new Date;i(l,w),o(),n.addEventListener("resize",r,!1),n.addEventListener("orientationchange",r,!1)}bowser.msie&&bowser.version<11||bowser.android&&bowser.webkit||(t(e.querySelector(".js-showPoly")),t(e.querySelector("footer"),{size:"small",lightPosition:"up"}))}(document,window);