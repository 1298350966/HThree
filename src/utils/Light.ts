import {
  CameraHelper,
  DirectionalLight,
  HemisphereLight,
  Light,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
} from "three";
import HThree from "./HThree";
import { DirectionalLightConfig, HemisphereLightConfig } from "./config";

export default class AddLight {
  context: HThree;
  scene: any;
  options: any;
  lights: Light[]=[];
  constructor(context: HThree) {
    this.context = context;
    this.scene = context.scene;
    this.options = context.options.lights;
    this.initLights(this.options);
  }
  addHemisphereLight(config: any) {
    const { scene } = this;
    let _config = Object.assign({}, HemisphereLightConfig, config);
    const { options, position } = _config;
    const { skyColor, groundColor, intensity } = options;
    const hemiLight = new HemisphereLight(skyColor, groundColor, intensity);
    hemiLight.position.set(position[0], position[1], position[2]);
    scene.add(hemiLight);
    this.add(hemiLight)
  }
  addDirectionalLight(config: any) {
    const { scene } = this;
    let _config = Object.assign({}, DirectionalLightConfig, config);
    const { options, position, castShadow, camera } = _config;
    const { color, intensity } = options;
    const dirLight = new DirectionalLight(color, intensity);
    dirLight.position.set(position[0], position[1], position[2]);
    dirLight.castShadow = castShadow;
    dirLight.shadow.camera.top = camera.top;
    dirLight.shadow.camera.bottom = camera.bottom;
    dirLight.shadow.camera.left = camera.left;
    dirLight.shadow.camera.right = camera.right;
    dirLight.shadow.camera.near = camera.near;
    dirLight.shadow.camera.far = camera.far;
    scene.add(dirLight);
    this.add(dirLight)
  }
  initLights(lights: any[]) {
    if (!Array.isArray(lights)) return;
    let _funMap: {
      [key: string]: Function;
    } = {
      DirectionalLight: this.addDirectionalLight.bind(this),
      HemisphereLight: this.addHemisphereLight.bind(this),
    };
    lights.forEach((light: any) => {
      _funMap[light.type] && _funMap[light.type](light);
    });
  }
  add(light: Light) {
    this.lights.push(light);
  }
  remove(light: Light) {
    let index = this.lights.findIndex((e) => e == light);
    this.lights.splice(0, index);
  }
}
