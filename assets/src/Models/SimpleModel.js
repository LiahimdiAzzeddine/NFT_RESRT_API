import FibxObjectLoader from "../Loaders/FibxObjectLoader.js"
const folder = "/assets/src/character/"
const plan = (new FibxObjectLoader(folder+'lutosfbx.fbx', 0.012)).getModel()
export default plan
