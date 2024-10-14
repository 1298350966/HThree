import { Color, Fog, PMREMGenerator, Scene } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export function setSceneOptions(scene: Scene, options: any) {
  const { background, environment } = options;
  if (background) {
    scene.background = new Color(background);
  }
  if (environment) {
    const pmremGenerator = new PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
  }
  if (environment) {
    scene.fog = new Fog( 0xa0a0a0, 10, 50 )
  }

}
// #bfe3dd