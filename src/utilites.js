import { render } from '../node_modules/lit-html/lit-html.js';

export function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {},
    };

    const token = sessionStorage.getItem('authToken');

    if (token != null) {
        options.headers['X-Authorization'] = token;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export function renderMiddleware(ctx, next) {
    const main = document.querySelector('main');
    ctx.render = (content) => render(content, main);

    next();
}
