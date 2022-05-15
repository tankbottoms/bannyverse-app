//Create var for the contenair, the webGL 3D scene, uniforms to bind into shader and timer
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.domElement );

var main;
var content;
var container;
var camera, scene, renderer;
var uniforms;
var startTime;


var canvasWidth;
var canvasHeight;
var resPoster = 841.0/594.0;
var minWidth = 450;
var minHeight = minWidth * resPoster;
var margin = 50;

var cols = 1.;
var rows  = 400;

init(); //init scene
animate(); //updateScene

function init() {
	//get contenaire
	main = document.getElementById('main');
	content = document.getElementById('content');
	container = document.getElementById('container');
	
	//Create THREE.JS scene and timer
	startTime = Date.now();
	camera = new THREE.Camera();
	camera.position.z = 1;
	scene = new THREE.Scene();
	
	//create a simple plance
	var geometry = new THREE.PlaneBufferGeometry(16, 9);
	
	//create uniform table which provide all our GLSL binding
	uniforms = {
		time: { type: "f", value: 1.0 },
		resolution: { type: "v2", value: new THREE.Vector2() },
		colsrows: {type: "v2", value: new THREE.Vector2()}
	};
	
	//create THREE.JS material
	var material = new THREE.ShaderMaterial( {
	//set shaders and uniforms into material
		uniforms: uniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent
	} );

	//create mesh, add it to the scene
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	//create renderer and add it to the DOM
	renderer = new THREE.WebGLRenderer();
	container.appendChild(renderer.domElement);
	
	//check window for resize This will give us the proper resolution values to bind
	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);
	
}

function onWindowResize(event) {
	var mainHeight =  window.innerHeight - margin * 2.0;
	var mainWidth =  mainHeight / resPoster;
	var contentHeight = content.offsetHeight;
	var contentMargin = margin  * 0.25;
	var containerHeight =  mainHeight - (contentHeight + contentMargin);
	var containerMinHeight =  minHeight - (contentHeight + contentMargin);
	
	main.style.height = mainHeight+"px";
	main.style.width = mainWidth+"px";
	main.style.minHeight = minHeight+"px";
	main.style.minWidth = minWidth+"px";
	main.style.padding = margin*0.5+"px";
	content.style.margin = "0 0 "+contentMargin+"px 0";
	container.style.height = containerHeight+"px";
	container.style.minHeight = containerMinHeight+"px";
	
	canvasWidth = container.offsetWidth;
	canvasHeight = container.offsetHeight;
	//send new size value to the shader and resize the window
	uniforms.resolution.value.x = canvasWidth;
	uniforms.resolution.value.y = canvasHeight;
	
	//var res = canvasWidth / cols;
	//rows = canvasHeight / res;
	uniforms.colsrows.value.x = cols;
	uniforms.colsrows.value.y = rows;//rows;
	
	renderer.setSize(canvasWidth, canvasHeight);
}

function animate() {
	stats.begin();
	render();
	stats.end();
	requestAnimationFrame(animate);
}

function render() {
	var currentTime = Date.now();
	var elaspedSeconds =  (currentTime - startTime) / 1000.0;
	var maxTime = 4.0;
	var normTime = (elaspedSeconds % maxTime) / maxTime;
	uniforms.time.value = elaspedSeconds * 1.0;

	renderer.render(scene, camera);
}