import http from 'node:http';
import { sendJSON } from './utilities.js';
import { cars } from './data.js';

const PORT = 8000;

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const queryObj = Object.fromEntries(urlObj.searchParams);

  if (urlObj.pathname === '/api' && req.method === 'GET') {
    let filteredData = cars;

    if (queryObj.country) {
      filteredData = filteredData.filter(
        (item) => item.country.toLowerCase() === queryObj.country.toLowerCase()
      );
    }

    res.end(sendJSON(res, 200, filteredData));
    return;
  }

  if (req.url.startsWith('/api/country')) {
    console.log(req.url);
  }
  res.end(`Please use ${urlObj.hostname}/API to get cars`);
});

server.listen(PORT, () => {
  console.log(`server running at: 8000`);
});
