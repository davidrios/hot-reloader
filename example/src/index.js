// create the tag for the contents of the file
const code = document.createElement('code');
const pre = document.createElement('pre');
code.appendChild(pre);

// update function
function update(newContent) {
    pre.innerText = newContent
}

// import, setup callback and update with initial content

import request from './example.txt';

// if hot-reloader was configured, use it
if (request.register) {
    request.register(update);
    // the update function is only called for new updates, so
    // call it manually now to update the page with the first content
    update(request.content);
} else {
    // hot-reloader not configured, the request will have the contents of the file
    update(request)
}




// --- setup the page contents, you can ignore it from here -----

const h1 = document.createElement('h1');
h1.innerText = 'hot-reloader example';

document.body.appendChild(h1);

const timerP = document.createElement('p');
document.body.appendChild(timerP);
timerP.innerText = `I have been 0 seconds without a reload...`;

let seconds = 0;

setInterval(() => {
    seconds += 1;
    timerP.innerText = `I have been ${seconds} seconds without a reload...`;
}, 1000);

const p = document.createElement('p');
p.innerHTML = 'The contents from <code>example.txt</code>. This will change without reloading the page:';
document.body.appendChild(p);

document.body.appendChild(code);

const p2 = document.createElement('p');
p2.style.marginTop = '100px';
p2.innerHTML = 'The contents from <code>another-example.txt</code>. This one will not register the callback to update, so any changes will trigger a page reload:';
document.body.appendChild(p2);

const code2 = document.createElement('code');
const pre2 = document.createElement('pre');
code2.appendChild(pre2);
document.body.appendChild(code2);

import request2 from './another-example.txt';

pre2.innerText = request2.content;