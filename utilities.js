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

  if (queryObj.model) {
    filteredData = filteredData.filter(
      (item) => item.model.toLowerCase() === queryObj.model.toLowerCase()
    );
  }

  return filteredData;
}

export function getRandomCar(data) {
  const randomNumber = Math.floor(Math.random() * data.length);
  const randomCar = data[randomNumber];

  return randomCar;
}
