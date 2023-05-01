const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x297C7C });
const box = new THREE.Mesh(geometry, material);
box.castShadow = true; //default is false
box.position.y =.8; //up
box.position.z = 0.5; //up
box.name="box";
export default box