const tf = require('@tensorflow/tfjs-node');

async function loadModel(modelUrl) {
    try {
        return await tf.loadLayersModel(modelUrl);
    } catch (error) {
        console.error('Error loading model:', error);
        throw new Error('Error loading model');
    }
}

async function getPlantModel() {
    return loadModel(process.env.PLANT_MODEL_URL);
}

async function getDiseaseModel() {
    return loadModel(process.env.DISEASE_MODEL_URL);
}

async function getSoilModel() {
    return loadModel(process.env.SOIL_MODEL_URL);
}

module.exports = {
    getPlantModel,
    getDiseaseModel,
    getSoilModel
};
