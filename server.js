import http from 'node:http';
import { sendJSON, filterData } from './utilities.js';
import { cars } from './data.js';

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
