import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyTrainSmoke extends CGFobject{
    constructor(scene){
        super(scene);

        this.random1 = Math.floor(Math.random() * (20 - 4 + 1)) + 4;
        this.random2 = Math.floor(Math.random() * (20 - 4 + 1)) + 4;

        this.cloud = new MySphere(scene, this.random1, this.random2);
        this.cloud2 = new MySphere(scene, this.random2, this.random1);
        this.cloud3 = new MySphere(scene, this.random1, this.random1);
        this.cloud4 = new MySphere(scene, this.random2, this.random2);


        this.initialPosition = {x: 0, y: 0, z: 0};
        this.resetCloud();
        this.initMaterials(scene);
    }

    initMaterials(scene){

        //cloud texture
        this.cloudTexture = new CGFappearance(scene);
        this.cloudTexture.setAmbient(0.9, 0.9, 0.9, 1);
        this.cloudTexture.setDiffuse(1, 1, 1, 1);
        this.cloudTexture.setSpecular(1, 1, 1, 1);
        this.cloudTexture.setShininess(10.0);
        this.cloudTexture.loadTexture('images/cloud.png');
        this.cloudTexture.setTextureWrap('REPEAT', 'REPEAT');

    }

    resetCloud(){
        this.scaleFactor = 0;
        this.initialPosition.y = 0;
        this.initialPosition.z = 0;
        this.cloud1Y = 0;
        this.cloud2Y = 0;
        this.cloud3Y = 0;
        this.cloud4Y = 0;
        this.cloud1Z = 0;
        this.cloud2Z = 0;
        this.cloud3Z = 0;
        this.cloud4Z = 0;
        this.cloud1Scale = 0;
        this.cloud2Scale = 0;
        this.cloud3Scale = 0;
        this.cloud4Scale = 0;

    }

    updateCloud() {
        if(this.scaleFactor > 0.7){
            this.resetCloud();
            this.randomNumber();
            this.randomScale();
        } else {
            if(this.cloud1Y == 0) {
                this.randomNumber();
                this.randomScale();
            }
            this.initialPosition.y += 0.01;
            this.initialPosition.z -= 0.01;
            this.scaleFactor += 0.002;
        }
    }

    randomNumber() {
        //calculate random number for Y position
        this.cloud1Y = (Math.random() * (5 - 4.3 + 1)) + 4.3;
        this.cloud2Y = (Math.random() * (5 - 4.3 + 1)) + 4.3;
        this.cloud3Y = (Math.random() * (5 - 4.3 + 1)) + 4.3;
        this.cloud4Y = (Math.random() * (5 - 4.3 + 1)) + 4.3;

        //calculate random number for Z position
        this.cloud1Z = (Math.random() * (2.1 - 1.7 + 1)) + 1.7;
        this.cloud2Z = (Math.random() * (2.1 - 1.7 + 1)) + 1.7;
        this.cloud3Z = (Math.random() * (2.1 - 1.7 + 1)) + 1.7;
        this.cloud4Z = (Math.random() * (2.1 - 1.7 + 1)) + 1.7;
    }

    randomScale() {
        this.cloud1Scale = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) / 100;
        this.cloud2Scale = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) / 100;
        this.cloud3Scale = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) / 100;
        this.cloud4Scale = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) / 100;
    }

    display(){  

        this.scene.pushMatrix();
        this.cloudTexture.apply();
        this.scene.translate(this.initialPosition.x, this.initialPosition.y + this.cloud1Y, this.initialPosition.z + this.cloud1Z);
        this.scene.scale(this.cloud1Scale + this.scaleFactor,this.cloud1Scale + this.scaleFactor,this.cloud1Scale + this.scaleFactor);
        this.cloud.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.cloudTexture.apply();
        this.scene.translate(this.initialPosition.x, this.initialPosition.y + this.cloud2Y, this.initialPosition.z + this.cloud2Z);
        this.scene.scale(this.cloud2Scale + this.scaleFactor,this.cloud2Scale + this.scaleFactor,this.cloud2Scale + this.scaleFactor);
        this.cloud2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.cloudTexture.apply();
        this.scene.translate(this.initialPosition.x, this.initialPosition.y + this.cloud3Y, this.initialPosition.z + this.cloud3Z);
        this.scene.scale(this.cloud3Scale + this.scaleFactor,this.cloud3Scale + this.scaleFactor,this.cloud3Scale + this.scaleFactor);
        this.cloud3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.cloudTexture.apply();
        this.scene.translate(this.initialPosition.x, this.initialPosition.y + this.cloud4Y, this.initialPosition.z + this.cloud4Z);
        this.scene.scale(this.cloud4Scale + this.scaleFactor,this.cloud4Scale + this.scaleFactor,this.cloud4Scale + this.scaleFactor);
        this.cloud4.display();
        this.scene.popMatrix();

    }
}