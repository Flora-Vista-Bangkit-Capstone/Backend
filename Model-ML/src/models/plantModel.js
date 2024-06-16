const loadModel = require('../services/loadModel');

let plantModel;

async function getPlantModel() {
    if (!plantModel) {
        plantModel = await loadModel(process.env.PLANT_MODEL_URL);
    }
    return plantModel;
}

module.exports = getPlantModel;
