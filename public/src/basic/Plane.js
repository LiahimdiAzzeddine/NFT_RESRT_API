const geometry = new THREE.PlaneGeometry( 18, 15, 32, 32 );
const material = new THREE.MeshStandardMaterial({ color: 0x7c7c29, side: THREE.BackSide });
const plane = new THREE.Mesh( geometry, material );

// Déformation du plan
const positions = geometry.attributes.position.array;
for (let i = 0; i < positions.length; i += 3) {
  const x = positions[i];
  const y = positions[i + 1];
  const z = (Math.sin(x * 0.4) * .3 + Math.sin(y * 0.6) * .3) * Math.random();
  positions[i + 2] = z; // ajuster la hauteur en fonction de la position des sommets
}
geometry.computeFaceNormals(); // recalculate les normales pour une meilleure apparence des ombres
geometry.computeVertexNormals(); // recalculate les normales des sommets pour une apparence plus lisse

plane.rotation.x = Math.PI * 0.5;
plane.receiveShadow = true;

export default plane;
