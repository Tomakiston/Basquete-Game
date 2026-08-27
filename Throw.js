class Throw {
    constructor(bodyA, pointB) {
        let properties = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }

        this.pointB = pointB;

        this.throw = Constraint.create(properties);
        World.add(world, this.throw);
    }

    attach(body) {
        this.throw.bodyA = body;
    }

    fly() {
        this.throw.bodyA = null;
    }
}