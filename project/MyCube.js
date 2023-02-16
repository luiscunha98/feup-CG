import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { CGFappearance } from "../lib/CGF.js";
/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCube extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.quad = new MyQuad(scene);
    }
    display() {

        //front face 
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        // back face
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //right face
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate((Math.PI)/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //left face
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(3*(Math.PI)/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();


        //bottom face
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate((Math.PI)/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //top face
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(3*(Math.PI)/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }
}