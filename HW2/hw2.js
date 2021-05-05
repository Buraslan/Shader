var canvas;
var gl;
var program;
var vertices;

var theta = 10.0;

var red = 1.0;
var green = 0.0;
var blue = 0.0;

var color;
var colorLoc;

var xr = 0.2;
var yr = 0.1;

var xScale = 1.0;
var xScaleLoc;

var yScale = 1.0;
var yScaleLoc;

var xPos = 1.0;
var xPosLoc;

var yPos = 1.0;
var yPosLoc;



window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

  
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    vertices = [];
    vertices.push(0, 0);

    for (let i = 0.0; i <= 360.0; i+=theta) {
        theta1 = i;
        theta1 = theta1 * (Math.PI / 180.0);
        const x = xr * Math.cos(theta1);
        const y = yr * Math.sin(theta1);
        vertices.push(x, y);
    }
		
	//vertex buffer
	var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );    

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	
	

	document.getElementById("posX").oninput = function(event) {
        xPos = parseFloat(event.target.value);
        init();
    };    
    document.getElementById("posY").oninput = function(event) {
        yPos =  parseFloat(event.target.value);
        init();
    };
    document.getElementById("scaleX").oninput = function(event) {
		xScale =  event.target.value;
        init();
    };
    document.getElementById("scaleY").oninput = function(event) {
        yScale =  event.target.value;
        init();
    };  
    document.getElementById("redSlider").oninput = function(event) {
        red = event.target.value;
        color = vec4(red+red,green,blue,1.0);
        init();
    };
    document.getElementById("greenSlider").oninput = function(event) {
        green = event.target.value;
        color = vec4(red,green+green,blue,1.0);
        init();
    };
    document.getElementById("blueSlider").oninput = function(event) {
        blue = event.target.value;
        color = vec4(red,green,blue+blue,1.0);
        init();
    };
	document.getElementById("theta1").onclick = function(event) {
       
        theta = parseFloat(event.target.value);
        init();
    };	
	document.getElementById("theta2").onclick = function(event) {
       
        theta = parseFloat(event.target.value);
        init();
    };
	document.getElementById("theta3").onclick = function(event) {
        theta = parseFloat(event.target.value);
        init();
    };	
	document.getElementById("theta4").onclick = function(event) {
        
        theta = parseFloat(event.target.value);
        init();
    };	
	document.getElementById("theta5").onclick = function(event) {
        theta = parseFloat(event.target.value);
        init();
    };	
	document.getElementById("xrSlider").oninput = function(event) {
        xr =  event.target.value;
        init();
    };	
	document.getElementById("yrSlider").oninput = function(event) {
        yr =  event.target.value;
        init();
    };	

	
    color = vec4(red,green,blue,1.0);
	xScaleLoc = gl.getUniformLocation( program, "xScale" );
	yScaleLoc = gl.getUniformLocation( program, "yScale" );
	
	
    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    colorLoc = gl.getUniformLocation(program,"color");
	gl.uniform4fv(colorLoc,color);

    gl.uniform1f( xScaleLoc, xScale );
	gl.uniform1f( yScaleLoc, yScale );
	
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length);

    requestAnimFrame(render);

}
