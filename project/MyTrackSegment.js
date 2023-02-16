import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
 
/**
 * MyTrackSegment
 * @constructor
 * @param scene - Reference to MyScene object
 * @param point1 - First point of the segment
 * @param point2 - Second point of the segment
 */

export class MyTrackSegment extends CGFobject {
    constructor(scene, point1, point2) {
        super(scene);

        this.scene = scene;
        this.point1X = point1.x;
        this.point1Z = point1.z;
        this.point2X = point2.x;
        this.point2Z = point2.z;

        this.quad = new MyQuad(scene);
        this.calcAngleAndScale();
        this.initMaterials(scene);
    }

    //Calculates the angle and scale of the segment
    calcAngleAndScale() {

        //angle between the two points
        let x = this.point2X - this.point1X;
        let z = this.point2Z - this.point1Z;
        
        this.angle = Math.atan2(z, x);

        //scaling factor
        this.scale = Math.sqrt(x*x + z*z);
    }

    initMaterials(scene) {

        //create rails texture for each track segment
        this.rails = new CGFappearance(scene);
        this.rails.setAmbient(0.9, 0.9, 0.9, 1);
        this.rails.setDiffuse(1, 1, 1, 1);
        this.rails.setSpecular(1, 1, 1, 1);
        this.rails.setShininess(10.0);
        this.rails.loadTexture('images/tracks.png');
        this.rails.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        
        //Apply Texture
        this.rails.apply();
        
        //Apply Transformation

        this.scene.pushMatrix();
        this.scene.translate(this.point2X, 0.02, this.point2Z);
        this.scene.rotate(-this.angle, 0, 1, 0);
        this.quad.updateTexCoords([
            0, 1,
            1, 1,
			0, 0,
			0, 1,
		]);

        this.scene.scale(4, 1, 4);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.point1X, 0, this.point1Z);
        this.scene.rotate(-this.angle, 0, 1, 0);
        this.quad.updateTexCoords([
			0, 1,
			this.scale, 1,
			0, 0,
			this.scale, 0
		]);
        this.scene.scale(this.scale, 1, 4);
        this.scene.translate(0.5, 0.01, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        
    }
}