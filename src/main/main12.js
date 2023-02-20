// HDR 文件

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

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

// 添加cube 纹理加载器----------------------------------------------------------------
const cubeTextureLoader = new THREE.CubeTextureLoader();
const list = ["px", "nx", "py", "ny", "pz", "nz"];
const textureList = list.map((name) => {
  return "/textures/environmentMaps/1/" + name + ".jpg";
});

const envMapTexture = cubeTextureLoader.load([...textureList]);

// 加载hdr 图

const rgbLoader = new RGBELoader();
rgbLoader.loadAsync("./textures/hdr/002.hdr").then((texture) => {
  // 设置hdr  图片映射方式
  texture.mapping = THREE.EquirectangularReflectionMapping;
  // 场景添加背景
  scene.background = texture;
  // 场景内物体添加默认环境贴图
  scene.environment = texture;
});

// 添加物体
const shapeGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.1,
  // envMap: envMapTexture, //物体的环境贴图
});
const shape = new THREE.Mesh(shapeGeometry, material);
scene.add(shape);

// 灯光---------------------------------------------------------
// 环境光
// const light = new THREE.AmbientLight(0xffffff, 0.5);
// 方向光
const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(5, 5, 4);
scene.add(directionLight);
// scene.add(light);

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
