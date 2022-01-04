<template>
  <div>
    <h1>Three js Demo</h1>
    x:<input
      type="number"
      name="x"
      id=""
      v-model="xValue"
      step="1"
      max="360"
      @change="changeRange('x', $event)"
    />
    {{ xValue }}
    y:<input
      type="range"
      name="y"
      id=""
      v-model="yValue"
      step="1"
      max="360"
      @change="changeRange('y', $event)"
    />
    {{ yValue }}
    z:<input
      type="range"
      name="z"
      id=""
      v-model="zValue"
      step="1"
      max="360"
      @change="changeRange('z', $event)"
    />
    {{ zValue }}
    <br />
    <p>lookAt</p>
    look x:
    <input
      type="range"
      name="lookX"
      id=""
      max="360"
      :value="lookX"
      @change="changeRange('lookx', $event)"
    />
    {{ lookX }}
    look y:
    <input
      type="range"
      name="lookY"
      id=""
      max="360"
      :value="lookY"
      @change="changeRange('looky', $event)"
    />
    {{ lookY }}
    look z:
    <input
      type="range"
      name="lookZ"
      id=""
      max="360"
      :value="lookZ"
      @change="changeRange('lookz', $event)"
    />
    {{ lookZ }}
    <canvas id="mainCanvas"></canvas>
  </div>
