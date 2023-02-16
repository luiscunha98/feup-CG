import { CGFobject } from "../lib/CGF.js";
import { MyTrainModel } from "./MyTrainModel.js";
import { MyTrack } from "./MyTrack.js";
import { MyCrane } from "./MyCrane.js";

const vehicle_state = {
    'STOPPED': 0,
    'ACCELERATING': 1,
    'CRUISING': 2,
    'DECELERATING': 3,
}

export class State_Machine extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
 
        this.train = new MyTrainModel(scene);
        this.crane = new MyCrane(scene);
        this.tracks = new MyTrack(scene);

        this.currentState = vehicle_state.STOPPED;
        this.currentStation = 0;
        this.nextStation = 1;
        this.countStations = 0;

        this.currentX = this.tracks.points[0][0];
        this.currentZ = this.tracks.points[0][1];
        this.angle = 0;
        this.velocity = 0;
        this.cruiseVelocity = 0.03;
        this.acceleration = 0.003;

        this.calcAngle(this.tracks.points[0], this.tracks.points[1]);

    }

    calcAngle(point1, point2) {
        return -Math.atan2(point2[1] - point1[1], point2[0] - point1[0]) + Math.PI/2;
    }

    calcTwoPointsLine(point1, point2) {
        if(point1[0] == point2[0]) {
            this.currentZ = point1[1];
        } else {

            this.slope = (point2[1] - point1[1]) / (point2[0] - point1[0]);

            this.intercept = point1[1] - this.slope * point1[0];

            this.currentZ = this.slope * this.currentX + this.intercept;
        }
    }

    calcDistanceTwoPoints(point1X, point1Z, point2X, point2Z) {
        return Math.sqrt(Math.pow(point2X - point1X, 2) + Math.pow(point2Z - point1Z, 2));
    }

    changeStation() {
        this.currentStation = this.nextStation;
        
        if(this.nextStation + 1 >= this.tracks.points.length) {
            this.nextStation = 0;
            if(this.tracks.points[this.nextStation][2] == "station") {
                this.countStations = 0;
            }
        } else {
            this.nextStation++;
            if(this.tracks.points[this.nextStation][2] == "station") {
                this.countStations++;
            }
        }

        this.currentX = this.tracks.points[this.currentStation][0];
        this.calcTwoPointsLine(this.tracks.points[this.currentStation], this.tracks.points[this.nextStation]);
        this.angle = this.calcAngle(this.tracks.points[this.currentStation], this.tracks.points[this.nextStation]);

    }

    curving(val) {
        this.angle += val;
    }

    update(t) {

        this.distance1 = this.calcDistanceTwoPoints(this.currentX, this.currentZ, this.tracks.points[this.nextStation][0], this.tracks.points[this.nextStation][1]);
        
        if(this.nextStation + 1 >= this.tracks.points.length) {
            this.drift = this.calcAngle(this.tracks.points[this.nextStation], this.tracks.points[0]);
            this.tempAngle = this.calcAngle(this.tracks.points[this.nextStation], this.tracks.points[0]);
        } else {
            this.drift = this.calcAngle(this.tracks.points[this.nextStation], this.tracks.points[this.nextStation + 1]);
            this.tempAngle = this.calcAngle(this.tracks.points[this.nextStation], this.tracks.points[this.nextStation + 1]);
        }

        if(this.tracks.points[this.nextStation][2] == "station") {
            this.frames = 2 / 0.01;
        } else {
            this.frames = 2 / 0.025;
        }

        this.val = this.drift/this.frames;

        console.log(this.drift);

        if(this.drift < 0) {
            this.val *= -1;

            if(this.distance1 < 2 && this.val - this.angle > this.tempAngle) {
                this.curving(this.val);
                console.log(this.val + " Negative Angle");
            }
        } else 
        if(this.distance1 < 2 && this.val + this.angle < this.tempAngle) {
            this.curving(this.val);
            console.log(this.val + " Positive Angle");
        }

        switch (this.currentState) {
            case vehicle_state.STOPPED:
                this.train.cloud.resetCloud();
                this.velocity = 0;
                break;

            case vehicle_state.ACCELERATING:
                this.train.cloud.updateCloud();
                this.train.running(this.velocity);
                if(this.velocity < this.cruiseVelocity) {
                    if(this.currentX == this.tracks.points[this.currentStation][0] && this.currentZ < this.tracks.points[this.nextStation][1]) {
                        this.velocity += this.acceleration;
                        this.currentZ += this.velocity;
                    } else
                    if(this.currentX == this.tracks.points[this.currentStation][0] && this.currentZ > this.tracks.points[this.nextStation][1]) {
                        this.velocity += this.acceleration;
                        this.currentZ -= this.velocity;
                    } else
                    if(this.currentX < this.tracks.points[this.nextStation][0]) {
                        this.velocity += this.acceleration;
                        this.currentX += this.velocity;
                        this.calcTwoPointsLine(this.tracks.points[this.currentStation], this.tracks.points[this.nextStation]);
                    } else
                    if(this.currentX > this.tracks.points[this.nextStation][0]) {
                        this.velocity += this.acceleration;
                        this.currentX -= this.velocity;
                        this.calcTwoPointsLine(this.tracks.points[this.currentStation], this.tracks.points[this.nextStation]);
                    }
                } else {
                    this.velocity = this.cruiseVelocity;
                    this.currentState = vehicle_state.CRUISING;
                }
                break;

            case vehicle_state.CRUISING:
                this.train.cloud.updateCloud();
                this.train.running(this.velocity);
                if(this.currentX == this.tracks.points[this.currentStation][0] && this.currentX == this.tracks.points[this.nextStation][0] && this.currentZ < this.tracks.points[this.nextStation][1]) {
                    this.currentZ += this.velocity;
                    if(this.currentZ > this.tracks.points[this.nextStation][1]) {
                        this.changeStation();
                    }
                } else
                if(this.currentX == this.tracks.points[this.currentStation][0] && this.currentX == this.tracks.points[this.nextStation][0] && this.currentZ > this.tracks.points[this.nextStation][1]) {
                    this.currentZ -= this.velocity;
                    if(this.currentZ < this.tracks.points[this.nextStation][1]) {
                        this.changeStation();
                    }
                } else
                if(this.currentX < this.tracks.points[this.nextStation][0]) {
                    this.currentX += this.velocity;
                    this.calcTwoPointsLine(this.tracks.points[this.currentStation], this.tracks.points[this.nextStation]);
                    if(this.currentX > this.tracks.points[this.nextStation][0]) {
                        this.changeStation();
                    }
                } else
                if(this.currentX > this.tracks.points[this.nextStation][0]) {
                    this.currentX -= this.velocity;
                    this.calcTwoPointsLine(this.tracks.points[this.currentStation], this.tracks.points[this.nextStation]);
                    if(this.currentX < this.tracks.points[this.nextStation][0]) {
                        this.changeStation();
                    }
                }
                this.distance1 = this.calcDistanceTwoPoints(this.currentX, this.currentZ, this.tracks.points[this.nextStation][0], this.tracks.points[this.nextStation][1]);

                if((Math.pow(this.distance1,2) < Math.pow(0.3,2) ) && this.tracks.points[this.nextStation][2] == "station") {
                    this.currentState = vehicle_state.DECELERATING;
                    break;
                }
                break;

            case vehicle_state.DECELERATING:
                this.train.cloud.updateCloud();
                this.train.running(-this.velocity);
                if(this.velocity > 0) {
                    if(this.currentX == this.tracks.points[this.currentStation][0] && this.currentZ < this.tracks.points[this.nextStation][1]) {
                        this.velocity -= this.acceleration;
                        this.currentZ += this.velocity;
                    } else
                    if(this.currentX == this.tracks.points[this.currentStation][0] && this.currentZ > this.tracks.points[this.nextStation][1]) {
                        this.velocity -= this.acceleration;
                        this.currentZ -= this.velocity;
                    } else
                    if(this.currentX < this.tracks.points[this.nextStation][0]) {
                        this.velocity -= this.acceleration;
                        this.currentX += this.velocity;
                        this.calcTwoPointsLine(this.tracks.points[this.currentStation], this.tracks.points[this.nextStation]);
                    } else
                    if(this.currentX > this.tracks.points[this.nextStation][0]) {
                        this.velocity -= this.acceleration;
                        this.currentX -= this.velocity;
                        this.calcTwoPointsLine(this.tracks.points[this.currentStation], this.tracks.points[this.nextStation]);
                    }
                } else {
                    this.distance1 = this.calcDistanceTwoPoints(this.currentX, this.currentZ, this.tracks.points[this.nextStation][0], this.tracks.points[this.nextStation][1]);
                    if(this.distance1 < 1) {
                        this.velocity = 0;
                        this.changeStation();
                        this.crane.woods.isLoaded = false;
                        this.currentState = vehicle_state.STOPPED;
                    }
                }
                break;
        }
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.currentX, 0, this.currentZ);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.crane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.currentX, 0, this.currentZ);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.train.display();
        this.scene.popMatrix();
    }
}