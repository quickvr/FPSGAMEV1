let scene, camera, renderer;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let objects = [];
let bullets = [];

let playerSpeed = 5;
let bulletSpeed = 50;
let clock = new THREE.Clock();

let pitchObject, yawObject;
let isPointerLocked = true;

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
    cube.position.set(0, 1, -5); // Position the cube in front of the camera
    scene.add(cube);
    objects.push(cube);

    // Set up camera controls using yaw and pitch objects
    pitchObject = new THREE.Object3D();
    pitchObject.add(camera);

    yawObject = new THREE.Object3D();
    yawObject.add(pitchObject);
    scene.add(yawObject);

    // Set the initial camera position
    camera.position.set(0, 1, 5); // Starting position

    // Event listeners for movement and shooting
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('click', onClick, false);
    document.addEventListener('mousemove', onMouseMove, false);

    // Pointer lock API for mouse look
    document.body.addEventListener('click', function() {
        document.body.requestPointerLock();
    }, true);

    document.addEventListener('pointerlockchange', onPointerLockChange, false);
    document.addEventListener('pointerlockerror', onPointerLockError, false);
}

// Handle pointer lock state changes
function onPointerLockChange() {
    if (document.pointerLockElement === document.body) {
        isPointerLocked = true;
    } else {
        isPointerLocked = false;
    }
}

function onPointerLockError() {
    console.error("Pointer lock error.");
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

// Handle mouse movement (look around)
function onMouseMove(event) {
    if (isPointerLocked) {
        let movementX = event.movementX || 0;
        let movementY = event.movementY || 0;

        yawObject.rotation.y -= movementX * 0;
        pitchObject.rotation.x -= movementY * 0;
        pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchObject.rotation.x)); // Limit vertical look
    }
}

// Handle mouse click (shoot)
function onClick() {
    if (isPointerLocked) {
        let bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        let bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        let bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

        // Set the bullet at the camera position
        bullet.position.copy(camera.position);
        bullet.direction = camera.getWorldDirection(new THREE.Vector3());
        bullets.push(bullet);
        scene.add(bullet);
    }
}

// Animate and render the scene
function animate() {
    requestAnimationFrame(animate);

    let delta = clock.getDelta();

    // Player movement
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // Normalize to prevent faster diagonal movement

    if (moveForward || moveBackward) {
        velocity.z -= direction.z * playerSpeed * delta;
    }
    if (moveLeft || moveRight) {
        velocity.x -= direction.x * playerSpeed * delta;
    }

    yawObject.translateX(velocity.x * delta);
    yawObject.translateZ(velocity.z * delta);

    // Reset the velocity
    velocity.x = velocity.z = 0;

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
