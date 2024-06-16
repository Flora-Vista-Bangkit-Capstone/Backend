FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV PLANT_MODEL_URL=https://storage.googleapis.com/flora-vista/Model/Plant%20Classification/model_plant_classification.json
ENV DISEASE_MODEL_URL=https://storage.googleapis.com/flora-vista/Model/Plant%20Disease%20Classification/model_disease.json
ENV SOIL_MODEL_URL=https://storage.googleapis.com/flora-vista/Model/Soil%20Classification/model_soil.json

CMD ["node", "src/server/server.js"]
