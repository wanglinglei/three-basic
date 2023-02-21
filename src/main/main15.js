// 点光源 圆周运动

// 1. 材质满足要求,对光照有反应
// 2  渲染器开启阴影的计算   renderer.shadowMap.enabled=true
// 3  设置光照投射阴影       directionalLight.castShadow=true
// 4  设置物体投射阴影       sphere.castShadow=true
// 5  设置物体接收阴影       plane.receiveShadow=true

import * as THREE from "three";
import { Sphere } from "three";
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

// 添加物体  几何体 材质----------------------------------------------------------------

const shapeGeometry = new THREE.SphereGeometry(1, 20, 20);
const shapeMaterial = new THREE.MeshStandardMaterial();
// 根据几何体和材质创建材质
const mesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
// 物体阴影设置
mesh.castShadow = true;
scene.add(mesh);

//  创建平面 展示阴影
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const plane = new THREE.Mesh(planeGeometry, shapeMaterial);
plane.position.set(0, -1.3, 0);
plane.rotation.x = -Math.PI / 2;
// 设置平面接收阴影
plane.receiveShadow = true;
scene.add(plane);

// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(40);
scene.add(axesHelper);

// 灯光---------------------------------------------------------
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

// 方向光;
const pointLight = new THREE.PointLight(0xff0000, 1);
// pointLight.position.set(10, 10, 10);
// 光线投射阴影设置
pointLight.castShadow = true;
// 光线阴影模糊度设置
pointLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
pointLight.shadow.mapSize.set(4096, 4096);
// 设置光线的范围
pointLight.angle = Math.PI / 4;
// 设置光线的最大光线距离
pointLight.distance = 28;
// 设置衰减程度   值越大衰减越快
// pointLight.decay = 1;

// 设置平行光投射相机的属性
// pointLight.shadow.camera.near = 0.5;
// pointLight.shadow.camera.far = 500;
// pointLight.shadow.camera.top = 5;
// pointLight.shadow.camera.bottom = -5;
// pointLight.shadow.camera.left = -5;
// pointLight.shadow.camera.right = 5;

// 添加一个小球
const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
smallBall.position.set(2, 2, 2);
smallBall.add(pointLight);
scene.add(smallBall);
// scene.add(pointLight);

// 渲染------------------------------------------------
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 开启渲染器阴影
renderer.shadowMap.enabled = true;

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将渲染的canvas 内容添加到body
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

const clock = new THREE.Clock();

function render() {
  let time = clock.getElapsedTime();
  smallBall.position.x = Math.sin(time) * 3;
  smallBall.position.z = Math.cos(time) * 3;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
