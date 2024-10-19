import { LineBasicMaterial, LineDashedMaterial } from "three";

export function createLineBasicMaterial() {
  let material = new LineBasicMaterial({
    color: 0xffffff,
    linewidth: 1,
    linecap: "round", //ignored by WebGLRenderer
    linejoin: "round", //ignored by WebGLRenderer
  });
  return material;
}

export function createLineDashedMaterial() {
  let material = new LineDashedMaterial({
    color: 0xffffff,
    linewidth: 1,
    scale: 1,
    dashSize: 3,
    gapSize: 1,
  });
  return material;
}