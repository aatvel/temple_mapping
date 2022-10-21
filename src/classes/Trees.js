import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

import LoadingController from './LoadingControls.js'
import { Side } from 'three'

class Tree {
    constructor() {
        this.bind()
        this.modelLoader = new GLTFLoader(LoadingController)
        this.textureLoader = new THREE.TextureLoader(LoadingController)
    }

    

    init(scene) {
        this.scene = scene
        this.trees = new THREE.Group()
        this.tree

        

        for(let i = 0; i < 30; i++)
        {
            const random = Math.random()
            const angle = - ((Math.random() * Math.PI))  // Random angle
            const radius = 3.5 + Math.random() * 6    // Random radius
            const x = Math.cos(angle) * radius        // Get the x position using cosinus
            const z = Math.sin(angle) * radius        // Get the z position using sinus

            // Create the mesh
            // Position
            this.modelLoader.load('./assets/model/tree_for_games.glb', (glb) =>{
                glb.scene.traverse(child =>{
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0x000000
                    }),
                    child.castShadow = true,
                    child.receiveShadow = true
                }) 
                glb.scene.position.set(x, - 0.5, z)     
                glb.scene.scale.set( random * 0.0035, random * 0.0035, random * 0.0035)
                glb.scene.rotation.y = Math.random()
                // glb.scene.rotation.z = Math.random()
                this.scene.add(glb.scene)

            })
        }
    }

    update() {

    }
    bind() {

    }
}

const _instance = new Tree()
export default _instance