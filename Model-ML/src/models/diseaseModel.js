const loadModel = require('../services/loadModel');

let diseaseModel;

async function getDiseaseModel() {
    if (!diseaseModel) {
        diseaseModel = await loadModel(process.env.DISEASE_MODEL_URL);
    }
    return diseaseModel;
}

module.exports = getDiseaseModel;
