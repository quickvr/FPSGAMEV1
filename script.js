let scene, camera, renderer;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();
let objects = [];
let bullets = [];

let playerSpeed = 5;
let bulletSpeed = 50;
let clock = new THREE.Clock();

// Set up the scene, camera, and renderer
function init() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera (FOV, aspect ratio, near, far)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create a renderer and append to document
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("fpsCanvas") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a simple ground
    let groundGeometry = new THREE.PlaneGeometry(100, 100);
    let groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    let ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    scene.add(ground);

    // Add a simple cube (target)
    let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    let cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0.5, -5); // Position the cube in front of the camera
    scene.add(cube);
    objects.push(cube);

    // Set the camera position
    camera.position.set(0, 1.5, 5); // Starting position

    // Event listeners for movement
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('click', onClick, false);
}

// Handle keyboard input
function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
    }
}

// Handle mouse click (shoot)
function onClick() {
    let bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    let bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    let bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    
    // Set the bullet at the camera position
    bullet.position.copy(camera.position);
    bullet.direction = camera.getWorldDirection(new THREE.Vector3());
    bullets.push(bullet);
    scene.add(bullet);
}

// Animate and render the scene
function animate() {
    requestAnimationFrame(animate);

    let delta = clock.getDelta();

    // Player movement
    if (moveForward) velocity.z = -playerSpeed * delta;
    if (moveBackward) velocity.z = playerSpeed * delta;
    if (moveLeft) velocity.x = -playerSpeed * delta;
    if (moveRight) velocity.x = playerSpeed * delta;

    camera.translateX(velocity.x);
    camera.translateZ(velocity.z);

    // Reset the velocity
    velocity.set(0, 0, 0);

    // Move bullets
    bullets.forEach(bullet => {
        bullet.position.add(bullet.direction.clone().multiplyScalar(bulletSpeed * delta));
    });

    // Render the scene
    renderer.render(scene, camera);
}

// Initialize the scene
init();
animate();
