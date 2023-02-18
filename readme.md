<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [three.js学习](#threejs%E5%AD%A6%E4%B9%A0)
  - [description](#description)
  - [最简demo](#%E6%9C%80%E7%AE%80demo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## three.js学习

### description
三大核心概念：场景 相机  渲染器

### 最简demo
```javascript
// 基础场景

import * as THREE from 'three'

// 添加场景 ----------------------------------------------------------------
const scene = new THREE.Scene();

// 创建相机 ----------------------------------------------------------------
// 相机视角、宽高比 近裁切  远裁切
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体  几何体 材质----------------------------------------------------------------
// 基础立方体 
const cubeGeometry = new THREE.BoxGeometry(5,5,5);
// 基础材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据几何体和材质创建材质
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(mesh)

// 渲染------------------------------------------------
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 将渲染的canvas 内容添加到body
document.body.appendChild(renderer.domElement)

renderer.render(scene,camera)
```