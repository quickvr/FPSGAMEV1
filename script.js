Video Script: Creating a First-Person Shooter with JavaScript on GitHub

[Intro Scene]

(Upbeat music plays)

[On-Screen Text]: "Create a First-Person Shooter with JavaScript!"

[Host On-Camera]: (Smiling and excited)

"Hey everyone! Welcome back to the channel. Today, we're diving into the world of game development and building a simple first-person shooter using JavaScript! We'll use mouse movement and the WASD keys to control our character. Plus, I'll show you how to set it all up on GitHub. So let’s get started!"

[Scene Transition to Screen Share]

[On-Screen Text]: "Step 1: Set Up Your Project"

[Voiceover]:

"First, let’s set up our project. Create a new folder on your computer for the game. Inside this folder, create three files: index.html, style.css, and script.js."

[Cut to Code Editor]

[Voiceover]:

"In index.html, we’ll set up the basic structure. Let’s start by creating the HTML skeleton."

(Shows typing)

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>First-Person Shooter</title>

<link rel="stylesheet" href="style.css">

</head>

<body>

<canvas id="gameCanvas"></canvas>

<script src="script.js"></script>

</body>

</html>

[On-Screen Text]: "Step 2: Style the Game Canvas"

[Voiceover]:

"Now let’s add some styles in style.css. We’ll make the canvas fill the screen."

(Shows typing)

body {

margin: 0;

overflow: hidden;

}

canvas {

display: block;

background: #333; /* Dark background for the game */

}

[Scene Transition Back to Code Editor]

[On-Screen Text]: "Step 3: Set Up the Game Logic"

[Voiceover]:

"Next, we’ll dive into the game logic in script.js. First, we’ll set up the canvas and basic variables."

(Shows typing)

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

let playerX = canvas.width / 2;

let playerY = canvas.height / 2;

let playerSpeed = 5;

let mouseX = canvas.width / 2;

let mouseY = canvas.height / 2;

document.addEventListener('mousemove', (event) => {

mouseX = event.clientX;

mouseY = event.clientY;

});

[On-Screen Text]: "Step 4: Handle Player Movement"

[Voiceover]:

"Now let's implement movement controls using the WASD keys."

(Shows typing)

const keys = {};

document.addEventListener('keydown', (event) => {

keys[event.key] = true;

});

document.addEventListener('keyup', (event) => {

keys[event.key] = false;

});

function update() {

if (keys['w']) playerY -= playerSpeed;

if (keys['s']) playerY += playerSpeed;

if (keys['a']) playerX -= playerSpeed;

if (keys['d']) playerX += playerSpeed;

// Keep the player within bounds

playerX = Math.max(0, Math.min(canvas.width, playerX));

playerY = Math.max(0, Math.min(canvas.height, playerY));

}

[On-Screen Text]: "Step 5: Game Loop"

[Voiceover]:

"Let’s create the main game loop to keep everything running."

(Shows typing)

function gameLoop() {

ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

// Update player position

update();

// Draw the player

ctx.fillStyle = 'white'; // Player color

ctx.fillRect(playerX, playerY, 20, 20); // Simple square to represent the player

requestAnimationFrame(gameLoop); // Request next frame

}

gameLoop(); // Start the game loop

[Scene Transition Back to Host On-Camera]

[Host]:

"Awesome! Now we have the basic functionality for our first-person shooter. You can move around using WASD keys and control the camera with your mouse!"

[On-Screen Text]: "Step 6: Upload to GitHub"

[Voiceover]:

"Finally, let’s push this to GitHub. First, initialize a new Git repository in your project folder:"

(Shows terminal commands)

git init

git add .

git commit -m "Initial commit of first-person shooter"

"Next, create a new repository on GitHub and follow the instructions to link your local project to GitHub."

(Shows filling out GitHub repository)

[Voiceover]:

"After that, push your changes!"

git remote add origin https://github.com/yourusername/your-repo.git

git push -u origin master

[Host On-Camera]

[Host]:

"And there you go! Your very own first-person shooter hosted on GitHub. You can now expand upon this basic version by adding enemies, shooting mechanics, or even textures. The possibilities are endless!"

(Waves goodbye)

"Thanks for watching! If you found this tutorial helpful, please like, subscribe, and hit that notification bell for more programming content. Happy coding!"

(Outro music plays)

[On-Screen Text]: "Subscribe for more! 🎮💻"

(End screen with video suggestions and subscribe button)
