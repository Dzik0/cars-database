export function sendJSON(res, statusCode, payLoad) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.statusCode = statusCode;
  res.end(JSON.stringify(payLoad));
}

export function filterData(queryObj, data) {
  let filteredData = data;

  if (queryObj.brand) {
    filteredData = filteredData.filter(
      (item) => item.brand.toLowerCase() === queryObj.brand.toLowerCase()
    );
  }

  return filteredData;
}

export function getRandomCar(data) {
  const randomNumber = Math.floor(Math.random() * data.length);
  const properBrand = data[randomNumber];
  const randomModelNumber = Math.floor(
    Math.random() * properBrand.models.length
  );
  const randomModel = properBrand.models[randomModelNumber];
  const randomGenerationNumber = Math.floor(
    Math.random() * randomModel.generations.length
  );
  const randomGenerationModel = randomModel.generations[randomGenerationNumber];

  return randomGenerationModel;
}
