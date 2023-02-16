import { CGFobject } from "../../lib/CGF.js";
import { MyTrack } from "./MyTrack.js";
import { MyStationModel } from "./MyStationModel.js";

export class PlaceStations extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.track = new MyTrack(scene);

        this.initBuffers();
    }

    calcStationAngle(point1, point2) {

        var x = point2.x - point1.x;
        var z = point2.z - point1.z;

        this.angle = Math.atan2(z, x);

    }

    initBuffers() {

        this.listStations = [];
        this.stationPoints = [];
        
        for(let i = 0; i < this.track.points.length; i++){
            if(this.track.points[i][2] == "station"){
                if(i+1 == this.track.points.length){
                    var point1 = {x: this.track.points[i][0], z: this.track.points[i][1]};
                    var point2 = {x: this.track.points[0][0], z: this.track.points[0][1]};
                } else {
                    var point1 = {x: this.track.points[i][0], z: this.track.points[i][1]};
                    var point2 = {x: this.track.points[i+1][0], z: this.track.points[i+1][1]};
                }
                this.stationPoints.push(point1);
                this.stationPoints.push(point2);

                this.station = new MyStationModel(this.scene);
                this.listStations.push(this.station);
            }
        }
    }

    display() {
        for(let i = 0; i < this.listStations.length; i++){

            this.calcStationAngle(this.stationPoints[2*i], this.stationPoints[2*i+1]);
            
            this.scene.pushMatrix();
            this.scene.translate(this.stationPoints[2*i].x, 0 , this.stationPoints[2*i].z);
            this.scene.scale(0.8, 0.8, 0.8);
            this.scene.rotate(-this.angle,0,1,0);
            this.scene.rotate(Math.PI/2,0,1,0);
            this.scene.translate(-9.5, 0, 0);
            this.listStations[i].display();
            this.scene.popMatrix();
        }
    }
}