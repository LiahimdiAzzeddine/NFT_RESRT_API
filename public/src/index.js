import camera from "./basic/Camera.js";
import light from "./basic/Light.js";
import renderer from "./basic/Renderer.js";
import scene from "./basic/Scene.js";
import resize from "./basic/Resize.js";
import plan from "./Models/SimpleModel.js";
import machine from "./basic/LoopMachine.js";
import Xbot from "./basic/Xbot.js";

// Define mouseX and mouseY at the beginning of the code
let mouseX = 0;
let mouseY = 0;
// Variables to keep track of mouse movement
let lastMouseX = 0;
let lastMouseY = 0;
// Rotate speed for the avatar
const rotateSpeed = 0.01;
let isMouseDown = false;

camera.position.set(0, 1.8, -3);
scene.add(light.ambientLight, light.directionalLight);

// Add loading message
const loadingMessage = document.createElement("div");
loadingMessage.innerText = "Loading...";
loadingMessage.style.position = "absolute";
loadingMessage.style.top = "50%";
loadingMessage.style.left = "50%";
loadingMessage.style.transform = "translate(-50%, -50%)";
document.body.appendChild(loadingMessage);

let plaLoaded = false;
let avatarLoaded = false;

Promise.all([plan, Xbot]).then(([pl, avatar]) => {
// Remove loading message
loadingMessage.style.display = "none";

pl.position.y = -0.7;
pl.position.z = 1.2;
pl.position.x = -1.6;
plaLoaded = true;
scene.add(pl);

avatar.rotation.y += 2.9
avatar.position.y = -0.8; //up
avatar.position.z = 1.2; //up
avatar.position.x = -1.6;
scene.add(avatar);
const mixer = new THREE.AnimationMixer(avatar);
const clip = avatar.animations[0]; // on récupère la première animation de l'avatar
const action = mixer.clipAction(clip); // on crée une action pour l'animation
action.play(); // on démarre l'animation
avatarLoaded = true;

machine.addCallback(() => {
mixer.update(0.015); // on met à jour le mixeur à chaque frame
// Update avatar rotation based on mouse movement
const deltaX = (mouseX - lastMouseX) * rotateSpeed;
avatar.rotation.y += deltaX;
pl.rotation.y += deltaX;
// Save last mouse position
lastMouseX = mouseX;
lastMouseY = mouseY;
renderer.render(scene, camera);
});
document.body.querySelector("h1").innerText = "Lizard Man";
machine.start();
});

//add
// Add event listener to track mouse movement
document.addEventListener("mousemove", (event) => {
if (isMouseDown) {
mouseX += event.movementX;
mouseY += event.movementY;
}
});
// Create the custom controller
document.addEventListener("mousedown", () => {
isMouseDown = true;
});
document.addEventListener("mouseup", () => {
isMouseDown = false;
});

resize.start(renderer);