import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { CGFappearance } from "../lib/CGF.js";
/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.quad = new MyQuad(scene);

        this.initMaterials(scene);
    }

    
    initMaterials(scene){
        //left material
        this.cubeLeft = new CGFappearance(scene);
        this.cubeLeft.setAmbient(0.9, 0.9, 0.9, 1);
        this.cubeLeft.setDiffuse(0, 0, 0, 0);
        this.cubeLeft.setSpecular(0, 0, 0, 0);
        this.cubeLeft.setEmission(1,1,1,1);
        this.cubeLeft.setShininess(10.0);
        this.cubeLeft.loadTexture('images/demo_cubemap/left.png');
        this.cubeLeft.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //right material
        this.cubeRight = new CGFappearance(scene);
        this.cubeRight.setAmbient(0.9, 0.9, 0.9, 1);
        this.cubeRight.setDiffuse(0, 0, 0, 0);
        this.cubeRight.setSpecular(0, 0, 0, 0)
        this.cubeRight.setEmission(1,1,1,1);
        this.cubeRight.setShininess(10.0);
        this.cubeRight.loadTexture('images/demo_cubemap/right.png');
        this.cubeRight.setTextureWrap('CLAMP_To_EDGE', 'CLAMP_TO_EDGE');

        //front material
        this.cubeFront = new CGFappearance(scene);
        this.cubeFront.setAmbient(0.9, 0.9, 0.9, 1);
        this.cubeFront.setDiffuse(0, 0, 0, 0);
        this.cubeFront.setSpecular(0, 0, 0, 0);
        this.cubeFront.setEmission(1, 1, 1, 1);
        this.cubeFront.setShininess(10.0);
        this.cubeFront.loadTexture('images/demo_cubemap/front.png');
        this.cubeFront.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //back material
        this.cubeBack = new CGFappearance(scene);
        this.cubeBack.setAmbient(0.9, 0.9, 0.9, 1);
        this.cubeBack.setDiffuse(0, 0, 0, 0);
        this.cubeBack.setSpecular(0, 0, 0, 0);
        this.cubeBack.setEmission(1, 1, 1, 1);
        this.cubeBack.setShininess(10.0);
        this.cubeBack.loadTexture('images/demo_cubemap/back.png');
        this.cubeBack.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //top material
        this.cubeTop= new CGFappearance(scene);
        this.cubeTop.setAmbient(0.9, 0.9, 0.9, 1);
        this.cubeTop.setDiffuse(0, 0, 0, 0);
        this.cubeTop.setSpecular(0, 0, 0, 0);
        this.cubeTop.setEmission(1, 1, 1, 1);
        this.cubeTop.setShininess(10.0);
        this.cubeTop.loadTexture('images/demo_cubemap/top.png');
        this.cubeTop.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //bottom material
        this.cubeBottom = new CGFappearance(scene);
        this.cubeBottom.setAmbient(0.9, 0.9, 0.9, 1);
        this.cubeBottom.setDiffuse(0, 0, 0, 0);
        this.cubeBottom.setSpecular(0, 0, 0, 0);
        this.cubeBottom.setEmission(1, 1, 1, 1);
        this.cubeBottom.setShininess(10.0);
        this.cubeBottom.loadTexture('images/demo_cubemap/bottom.png');
        this.cubeBottom.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }
    
	display() {

        this.scene.pushMatrix();
        
        this.scene.scale(50,50,50);
        
        // Front
        this.scene.pushMatrix();
        this.cubeFront.apply();
        this.scene.translate(0.5, 0.5, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();
        this.cubeBack.apply();
        this.scene.translate(0.5, 0.5, 1);
        this.scene.rotate(-Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix(); 

        // Right
        this.scene.pushMatrix();
        this.cubeRight.apply();
        this.scene.translate(1, 0.5, 0.5);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
    
        // Left
        this.scene.pushMatrix();
        this.cubeLeft.apply();
        this.scene.translate(0, 0.5, 0.5);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Top
        this.scene.pushMatrix();
        this.cubeTop.apply();
        this.scene.translate(0.5, 1, 0.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        // Bottom
        this.scene.pushMatrix();
        this.cubeBottom.apply();
        this.scene.translate(0.5, 0, 0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.quad.enableNormalViz()
    }

    disableNormalViz(){
        this.quad.disableNormalViz();
    }

    updateTextures() {
        if(this.scene.textureOn == 0) {
            this.cubeLeft.loadTexture('images/demo_cubemap/left.png');
            this.cubeRight.loadTexture('images/demo_cubemap/right.png');
            this.cubeFront.loadTexture('images/demo_cubemap/front.png');
            this.cubeBack.loadTexture('images/demo_cubemap/back.png');
            this.cubeTop.loadTexture('images/demo_cubemap/top.png');
            this.cubeBottom.loadTexture('images/demo_cubemap/bottom.png');
        }
        else if(this.scene.textureOn == 1) {
            this.cubeLeft.loadTexture('images/test_cubemap/nx.png');
            this.cubeRight.loadTexture('images/test_cubemap/px.png');
            this.cubeFront.loadTexture('images/test_cubemap/nz.png');
            this.cubeBack.loadTexture('images/test_cubemap/pz.png');
            this.cubeTop.loadTexture('images/test_cubemap/py.png');
            this.cubeBottom.loadTexture('images/test_cubemap/ny.png');
        }
        else if(this.scene.textureOn == 2) {
            this.cubeLeft.loadTexture('images/our_cubemap/left.png');
            this.cubeRight.loadTexture('images/our_cubemap/right.png');
            this.cubeFront.loadTexture('images/our_cubemap/front.png');
            this.cubeBack.loadTexture('images/our_cubemap/back.png');
            this.cubeTop.loadTexture('images/our_cubemap/top.png');
            this.cubeBottom.loadTexture('images/our_cubemap/bottom.png');
        }
        
    }
}