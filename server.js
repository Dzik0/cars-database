import http from 'node:http';
import { sendJSON, filterData, getRandomCar } from './utilities.js';
import { cars } from './data.js';
import { createReadStream, existsSync } from 'node:fs';

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const queryObj = Object.fromEntries(urlObj.searchParams);

  if (
    urlObj.pathname === '/api' ||
    (urlObj.pathname === '/api/' && req.method === 'GET')
  ) {
    let filteredData = filterData(queryObj, cars);

    res.end(sendJSON(res, 200, filteredData));
    return;
  }

  if (req.url.startsWith('/api/country/')) {
    const country = req.url.split('/').pop();

    const filteredData = cars.filter(
      (item) => item.country.toLowerCase() === country.toLowerCase()
    );

    res.end(sendJSON(res, 200, filteredData));
    return;
  }

  if (
    req.url === '/api/randomcar' ||
    (req.url === '/api/randomcar/' && req.method === 'GET')
  ) {
    const randomCar = getRandomCar(cars);

    res.end(sendJSON(res, 200, randomCar));
    return;
  }

  if (req.url.startsWith('/images/')) {
    const imageName = req.url.split('/').pop();
    const imagePath = `./images/${imageName}`;

    if (existsSync(imagePath)) {
      const stream = createReadStream(imagePath);
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      stream.pipe(res);
    } else {
      res.end('not found');
    }

    return;
  }

  res.end(
    sendJSON(
      res,
      404,
      `Please use ${urlObj.hostname}/API to get cars or check documentation for more info!`
    )
  );
});

server.listen(PORT, () => {
  console.log(`server running at: 8000`);
});
