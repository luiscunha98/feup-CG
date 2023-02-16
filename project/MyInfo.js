import { CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCube } from './MyCube.js';

/**
 * MyInfo
 * @constructor
 * @param scene - Reference to MyScene object
 */


export class MyInfo extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.base = new MyCube(scene);
        this.cylinder = new MyCylinder(scene, 20);


        this.initMaterials(scene);

    }
    initMaterials(scene) {

        // wood texture

        this.mainbanner = new CGFappearance(scene);
        this.mainbanner.setAmbient(0.9, 0.9, 0.9, 1);
        this.mainbanner.setDiffuse(1, 1, 1, 1);
        this.mainbanner.setSpecular(1, 1, 1, 1);
        this.mainbanner.setShininess(10.0);
        this.mainbanner.loadTexture('images/mainbanner.png');
        this.mainbanner.setTextureWrap('REPEAT', 'REPEAT');

        //wood cover texture

        this.ctext = new CGFappearance(scene);
        this.ctext.setAmbient(0.9, 0.9, 0.9, 1);
        this.ctext.setDiffuse(1, 1, 1, 1);
        this.ctext.setSpecular(1, 1, 1, 1);
        this.ctext.setShininess(10.0);
        this.ctext.loadTexture('images/wood.jpg');
        this.ctext.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {

        this.scene.pushMatrix();
        this.mainbanner.apply();
        this.scene.translate(25, 4, 25);
        this.scene.scale(5, 5, 0.1);
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.ctext.apply();
        this.scene.translate(22.4,0, 25);
        this.scene.scale(0.1,6.5 , 0.1);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.ctext.apply();
        this.scene.translate(27.5,0, 25);
        this.scene.scale(0.1,6.5 , 0.1);
        this.cylinder.display();
        this.scene.popMatrix();

    }

}