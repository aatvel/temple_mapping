import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

import LoadingController from './LoadingControls.js'
import { Side } from 'three'

class Floor {
    constructor() {
        this.bind()
        this.modelLoader = new GLTFLoader(LoadingController)
        this.textureLoader = new THREE.TextureLoader(LoadingController)
    }

    init(scene) {
        this.scene = scene
        

        const woodAmbientOcclusionTexture = this.textureLoader.load('./assets/texture/rock/Rock_047_AmbientOcclusion.jpg')
        const woodHeightTexture = this.textureLoader.load('./assets/texture/rock/Rock_047_Height.png')
        const woodNormalTexture = this.textureLoader.load('./assets/texture/rock/Rock_047_Normal.jpg')
        const woodRoughnessTexture = this.textureLoader.load('./assets/texture/rock/Rock_047_Roughness.jpg')

        woodAmbientOcclusionTexture.repeat.set(6, 6)
        woodHeightTexture.repeat.set(6, 6)
        woodNormalTexture.repeat.set(6, 6)
        woodRoughnessTexture.repeat.set(6, 6)

        woodAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
        woodHeightTexture.wrapS = THREE.RepeatWrapping
        woodNormalTexture.wrapS = THREE.RepeatWrapping
        woodRoughnessTexture.wrapS = THREE.RepeatWrapping

        woodAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
        woodHeightTexture.wrapT = THREE.RepeatWrapping
        woodNormalTexture.wrapT = THREE.RepeatWrapping
        woodRoughnessTexture.wrapT = THREE.RepeatWrapping

        const ground = new THREE.Mesh(
            new THREE.CircleGeometry( 10, 24),
            new THREE.MeshStandardMaterial({
                color: 0x000000,
                aoMap: woodAmbientOcclusionTexture,
                displacementMap: woodHeightTexture,
                displacementScale: 0.8,
                normalMap: woodNormalTexture,
                roughnessMap: woodRoughnessTexture,
                side: THREE.DoubleSide
            })
        )      
        ground.receiveShadow = true;
        ground.castShadow = true;
        ground.rotation.x = - Math.PI / 2;
        ground.position.y = - 1
        this.scene.add(ground)
        

        
    }

    update() {

    }

    bind() {

    }
}

const _instance = new Floor()
export default _instance