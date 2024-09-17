const worker = new Worker("./worker.js", { type: 'module' });
worker.onmessage = event => {
    console.log('main event: ', event.data);
};
worker.postMessage(42);
