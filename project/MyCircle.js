import { CGFobject } from "../lib/CGF.js";

export class MyCircle extends CGFobject { 

    constructor(scene, nsides, coords) {
        super(scene);

        this.nsides = nsides;
        this.initBuffers();
        if (coords != undefined)
			this.updateTexCoords(coords);
    }

    initBuffers() {
        
        this.vertices = [];
		this.indices = [];
		this.normals = [];
        this.texCoords = [];

        var angle = (2 * Math.PI) / this.nsides;

        for(let i = 0; i < this.nsides; i++) {

            this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), 0); //0
            this.vertices.push(Math.cos((i+1) * angle), Math.sin((i+1) * angle), 0); //1
            this.vertices.push(0,0,0); //2
            this.indices.push(0+i*3, 1+i*3, 2+i*3);

            this.normals.push(0, 0, 1,
                              0, 0, 1,
                              0, 0, 1);

            this.texCoords.push(0.5 + Math.cos(i * angle)/2, 0.5 - Math.sin(i * angle)/2);
            this.texCoords.push(0.5 + Math.cos((i+1) * angle)/2, 0.5 - Math.sin((i+1) * angle)/2);               
            this.texCoords.push(0.5, 0.5);                    
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}