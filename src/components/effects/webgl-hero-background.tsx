"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    vec2 mousePos = u_mouse / u_resolution.xy;
    mousePos.x *= u_resolution.x / u_resolution.y;

    float gridScale = 45.0;
    vec2 grid = fract(st * gridScale);
    vec2 id = floor(st * gridScale);

    float distToMouse = distance(st, mousePos);
    float noiseVal = snoise(id * 0.05 + u_time * 0.15);
    float dotDist = length(grid - 0.5);

    float mouseRipple = smoothstep(0.35, 0.0, distToMouse);
    float radius = 0.04 + (noiseVal * 0.04) + (mouseRipple * 0.12);
    float circle = 1.0 - smoothstep(radius, radius + 0.05, dotDist);

    float intensity = 0.2 + (noiseVal * 0.3) + (mouseRipple * 0.65);

    vec3 baseColor = vec3(0.0, 0.0, 0.0);

    gl_FragColor = vec4(baseColor, circle * intensity * 0.45);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export function WebGLHeroBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return;

    const pr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * pr;
      canvas.height = window.innerHeight * pr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let targetMX = (window.innerWidth / 2) * pr;
    let targetMY = (window.innerHeight / 2) * pr;
    let mouseX = targetMX;
    let mouseY = targetMY;

    const onMouseMove = (e: MouseEvent) => {
      targetMX = e.clientX * pr;
      targetMY = (window.innerHeight - e.clientY) * pr;
    };
    document.addEventListener("mousemove", onMouseMove);

    const startTime = Date.now();

    const render = () => {
      const t = (Date.now() - startTime) * 0.001;
      mouseX += (targetMX - mouseX) * 0.05;
      mouseY += (targetMY - mouseY) * 0.05;

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t);
      gl.uniform2f(mouseLoc, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animFrameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-80 sm:opacity-70 ${className}`}
    />
  );
}
