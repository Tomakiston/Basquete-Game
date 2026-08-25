class Ball extends BaseClass {
    constructor(x,y) {
        super(x,y, 90,90);

        this.image = loadImage("assets/basketball.png");
        this.trajectory = [];
        this.visibility = 255;
    }

    display() {
        let pos = this.body.position;
        let angle = atan2(this.body.velocity.y, this.body.velocity.x);

        push();

        translate(pos.x, pos.y);
        rotate(angle);
        image(this.image, -40,-45, this.width,this.height);

        pop();

        if(this.body.velocity.x > 10 && this.body.position.x > 200) {
            let trajectoryPos = [this.body.position.x, this.body.position.y];

            this.trajectory.push(trajectoryPos);
        }
    }
}