const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

let canvas;

let ball1, ball2, ball3;
let balls = [];

let score = 0;

let gameState = "waiting";

function preload() {

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
}

function draw() {
    background("green")
    Engine.update(engine);

    ball1.display();
    ball2.display();
    ball3.display();
}

function mouseDragged() {
    if(gameState !== "launched" && balls.length > 0) {
        let currentBall = balls[balls.length - 1];
        Matter.Body.setPosition(currentBall.body, {x: mouseX, y: mouseY});

        return false;
    }
}