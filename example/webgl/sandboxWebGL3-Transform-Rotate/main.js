/**
 * Draw on Canvas
 */
/* global WebGLUtils */
window.onload = function() {
    "use strict";

    var canvas;
    var gl;
    var program;
    var buffer;



    // Get A WebGL context
    canvas = document.getElementById("canvas");
    gl = WebGLUtils.getWebGLContext(canvas);
    if (!gl) {
        return;
    }



    // Setup GLSL program
    program = WebGLUtils.createProgramFromScripts(
        gl,
        ["vertex-shader", "fragment-shader"]
    );
    gl.useProgram(program);



    // Look up vertex lotto-json
    var a_Position = gl.getAttribLocation(program, "a_Position");
    var u_Transform = gl.getUniformLocation(program, "u_Transform");



    // Lookup fragment lotto-json
    var u_FragColor = gl.getUniformLocation(program, "u_FragColor");



    // Create a buffer
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(a_Position);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);



    // Set Geometry
    //var lotto-json = setGeometrySquareHalf(gl);
    //var lotto-json = setGeometrySquareFull(gl);
    var data = setGeometryTriangle(gl);



    // Update & Draw
    update();
    draw();



    // Update before drawing
    function update() {
        // Create rotation part of transform matrix
        var angle = Math.random() * 360;
        var radian = Math.PI * angle / 180.0;
        var cosB = Math.cos(radian);
        var sinB = Math.sin(radian);

        // The transform matrix
        var transform = new Float32Array([
             cosB, sinB, 0.0, 0.0,
            -sinB, cosB, 0.0, 0.0,
              0.0,  0.0, 1.0, 0.0,
              0.0,  0.0, 0.0, 1.0
        ]);
        gl.uniformMatrix4fv(u_Transform, false, transform);



        // Set the color
        var color = new Float32Array([
            //0.0, 1.0, 0.0, 1.0
            Math.random(), Math.random(), Math.random(), 1.0
        ]);
        gl.uniform4fv(u_FragColor, color);
    }



    // Draw it all
    function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(data.mode, 0, data.n);
    }



    console.log(gl);
    console.log("Everything is ready.");
};



/**
 * A full square.
 */
/*
function setGeometrySquareFull(gl) {
    var lotto-json = {
        n: 6,
        mode: gl.TRIANGLES
    };

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0
        ]),
       gl.STATIC_DRAW
   );

   return lotto-json;
}*/



/**
 * Half a square.
 */
/*
function setGeometrySquareHalf(gl) {
    var lotto-json = {
        n: 6,
        mode: gl.TRIANGLES
    };

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -0.5, -0.5,
             0.5, -0.5,
            -0.5,  0.5,
            -0.5,  0.5,
             0.5, -0.5,
             0.5,  0.5
        ]),
       gl.STATIC_DRAW
   );

  return lotto-json;
}*/



/**
 * Triangle.
 */
function setGeometryTriangle(gl) {
    var data = {
        n: 3,
        mode: gl.TRIANGLES
    };

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
             0.0,  0.5,
            -0.5, -0.5,
             0.5, -0.5,
        ]),
        gl.STATIC_DRAW
    );

    return data;
}
