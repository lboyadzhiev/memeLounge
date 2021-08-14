import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../api/data.js';
import { notify } from '../utilites.js';

const editTemplate = (item, onSubmit) => html`
    <section id="edit-meme">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    .value=${item.title}
                />
                <label for="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Enter Description"
                    name="description"
                    .value=${item.description}
                >
                </textarea>
                <label for="imageUrl">Image Url</label>
                <input
                    id="imageUrl"
                    type="text"
                    placeholder="Enter Meme ImageUrl"
                    name="imageUrl"
                    .value=${item.imageUrl}
                />
                <input type="submit" class="registerbtn button" value="Edit Meme" />
            </div>
        </form>
    </section>
`;
export async function editPage(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);
    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        try {
            if (!title || !description || !imageUrl) {
                throw new Error('All fields are required!');
            }

            await editItem(itemId, {
                title,
                description,
                imageUrl,
            });

            ctx.page.redirect('/details/' + itemId);
        } catch (err) {
            notify(err.message);
        }
    }
}
