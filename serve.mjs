import { createServer } from 'http'
import { createReadStream } from 'fs'

const server = createServer((request, response) => {
  const { method, url, headers } = request;
  console.log(method, url);

  if (method == 'GET' && url == '/') {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    let stream = createReadStream('index.html');
    stream.pipe(response);
    return;
  }

  if (method == 'GET' && url == '/json') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({a:1}));
  }

  if (method == 'POST' && url == '/json') {
    let body = [];
    request
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        let json = JSON.parse(body);
        json.ok = true;
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(json));    
      });
  }

  if (method == 'GET' && url == '/index.js') {
    response.writeHead(200, {'Content-Type': 'text/javascript'});
    let stream = createReadStream('index.js');
    stream.pipe(response);
    return;
  }

  if (method == 'GET' && url == '/worker.js') {
    response.writeHead(200, {'Content-Type': 'text/javascript'});
    let stream = createReadStream('worker.js');
    stream.pipe(response);
    return;
  }

  if (method == 'GET' && url == '/pkg/wasm_webworker_demo.js') {
    response.writeHead(200, {'Content-Type': 'text/javascript'});
    let stream = createReadStream('pkg/wasm_webworker_demo.js');
    stream.pipe(response);
    return;
  }

  if (method == 'GET' && url == '/pkg/wasm_webworker_demo_bg.wasm') {
    response.writeHead(200, {'Content-Type': 'application/wasm'});
    let stream = createReadStream('pkg/wasm_webworker_demo_bg.wasm');
    stream.pipe(response);
    return;  
  }
});

server.listen(8080)
