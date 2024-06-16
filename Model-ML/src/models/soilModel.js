const loadModel = require('../services/loadModel');

let soilModel;

async function getSoilModel() {
    if (!soilModel) {
        soilModel = await loadModel(process.env.SOIL_MODEL_URL);
    }
    return soilModel;
}

module.exports = getSoilModel;
