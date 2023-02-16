import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { CGFappearance } from "../lib/CGF.js";
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

        this.initMaterials(scene);
    }

    initMaterials(scene) {
       
        //mine side material
        this.mineSide = new CGFappearance(scene);
        this.mineSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineSide.setShininess(10.0);
        this.mineSide.loadTexture('images/mineSide.png');
        this.mineSide.setTextureWrap('REPEAT', 'REPEAT');

        //mine top material
        this.mineTop = new CGFappearance(scene);
        this.mineTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineTop.setShininess(10.0);
        this.mineTop.loadTexture('images/mineTop.png');
        this.mineTop.setTextureWrap('REPEAT', 'REPEAT');

        //mine bottom material
        this.mineBottom = new CGFappearance(scene);
        this.mineBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineBottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineBottom.setShininess(10.0);
        this.mineBottom.loadTexture('images/mineBottom.png');
        this.mineBottom.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {

        //sides
        this.mineSide.apply();
        if(this.scene.nearestFilter){
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST); 
        } else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR); 
        }

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
        this.mineBottom.apply();

        if(this.scene.nearestFilter){
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST); 
        } else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR); 
        }

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate((Math.PI)/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //top face
        this.mineTop.apply();

        if(this.scene.nearestFilter){
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST); 
        } else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR); 
        }

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(3*(Math.PI)/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }
}