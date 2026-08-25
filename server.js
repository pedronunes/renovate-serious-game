const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function updateAppJsCoordinatesAndPush(customCoordsMap, autoPush, callback) {
  const appJsPath = path.join(__dirname, 'app.js');
  try {
    let appJsContent = fs.readFileSync(appJsPath, 'utf8');

    // Find INITIAL_UI_COORDINATES_MAP block
    const mapRegex = /const INITIAL_UI_COORDINATES_MAP = \{[\s\S]*?\};/;
    const match = appJsContent.match(mapRegex);
    if (!match) return callback(false, 'INITIAL_UI_COORDINATES_MAP not found in app.js');

    let currentMapObj = {};
    try {
      const evalStr = match[0].replace('const INITIAL_UI_COORDINATES_MAP = ', '').replace(/;$/, '');
      currentMapObj = eval(`(${evalStr})`);
    } catch (e) {
      console.error('Error parsing existing INITIAL_UI_COORDINATES_MAP:', e);
    }

    // Merge customCoordsMap into currentMapObj
    Object.keys(customCoordsMap).forEach(slideKey => {
      if (!currentMapObj[slideKey]) currentMapObj[slideKey] = {};
      Object.assign(currentMapObj[slideKey], customCoordsMap[slideKey]);
    });

    const newMapStr = `const INITIAL_UI_COORDINATES_MAP = ${JSON.stringify(currentMapObj, null, 2)};`;
    const updatedAppJsContent = appJsContent.replace(mapRegex, newMapStr);

    fs.writeFileSync(appJsPath, updatedAppJsContent, 'utf8');
    console.log('✅ Successfully written designer coordinates into app.js on disk!');

    if (autoPush) {
      const gitCmd = `git add app.js && git commit -m "Design Update: User saved custom layout via Designer Mode" && git push origin main`;
      exec(gitCmd, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
          console.log('Git commit note:', stderr || error.message);
          callback(true, 'Coordinates saved to app.js on disk!');
        } else {
          console.log('🚀 Automatically committed and pushed designer layout to GitHub!');
          callback(true, 'Coordinates saved to app.js and pushed to GitHub!');
        }
      });
    } else {
      callback(true, 'Coordinates saved to app.js on disk!');
    }
  } catch (err) {
    console.error('Error updating app.js coordinates:', err);
    callback(false, err.message);
  }
}

const server = http.createServer((req, res) => {
  let reqUrl = decodeURIComponent(req.url.split('?')[0]);

  // Endpoint to save designer coordinates and auto-push to GitHub
  if (req.method === 'POST' && (reqUrl === '/api/sync-coords' || reqUrl === '/api/save-coordinates')) {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const coordsMap = JSON.parse(body);
        const shouldPush = reqUrl === '/api/save-coordinates';
        updateAppJsCoordinatesAndPush(coordsMap, shouldPush, (success, message) => {
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ success, message, pushed: shouldPush && success }));
        });
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  if (reqUrl === '/') reqUrl = '/index.html';

  const filePath = path.join(__dirname, reqUrl);

  // Security check: keep inside current directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 RENOVATE Serious Game Server running at: http://localhost:${PORT}`);
});
