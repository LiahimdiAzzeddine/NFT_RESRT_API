const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(1, 1, -1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;

export default {ambientLight,directionalLight}


