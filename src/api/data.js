//@ts-check

import * as api from './api.js';
const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getItems() {
    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
}

export async function getItemById(id) {
    return await api.get(host + '/data/memes/' + id);
}

export async function createItem(data) {
    return await api.post(host + '/data/memes', data);
}

export async function editItem(id, data) {
    return await api.put(host + '/data/memes/' + id, data);
}

export async function deleteItem(id) {
    return await api.del(host + '/data/memes/' + id);
}
