export const DirectionalLightConfig = {
  type: "DirectionalLight",
  options: {
    color: "#ffffff",
    intensity: 3,
  },
  position: [0, 20, 0],
  castShadow: true,
  camera: {
    top: 2,
    bottom: -2,
    left: -2,
    right: 2,
    near: 0.1,
    far: 40,
  },
};

export const HemisphereLightConfig = {
  type: "HemisphereLight",
  options: {
    skyColor: "#ffffff",
    groundColor: "#8d8d8d",
    intensity: 3,
  },
  position: [0, 20, 0],
};


