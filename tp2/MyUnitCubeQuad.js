import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.quad = new MyQuad(scene);
    }

    display() {

        //face 1
        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,0);
        this.quad.display();
        this.scene.popMatrix();

        //face 2
        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,-1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face 3
        this.scene.pushMatrix();
        this.scene.translate(1,-0.5,-0.5);
        this.scene.rotate((Math.PI)/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face 4
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,-0.5);
        this.scene.rotate(3*(Math.PI)/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face 5
        this.scene.pushMatrix();
        this.scene.translate(0.5,-1,-0.5);
        this.scene.rotate((Math.PI)/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face 6
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,-0.5);
        this.scene.rotate(3*(Math.PI)/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }
}