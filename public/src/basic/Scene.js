const scene = new THREE.Scene();

// Create a texture loader
const loader = new THREE.TextureLoader();

// Load the background image
const backgroundTexture = loader.load('/assets/img/Swampd.jpg');

// Set the texture as the scene background
scene.background = backgroundTexture;

// Set fog for the scene
scene.fog = new THREE.Fog(0xC7DDDD, 10, 50);

export default scene;
