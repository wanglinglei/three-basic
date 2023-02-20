//  材质 纹理贴图 遮挡贴图

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 添加场景 ----------------------------------------------------------------
const scene = new THREE.Scene();

// 创建相机 ----------------------------------------------------------------
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 12);
scene.add(camera);

// 添加物体  几何体 材质 纹理----------------------------------------------------------------
// 纹理加载器
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAplhaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
// 设置偏移
// doorColorTexture.offset.x = 0.5;
// doorColorTexture.offset.set(0.2, 0.2);

// 设置旋转原点 角度
// doorColorTexture.center.set(0.5, 0.5);
// doorColorTexture.rotation = Math.PI / 4;
// 设置重复 及重复的模式
// doorColorTexture.repeat.set(2, 2);
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
// doorColorTexture.wrapT = THREE.MirroredRepeatWrapping;

const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  side: THREE.DoubleSide, // 渲染几面  默认正面
  alphaMap: doorAplhaTexture,
  transparent: true,
  opacity: 0.7,
  aoMap: doorAmbientTexture, // 环境遮挡贴图
  aoMapIntensity: 1,
});

// 根据几何体和材质创建材质
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
console.log("mesh", mesh);
//添加平面--------------------------------------
const planeGeometry = new THREE.PlaneGeometry(4, 4);
const plane = new THREE.Mesh(planeGeometry, cubeMaterial);
plane.position.set(8, 0);

// 设置平面第二组uv
planeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);

cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

scene.add(plane);

scene.add(mesh);

// 渲染------------------------------------------------
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将渲染的canvas 内容添加到body
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(40);
scene.add(axesHelper);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
