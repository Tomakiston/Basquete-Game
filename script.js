const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

let engine;
let world;

let canvas;

let ball1, ball2, ball3;
let balls = [];

let ground;

let hoop;
let hoopImg;
let invHoop1, invHoop2, invHoop3;

let dragging = false;
let dragX = 0;
let dragY = 0;
let maxDrag = 150;

let forceMultiplier = 5;
let maxForce = 1000;

let throwForce;

let score = 0;

let gameState = "waiting";

function preload() {
    hoopImg = loadImage("assets/hoop.png");
}

function setup() {
    canvas = createCanvas(1200, 600);
    canvas.position(70,70);

    engine = Engine.create();
    world = engine.world;

    ball1 = new Ball(400,320);
    ball2 = new Ball(300,320);
    ball3 = new Ball(200,320);
    balls.push(ball3, ball2, ball1);

    hoop = createSprite(1005, 300);
    hoop.addImage(hoopImg);
    hoop.scale = 0.9;

    ground = new Ground(600,600, 1200,100);

    invHoop1 = new Ground(828,182, 20,36);
        invHoop1.visibility = 0;
    invHoop2 = new Ground(992,180, 60,20);
    invHoop3 = new Ground(1040,138, 35,273);

    throwForce = new Throw(ball1.body, {x: 400, y: 320});
}

function draw() {
    background("green")
    Engine.update(engine);

    ball1.display();
    ball2.display();
    ball3.display();

    ground.display();

    invHoop1.display();
    invHoop2.display();
    invHoop3.display();

    if(dragging && balls.length > 0) {
        let currentBall = balls[balls.length - 1];
        stroke("white");
        strokeWeight(4);
        line(currentBall.body.position.x, currentBall.body.position.y, dragX, dragY);
        fill("white");
        noStroke();
        circle(dragX, dragY, 15);
    }

    drawSprites();
}

function mousePressed() {
    if(gameState !== "launched" && balls.length > 0) {
        let currentBall = balls[balls.length - 1];
        let d = dist(mouseX, mouseY, currentBall.body.position.x, currentBall.body.position.y);

        if(d < 50) {
            dragging = true;
        }
    }
}

function mouseDragged() {
    if(dragging) {
        let currentBall = balls[balls.length - 1];

        dragX = mouseX;
        dragY = mouseY;

        let dx = dragX - currentBall.body.position.x;
        let dy = dragY - currentBall.body.position.y;

        let distance = sqrt(dx*dx + dy*dy);
        if(distance > maxDrag) {
            let angle = atan2(dy,dx);
            dragX = currentBall.body.position.x + cos(angle) * maxDrag;
            dragY = currentBall.body.position.y + sin(angle) * maxDrag;
        }

        let launchAngle = atan2(currentBall.body.position.y - dragY, currentBall.body.position.x - dragX);
        Body.setAngle(currentBall.body, launchAngle);

        return false;
    }
}

function mouseReleased() {
    if(dragging) {
        let currentBall = balls[balls.length - 1];
        
        let dx = currentBall.body.position.x - dragX;
        let dy = currentBall.body.position.y - dragY;

        let distance = sqrt(dx*dx + dy*dy);
        let force = min(distance * forceMultiplier, maxForce);
        let angle = atan2(dy,dx);
        let forceX = cos(angle) * force;
        let forceY = sin(angle) * force;

        currentBall.launchAngle = atan2(forceY, forceX);

        Body.setStatic(currentBall.body, false);

        Body.applyForce(currentBall.body, currentBall.body.position, {x: forceX, y: forceY});
        //Body.setVelocity(currentBall.body, {x: dx * 0.15, y: dy * 0.15});

        Body.setAngularVelocity(currentBall.body, 0.2);

        throwForce.fly();
        balls.pop();
        
        dragging = false;
        gameState = "launched";
    }
}

function keyPressed() {
    if(keyCode === 32 && gameState === "launched" && balls.length > 0) {
        let currentBall = balls[balls.length - 1];
        Matter.Body.setPosition(currentBall.body, {x: 400, y: 320});
        throwForce.attach(currentBall.body);

        gameState = "waiting";
    }
}