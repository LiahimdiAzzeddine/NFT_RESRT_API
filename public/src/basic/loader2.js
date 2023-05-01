class GLTFDracoLoader {
    constructor(modelFileUrl, urlAnimationList, scale) {
      this.loader = new THREE.GLTFLoader();
      this.loader.setDRACOLoader(new DRACOLoader());
      this.animationPromises = [];
      let animations = [];
  
      const modelPromise = new Promise((res, rej) => {
        this.loader.load(modelFileUrl,
          function (gltf) {
            const object = gltf.scene;
            object.scale.set(scale, scale, scale)
            object.traverse(function (child) {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            object.castShadow = true;
            object.receiveShadow = true;
            res(object)
          },
          undefined,
          function (error) {
            console.error(error);
            rej(error);
          }
        );
      });
  
      urlAnimationList.forEach((element, index) => {
        this.animationPromises[index] = new Promise((res, rej) => {
          this.loader.load(urlAnimationList[index],
            function (gltf) {
              const object = gltf.scene;
              object.scale.set(scale, scale, scale)
              animations[index * 1] = gltf.animations[0]
              res(index)
            },
            undefined,
            function (error) {
              console.error(error);
              rej(error);
            }
          );
        });
      });
  
      const joinerPromise = Promise.all(this.animationPromises)
  
      this.model = new Promise((res, rej) => {
        Promise.all([modelPromise, joinerPromise]).then(data => {
          const object = data[0]
          if(animations.length > 0){
            object.animations = animations
          }
          res(object)
        }).catch(error => rej(error));
      });
    }
  
    getModel(){
      return this.model
    }
  }
  
  export default GLTFDracoLoader;