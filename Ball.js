class Ball extends BaseClass {
    constructor(x,y) {
        super(x,y, 120,120);

        this.image = loadImage("assets/basketball.png");
        this.trajectory = [];
        this.visibility = 255;
    }

    display() {
        super.display();

        if(this.body.velocity.x > 10 && this.body.position.x > 200) {
            let pos = [this.body.position.x, this.body.position.y];

            this.trajectory.push(pos);
        }
    }
}