export const GLTFMeshConfig = {
  type: "GLTFMesh",
  options: {
    skyColor: "#ffffff",
    groundColor: "#8d8d8d",
    intensity: 3,
  },
  position: [0, 20, 0],
};

export const PlaneMeshConfig = {
  type: "PlaneMesh",
  geometry: [100, 100],
  material: {
    type: "MeshPhongMaterial",
    options: {
      color: 0xcbcbcb,
      depthWrite: false,
    },
  },
};
