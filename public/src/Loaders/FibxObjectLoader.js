class FibxObjectLoader {
    constructor(modelFileUrl, scale) {
      this.loader = new THREE.FBXLoader();
      this.modelPromise = new Promise((resolve, reject) => {
        this.loader.load(
          modelFileUrl,
          (object) => {
            object.scale.set(scale, scale, scale);
            object.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            object.castShadow = true;
            object.receiveShadow = true;
            resolve(object);
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
  
    getModel() {
      return this.modelPromise;
    }
  }
  
  export default FibxObjectLoader;
  