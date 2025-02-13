// Create Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Particle Globe Geometry
const particles = new THREE.BufferGeometry();
const particleCount = 400;
const positions = [];

for (let i = 0; i < particleCount; i++) {
   let theta = Math.random() * Math.PI * 2; // Longitude
   let phi = Math.acos(Math.random() * 2 - 1); // Latitude
   let radius = 2; // Globe radius

   let x = radius * Math.sin(phi) * Math.cos(theta);
   let y = radius * Math.sin(phi) * Math.sin(theta);
   let z = radius * Math.cos(phi);

   positions.push(x, y, z);
}

particles.setAttribute(
   "position",
   new THREE.Float32BufferAttribute(positions, 3)
);

// Create Particle Material
const material = new THREE.PointsMaterial({
   // color: 0x00ff99,
   color: 0x00a3ff,
   size: 0.05,
   transparent: true,
   opacity: 0.8, // Slight glow effect
   blending: THREE.AdditiveBlending, // Makes particles blend and glow
});

// Create Particle System
const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);

// Set Camera Position
camera.position.z = 5;

// Animation Loop
function animate() {
   requestAnimationFrame(animate);
   particleSystem.rotation.y += 0.002;
   // Make some particles pulse
   renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener("resize", () => {
   renderer.setSize(window.innerWidth, window.innerHeight);
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
});

// Start Animation
animate();
