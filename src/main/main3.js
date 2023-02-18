// 辅助坐标线  物体移动

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// 添加场景 ----------------------------------------------------------------
const scene = new THREE.Scene();

// 创建相机 ----------------------------------------------------------------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体  几何体 材质----------------------------------------------------------------
const cubeGeometry = new THREE.BoxGeometry(5,5,5);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据几何体和材质创建材质
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 缩放
// mesh.scale.set(3, 2, 1)


scene.add(mesh)

// 渲染------------------------------------------------
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 将渲染的canvas 内容添加到body
document.body.appendChild(renderer.domElement)

renderer.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)


// 添加坐标辅助器
const axesHelper=new THREE.AxesHelper(40)
scene.add(axesHelper)


function render () {
  // 物体的移动
  mesh.position.x += 0.01;
  mesh.rotateX(0.01)
  if (mesh.position.x > 5) {
    mesh.position.x =0
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
render()