</template>
<script>
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { Mesh, MeshPhongMaterial, Vector3 } from "three";
export default {
  mounted: function () {
    this.init();
  },
  methods: {
    draw() {
      if (this.frame != null) {
        cancelAnimationFrame(this.frame);
      }
      // this.cube.rotation.x += 0.01;
      // this.cube.rotation.y += 0.01;
      // if (this.carModel !== null)
      //   if (this.carModel.rotation) {
      //     this.carModel.rotation.x += 0.01;
      //     this.carModel.rotation.y += 0.01;
      //   }
      // this.camera.position.set(this.xValue, this.yValue, this.zValue);
      // this.camera.lookAt(new THREE.Vector3(this.lookX, this.lookY, this.lookZ));
      this.controls.update();
      this.render.render(this.scene, this.camera);
      this.frame = requestAnimationFrame(this.draw);
    },
    createRender() {
      // 初始化渲染器
      this.render = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas"),
        antialias: true,
      });
      this.render.setSize(window.innerWidth, window.innerHeight);
      this.render.setClearColor(0x000000);
    },
    createScene() {
      this.scene = new THREE.Scene();
      const pmremGenerator = new THREE.PMREMGenerator(this.render);
      this.scene.background = new THREE.Color(0xeeeeee);
      this.scene.environment = pmremGenerator.fromScene(
        new RoomEnvironment()
      ).texture;
    },

    createCamera() {
      // 透视投影照相机
      this.camera = new THREE.PerspectiveCamera(30, 4 / 3, 1, 1000);
      // 正交投影照相机
      // this.camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
      // this.camera.position.set(4, -3, 5);
      // this.camera.position.set(0, 0, 5);
      this.camera.position.set(this.xValue, this.yValue, this.zValue);
      this.camera.lookAt(new Vector3(0, 0, 0));
      // this.camera.lookAt(new THREE.Vector3(this.lookX, this.lookY, this.lookZ));
      this.scene.add(this.camera);
      this.controls = new OrbitControls(this.camera, this.render.domElement);
      this.controls.update();
      this.controls.enablePan = false;
      this.controls.enableZoom = true;
      this.controls.enableDamping = true;
    },

    addCursor() {},
    createLight() {
      let pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(5, 10, -8);
      let light = new THREE.DirectionalLight();
      light.position.set(5, 30, 5);

      let pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
      pointLight2.position.set(5, 8, 8);
      const sun = new Mesh(
        new THREE.SphereGeometry(3),
        new THREE.MeshMatcapMaterial({
          color: 0xffff00,
          shininess: 1,
        })
      );
      sun.position.set(5, 10, -8);
      // sun.position.set(5, 5, 3);
      this.scene.add(sun);
      this.scene.add(light);
      this.scene.add(pointLight);
      this.scene.add(pointLight2);
    },

    createCube() {
      // 添加长方体
      const texture = new THREE.TextureLoader().load("texture.png");
      console.log(texture);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(10, 8, 3, 2, 2, 3),
        new THREE.MeshLambertMaterial({
          color: 0xff0000,
          map: texture,
          // wireframe: true,
        })
      );
      this.scene.add(this.cube);
    },

    createPlane() {
      // 添加平面
      let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 4),
        new THREE.MeshBasicMaterial({
          color: 0x3498db,
          wireframe: true,
        })
      );
      this.scene.add(plane);
    },
    createSphere() {
      let sphere = new THREE.Mesh(
        // new THREE.SphereGeometry(3, 8, 6, Math.PI / 6, Math.PI / 3),
        // new THREE.SphereGeometry(
        //   3,
        //   8,
        //   6,
        //   0,
        //   Math.PI * 2,
        //   Math.PI / 6,
        //   Math.PI / 3
        // ),
        // 扇形
        new THREE.SphereGeometry(3, 18),
        new THREE.MeshPhongMaterial({
          color: 0xdfddfd,
          specular: 0xffffff,
          shininess: 100,
          // map: texture,
          // wireframe: true,
        })
      );
      sphere.position.set(0, -8, 5);
      this.scene.add(sphere);
    },
    createCylinder() {
      let cylinder = new Mesh(
        new THREE.CylinderGeometry(2, 2, 4, 18, 3, false),
        new THREE.MeshLambertMaterial({
          color: 0xcfcf,
          emissive: 0xaaaa,
          // map: texture,
          // wireframe: true,
        })
        // new THREE.MeshNormalMaterial()
      );
      cylinder.position.set(10, 12, 5);
      this.scene.add(cylinder);
    },

    loadModel(objectUrl = "car_test.obj", mtlUrl = "car_test.mtl") {
      const test_loader = new OBJLoader();
      const mat_loader = new MTLLoader();
      mat_loader.load(mtlUrl, (material) => {
        // material.preload();
        test_loader.setMaterials(material);
        test_loader.load(objectUrl, (obj) => {
          console.log(obj);
          console.log(material);
          for (const child of obj.children) {
            // console.log(child);
            console.log(child.name, child.material.wireframe);
            if (child.name === "Cottage_Free") {
              const texture = new THREE.TextureLoader().load(
                "Cottage_Clean_Base_Color.png"
              );
              child.material = new MeshPhongMaterial({
                map: texture,
              });
            }
            if (child.name === "Mercedes_Benz_GLS_580_ID3358_WindowsTint") {
              child.material.transparent = true;
              child.material.opacity = 0.2;
              child.material.envMap = new THREE.TextureLoader().load(
                "texture.png"
              );
              child.material.envMap.mapping =
                THREE.EquirectangularReflectionMapping;
              child.material.envMap.envMapIntensity = 1;
              child.material = new MeshPhongMaterial();
              child.material.color = new THREE.Color(0x33333);
            }
          }
          // obj.traverse((child) => {
          //   if (child instanceof THREE.Mesh) {
          //     console.log(child);
          //   }
          // });
          // obj.traverse((child) => {
          //   if (child instanceof THREE.Mesh) {
          //     child.material = new THREE.MeshLambertMaterial({
          //       side: THREE.DoubleSide,
          //     });
          //     // child.material.side = THREE.DoubleSide;
          //   }

          obj.wireframe = false;
          obj.position.set(0, 0, 0);
          this.carModel = obj;
          this.scene.add(this.carModel);
        });
      });
    },

    loadFont(fontJsonUrl = "helvetiker_bold.typeface.json") {
      // 添加字体
      let loader = new FontLoader();
      loader.load(fontJsonUrl, (font) => {
        let mesh = new THREE.Mesh(
          new TextGeometry(
            "Hello",
            {
              font: font,
              size: 1,
              height: 1,
            },
            new THREE.MeshLambertMaterial({
              color: 0xfafdaf,
              // opacity:0.3,
              // wireframe: true,
            })
          )
        );
        mesh.position.set(5, 3, 0);
        this.scene.add(mesh);
      });
    },
    init() {
      this.createRender();
      this.createScene();
      this.createCamera();
      this.createLight();
      // this.createCube();
      // this.createPlane();
      // this.createSphere();
      // this.createCylinder();
      this.loadModel("Cottage_FREE.obj", "Cottage_FREE.mtl");
      // this.loadFont();
      this.render.render(this.scene, this.camera);
      requestAnimationFrame(this.draw);
    },
    changeRange(type, event) {
      switch (type) {
        case "x":
          this.xValue = event.target.value;
          break;
        case "y":
          this.yValue = event.target.value;
          break;
        case "z":
          this.zValue = event.target.value;
          break;
        case "lookx":
          this.lookX = event.target.value;
          break;
        case "looky":
          this.lookY = event.target.value;
          break;
        case "lookz":
          this.lookZ = event.target.value;
          break;
      }
      this.draw();
    },
  },
  data: function () {
    return {
      // 渲染器
      render: null,
      // 场景
      scene: null,
      // 相机
      camera: null,
      // 长方体
      cube: null,
      // 模型
      carModel: null,
      xValue: 25,
      yValue: 25,
      zValue: 25,
      lookX: 0,
      lookY: 0,
      lookZ: 0,
      frame: null,
      controls: null,
    };
  },
};
</script>
<style></style>
