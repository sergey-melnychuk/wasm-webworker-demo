import init, { bridge } from './pkg/wasm_webworker_demo.js';

const URL = 'http://localhost:8080/json';

var ready = false;

self.onmessage = async event => {
    if (!ready) {
        await init();
        ready = true;
    }
    console.log('work event: ', event.data);
    let result = bridge(URL, '{"a":1}', post);
    self.postMessage(result);
}

self.onerror = (e) => {
    console.error('work error:', e.message);
};

function post(url, body) {
    const request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(body);
    if (request.status != 200) {
        throw new Error(request.statusText);
    }
    return request.responseText;
}
