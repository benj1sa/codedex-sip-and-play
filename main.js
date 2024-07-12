import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas') });
//renderer.setSize(container.innerWidth, container.innerHeight);
renderer.setClearColor(new THREE.Color(0xffffff)); // hex for white

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // enable damping

// Lighting
const ambientLight = new THREE.AmbientLight(0x333333, 50);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight()
spotLight.position.set(0.55, 1.5, 0.55)
spotLight.castShadow = true
spotLight.angle = 0.5
spotLight.distance = 2.7
spotLight.penumbra = 1
spotLight.decay = 2
spotLight.intensity = 7
scene.add(spotLight)
//const spotLightHelper = new THREE.SpotLightHelper(spotLight)
//scene.add(spotLightHelper)

// Load Latte
let latte;
loader.load(
    '/cafe_latte_with_art.glb',
    function (gltf) {
        latte = gltf.scene;
        scene.add(latte);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// Set camera position
camera.position.set(0.6,1.5,1.5)

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

animate();