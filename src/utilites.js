import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from './api/data.js';

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
    ctx.setUserNav = setUserNav;

    next();
}

export function setUserNav() {
    const email = sessionStorage.getItem('email');

    if (email != null) {
        document.querySelector('div.profile > span').textContent = `Welcome, ${email}`;
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

export async function logoutApi() {
    await logout();

    setUserNav();
    page.redirect('/');
}

export function notify(message) {
    const box = document.getElementById('errorBox');
    box.innerHTML = `<span>${message}</span>`;
    box.style.display = 'block';

    setTimeout(() => {
        box.style.display = 'none';
    }, 3000);
}
