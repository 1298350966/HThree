import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  LoadingManager,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
} from "three";
import HThree from "./HThree";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { PlaneMeshConfig } from "./config";
import MeshAnimation from "./MeshAnimation";

export default class AddMesh {
  context: HThree;
  scene: any;
  options: any;
  addGLTFLoader: any;
  objects: Object3D[] = [];
  loadingManager: LoadingManager | undefined;
  constructor(context: HThree) {
    this.context = context;
    this.scene = context.scene;
    this.options = context.options.objects;
    this.initLoadingManager()
    this.initObjects();
    // this.
  }

  addPlaneMesh(config: any) {
    const { scene } = this;
    const _config = Object.assign({}, PlaneMeshConfig, config);
    const { geometry, material, name } = _config;
    const planeGeometry = new PlaneGeometry(geometry[0], geometry[1]);
    const mesh = new Mesh(
      planeGeometry,
      new MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
    );
    mesh.name = name || mesh.name;
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
    this.add(mesh);
  }
  addGLTFMesh(config: any = {}) {
    const { options, position, scale, name } = config;
    if (!options) return;
    const { scene } = this;
    const loader = new GLTFLoader(this.loadingManager);
    if (options.decoderPath) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");
      loader.setDRACOLoader(dracoLoader);
    }
    if (options.path) {
      loader.load(
        options.path,
        (gltf: any) => {
          const model = gltf.scene;
          model.on("click", () => {
            console.log(model);
          });
          model.name = name || model.name;
          position && model.position.set(...position);
          scale && model.scale.set(...scale);
          scene.add(model);
          this.add(model);
          model.traverse(function (object: Mesh) {
            if (object.isMesh) object.castShadow = true;
          });

          if (Array.isArray(gltf.animations)) {
            let meshAnimation = new MeshAnimation(model, gltf.animations);
            this.context.on("onLoop", ({ delta }: any) => {
              meshAnimation.mixer.update(delta);
            });
            if (options.mixer.play) {
              meshAnimation.currentAction.play();
            }
            model.meshAnimation = meshAnimation;
          }
        },
        undefined,
        function (e: any) {
          console.error(e);
        }
      );
    }
  }
  initObjects() {
    const objects = this.options;
    if (!objects) return;
    let _funMap: {
      [key: string]: Function;
    } = {
      GLTFMesh: this.addGLTFMesh.bind(this),
      PlaneMesh: this.addPlaneMesh.bind(this),
    };
    objects.forEach((object: any) => {
      _funMap[object.type] && _funMap[object.type](object);
    });
  }
  initLoadingManager() {
    const {context} = this;
    this.loadingManager = new LoadingManager();
    this.loadingManager.onLoad = () => {
      console.log("加载完成");
      this.context.emit("onLoad");
    };
    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log(
        "加载文件: " +
          url +
          ".\n已加载 " +
          itemsLoaded +
          "个文件，共" +
          itemsTotal +
          "个。"
      );
      context.emit("onProgress", url, itemsLoaded, itemsTotal);
    };
    this.loadingManager.onError = (url) => {
      console.log("加载时出错" + url);
      context.emit("onError", url);
    };
  }
  add(object: Object3D) {
    this.objects.push(object);
  }
  remove(object: Object3D) {
    let index = this.objects.findIndex((e) => e == object);
    this.objects.splice(0, index);
  }
  getObjectName(name: string) {
    return this.objects.find((e) => e.name == name);
  }
}
