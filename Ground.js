class Ground {
    constructor(x, y, width, height) {
        let properties = {isStatic: true};

        this.body = Bodies.rectangle(x, y, width, height, properties);
        this.width = width;
        this.height = height;
        this.visibility = 255;

        World.add(world, this.body);
    }

    display() {
        let pos = this.body.position;
        
        rectMode(CENTER);
        fill("#16680DFF");
        rect(pos.x, pos.y, this.width, this.height);
    }
}