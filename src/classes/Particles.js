import * as THREE from 'three';
import gsap from 'gsap'

import LoadingController from './LoadingControls.js'

class ParticleSystem {
    constructor() {
        this.bind();
        this.particleCount = 350;
        this.boxSize = 30;
        this.textureLoader = new THREE.TextureLoader(LoadingController)

    }

    init(scene) {
        this.scene = scene
        this.particlesGeom = new THREE.BufferGeometry()
        this.particlesPos = []

        for (let p = 0; p < this.particleCount; p++) {

            let x = Math.random() * this.boxSize - this.boxSize / 2;
            let y = Math.random() * this.boxSize - this.boxSize / 2;
            let z = Math.random() * this.boxSize - this.boxSize / 2;

            // Create the vertex
            this.particlesPos.push(x, y, z);
        }

        this.particlesGeom.setAttribute('position', new THREE.Float32BufferAttribute(this.particlesPos, 3));

        const leafTexture = this.textureLoader.load('./assets/model/leaf.png')
        this.particleMaterial = new THREE.PointsMaterial(
            {
                color: 0xfaf0e6,
                size: .15,
                sizeAttenuation: true,
                map:leafTexture,
                transparent: true,
                opacity: 0.8
            });

            
        
        this.particleSystem = new THREE.Points(this.particlesGeom, this.particleMaterial);
        //console.log(this.particlesGeom.attributes.position.array);
        this.scene.add(this.particleSystem)
    }

    update() {
        let i = 0
        while (i < this.particleCount) {
            this.particlesGeom.attributes.position.array[i * 3 + 1] -= 0.01
            // this.particlesGeom.attributes.position.array[i * 3 + 2] += 0.01
            if(this.particlesGeom.attributes.position.array[i * 3 + 1] < - 5){
                
                
                this.particlesGeom.attributes.position.array[i * 3 + 1] = this.boxSize / 2
            }
            i++

        }

        this.particlesGeom.attributes.position.needsUpdate = true;
        this.particleSystem.rotateY(0.002)
    }

    bind() {
        this.init = this.init.bind(this)
        this.update = this.update.bind(this)
    }

}

const _instance = new ParticleSystem()
export default _instance