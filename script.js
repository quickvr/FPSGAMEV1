let scene, camera, renderer;
let player;
const keys = {};

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Create a simple plane for the ground
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = - Math.PI / 2;
    scene.add(ground);

    // Create player (represented as a small box)
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.y = 0.5;
    scene.add(player);

    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    document.addEventListener('keydown', (event) => {
        keys[event.code] = true;
    });

    document.addEventListener('keyup', (event) => {
        keys[event.code] = false;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Add shooting mechanism
    document.addEventListener('click', shoot);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (keys['KeyW']) player.position.z -= 0.1;
    if (keys['KeyS']) player.position.z += 0.1;
    if (keys['KeyA']) player.position.x -= 0.1;
    if (keys['KeyD']) player.position.x += 0.1;

    renderer.render(scene, camera);
}

// Shooting function
function shoot() {
    const bulletGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    
    bullet.position.set(player.position.x, player.position.y, player.position.z);
    scene.add(bullet);

    const bulletDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    bullet.direction = bulletDirection;

    function moveBullet() {
        bullet.position.add(bullet.direction.clone().multiplyScalar(0.2)); // Move forward
        if (bullet.position.z < -50) {
            scene.remove(bullet); // Remove bullet if it goes too far
        } else {
            requestAnimationFrame(moveBullet);
        }
    }

    moveBullet();
}
