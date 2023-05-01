const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 1, 1.8, - 2.8 );
camera.lookAt( 0, 0.7, 0 );
export default camera