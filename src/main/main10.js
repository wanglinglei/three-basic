// 纹理图片加载进度

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
// 纹理加载进度
const onLoad = function (e) {
  console.log("加载完成", e);
};

//进度
const onProgress = function (e, num, total) {
  console.log("加载进度", "url:" + e, "当前:" + num, "总数:" + total);
};
// 加载异常
const onError = function (e) {
  console.log("加载异常", e);
};

// 设置加载管理器
const loadingManager = new THREE.LoadingManager(onLoad, onProgress, onError);

// 纹理加载器
const textureLoader = new THREE.TextureLoader(loadingManager);

const doorColorTexture = textureLoader.load(
  "./textures/door/color.jpg"
  // onLoad,
  // onProgress,
  // onError
);

const doorAplhaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
// 粗糙图贴图
const roughnessTexture = textureLoader.load("./textures/door/roughness.jpg");
// 金属贴图
const metalTexture = textureLoader.load("./textures/door/metalness.jpg");
// 导入置换贴图
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
// 法线贴图
const normalTexture = textureLoader.load("./textures/door/normal.jpg");

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

const cubeGeometry = new THREE.BoxGeometry(4, 4, 4, 800, 800, 800);
// 使用 物理材质
const cubeMaterial = new THREE.MeshStandardMaterial({
  // color: "#ffff00",
  map: doorColorTexture,
  // side: THREE.DoubleSide, // 渲染几面  默认正面
  alphaMap: doorAplhaTexture,
  transparent: true,
  // opacity: 0.7,
  aoMap: doorAmbientTexture, // 环境遮挡贴图
  aoMapIntensity: 1,
  displacementMap: doorHeightTexture, // 置换贴图 需要顶点细分
  displacementScale: 0.3, // 影响范围大小
  roughness: 0, // 粗糙度   0最光滑  镜面反射
  roughnessMap: roughnessTexture,
  metalnessMap: metalTexture,
  metalness: 1,
  normalMap: normalTexture, // 法向贴图 决定光的反射方向
});

// 根据几何体和材质创建材质
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
console.log("mesh", mesh);
//添加平面--------------------------------------
const planeGeometry = new THREE.PlaneGeometry(4, 4, 800, 800);
const plane = new THREE.Mesh(planeGeometry, cubeMaterial);
plane.position.set(4.3, 0);

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
