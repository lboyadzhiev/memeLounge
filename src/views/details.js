//@ts-check

import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem } from '../api/data.js';

const detailsTemplate = (item, isOwner, onDelete) => html`
    <section id="meme-details">
        <h1>Meme Title: ${item.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${item.imageUrl} />
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${item.description}</p>

                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->

                ${isOwner
                    ? html`
                          <a class="button warning" href="/edit/${item._id}">Edit</a>
                          <button @click=${onDelete} class="button danger">Delete</button>
                      `
                    : ''}
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);

    const isOwner = userId === item._ownerId;
    ctx.render(detailsTemplate(item, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure!');

        if (confirmed) {
            await deleteItem(itemId);
            ctx.page.redirect('/catalog');
        }
    }
}
