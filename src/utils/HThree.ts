import {
  AnimationAction,
  AnimationClip,
  CameraHelper,
  Color,
  DirectionalLight,
  Fog,
  HemisphereLight,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
} from "three";
import {
  Clock,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Object3D,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Event from "./Event";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AnimationMixer } from "three";
import { throttle } from "lodash";
import onEvent from "three-onevent-esm";
import AddLight from "./Light";
import AddMesh from "./Mesh";
import { PerspectiveCameraConfig } from "./config";
// Object.assign(Object3D.prototype, {
//   animationMixers: [],
//   destroy: function () {

//   }
// });

export default class HThree extends Event {
  el: HTMLElement;
  scene!: any;
  camera!: any;
  stats!: Stats;
  clock = new Clock();
  renderer: any;
  controls!: OrbitControls;
  resizeObserver: any;
  options: any;
  objects3d: Object3D[];
  event: onEvent;
  addLight: AddLight;
  addMesh: AddMesh;
  constructor(el: HTMLElement, options: any = {}) {
    super();
    this.el = el;
    this.options = options;
    this.scene = new Scene();
    this.objects3d = [];
    this.initStats();
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.event = new onEvent(this.scene, this.camera, this.el);
    this.initOrbitControls();
    this.initResize();
    this.addLight = new AddLight(this);
    this.addMesh = new AddMesh(this);
    this.animate();
  }
  initStats() {
    this.stats = new Stats();
    this.stats.dom.style.position = "absolute";
    this.el.appendChild(this.stats.dom);
  }
  initRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.el.clientWidth, this.el.clientHeight);
    renderer.shadowMap.enabled = true;
    this.el.appendChild(renderer.domElement);
    this.renderer = renderer;
  }
  initScene() {
    const { background, environment, fog } = this.options.scene || {};
    const { renderer } = this;
    const scene = new Scene();
    this.scene = scene;
    if (background) {
      scene.background = new Color(background);
    }
    if (environment) {
      const pmremGenerator = new PMREMGenerator(renderer);
      if (environment?.scene == "RoomEnvironment") {
        scene.environment = pmremGenerator.fromScene(
          new RoomEnvironment(),
          0.04
        ).texture;
      }
    }
    if (fog) {
      const { color, near, far } = fog;
      scene.fog = new Fog(color, near, far);
    }
  }
  initCamera() {
    const config = Object.assign(
      {},
      PerspectiveCameraConfig,
      this.options.camera
    );
    const { position, lookAt, options } = config;
    const { fov, near, far } = options;
    const camera = new PerspectiveCamera(
      fov,
      this.el.clientWidth / this.el.clientHeight,
      near,
      far
    );
    camera.position.set(position[0], position[1], position[2]);
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    this.camera = camera;
  }
  initOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.5, 0);
    this.controls.update();
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
  }
  initResize() {
    this.resizeObserver = new ResizeObserver(
      throttle(this.onresize.bind(this), 100)
    );
    this.resizeObserver.observe(this.el);
  }
  onresize() {
    this.camera.aspect = this.el.clientWidth / this.el.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.el.clientWidth, this.el.clientHeight);
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    const delta = this.clock.getDelta();
    this.emit("onLoop", { delta });
    this.controls.update();
    this.stats.update();
    this.renderer.render(this.scene, this.camera);
  }
  add(object: Object3D, ParentObject?: Object3D) {
    this.objects3d.push(object);
    if (ParentObject) {
      ParentObject.add(object);
    } else {
      this.scene.add(object);
    }
  }
  toJSON() {}
  getObjectName(name: string) {
    return this.addMesh.getObjectName(name);
  }
}
