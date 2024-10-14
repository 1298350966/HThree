import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  AnimationObjectGroup,
  Object3DEventMap,
} from "three";
import { Object3D } from "three/webgpu";

export default class MeshAnimation {
  mixer: AnimationMixer;
  clipActions: AnimationAction[];
  animations: AnimationClip[];
  duration: number;
  currentAction: AnimationAction;
  model: Object3D<Object3DEventMap> | AnimationObjectGroup;
  constructor(
    model: Object3D<Object3DEventMap> | AnimationObjectGroup,
    animations: AnimationClip[]
  ) {
    this.model = model;
    this.animations = animations;
    this.mixer = new AnimationMixer(model);
    this.clipActions = [];

    this.duration = 3.5;
    animations.forEach((animation: AnimationClip) => {
      this.clipActions.push(this.mixer.clipAction(animation));
    });
    // this.currentAction = this.clipActions[0].play();
  }

  setWeight(action: AnimationAction, weight: number) {
    action.enabled = true;
    action.setEffectiveTimeScale(1);
    action.setEffectiveWeight(weight);
  }
  executeCrossFade(
    startAction: AnimationAction,
    endAction: AnimationAction,
    duration: number
  ) {
    // Not only the start action, but also the end action must get a weight of 1 before fading
    // (concerning the start action this is already guaranteed in this place)
    if (endAction) {
      this.setWeight(endAction, 1);
      endAction.time = 0;

      // Crossfade with warping - you can also try without warping by setting the third parameter to false
      if (startAction) {
        startAction.crossFadeTo(endAction, duration, true);
      } else {
        endAction.fadeIn(duration);
      }
    } else {
      startAction.fadeOut(duration);
    }
  }
  synchronizeCrossFade(
    startAction: AnimationAction,
    endAction: AnimationAction,
    duration: number
  ) {
    const onLoopFinished = (event: { action: AnimationAction }) => {
      if (event.action === startAction) {
        this.mixer.removeEventListener("loop", onLoopFinished);

        this.executeCrossFade(startAction, endAction, duration);
      }
    };
    this.mixer.addEventListener("loop", onLoopFinished);
  }

  prepareCrossFade(
    startAction: AnimationAction,
    endAction: AnimationAction,
    defaultDuration: any
  ) {
    if (!endAction.isRunning()) {
      endAction.play();
    }

    const duration = defaultDuration || this.duration;

    this.unPauseAllActions();
    console.log(endAction);
    this.synchronizeCrossFade(startAction, endAction, duration);
  }

  unPauseAllActions() {
    this.clipActions.forEach(function (action) {
      action.paused = false;
    });
  }
  pauseAllActions() {
    this.clipActions.forEach(function (action) {
      action.paused = true;
    });
  }
  selectClipAction(action: AnimationAction) {
    // if (this.currentAction) {
    //   this.currentAction.stop();
    // }
    // action.play();

    if (this.currentAction !== action) {
      this.prepareCrossFade(this.currentAction, action, 0.35);
    }
    this.currentAction = action;
  }
}
