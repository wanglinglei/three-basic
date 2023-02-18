//  材质 纹理贴图 纹理偏移旋转 重复

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
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体  几何体 材质 纹理----------------------------------------------------------------
// 纹理加载器
const textureLoader = new THREE.TextureLoader();
const img1 = textureLoader.load("./imgs/img1.jpg");
// 设置偏移
// img1.offset.x = 0.5;
// img1.offset.set(0.2, 0.2);

// 设置旋转原点 角度
// img1.center.set(0.5, 0.5);
// img1.rotation = Math.PI / 4;
// 设置重复 及重复的模式
img1.repeat.set(2, 2);
img1.wrapS = THREE.MirroredRepeatWrapping;
img1.wrapT = THREE.MirroredRepeatWrapping;

const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  map: img1,
});

// 根据几何体和材质创建材质
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

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
