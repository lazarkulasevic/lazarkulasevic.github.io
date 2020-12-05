import db from '../config.js';

const title = document.getElementById('title');
const text = document.getElementById('text');
const save = document.getElementById('btn-save');
const publish = document.getElementById('btn-publish');
const deletedPosts = document.getElementById('deleted-posts');
const postsDesc = document.getElementById('posts-description');


class Dashboard {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.save = document.getElementById('btn-save');
        this.blog = db.collection('blog');
        this.posts = document.getElementById('posts');
        this.trash = document.getElementById('btn-trash');
        this.id = '';
    }

    set title(value) {
        this._title = value;
    }
    set text(value) {
        this._text = value;
    }
    get title() {
        return this._title;
    }
    get text() {
        return this._text;
    }

    formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        day = day.toString().padStart(2, "0");
        month = month.toString().padStart(2, "0");
        return year + "/" + month + "/" + day;
    }

    postUI(doc, id, boolean) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        let h2 = document.createElement('h2');
        h2.setAttribute('class', 'post-title');
        let title = document.createTextNode(doc.title);
        h2.appendChild(title);
        card.appendChild(h2);

        let date = document.createElement('p');
        let dateText = document.createTextNode(`${this.formatDate(doc.date.toDate())}`);
        date.appendChild(dateText);
        card.appendChild(date);

        let excerpt = document.createElement('p');
        excerpt.setAttribute('class', 'excerpt');
        let excerptText = document.createTextNode(doc.text.slice(0, 100) + '...');
        excerpt.appendChild(excerptText);
        card.appendChild(excerpt);

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.setAttribute('data-id', `${id}`);
        editBtn.setAttribute('class', 'edit');
        card.appendChild(editBtn);

        if (boolean) {
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete forever';
            deleteBtn.setAttribute('data-id', `${id}`);
            deleteBtn.setAttribute('class', 'delete-forever');
            card.appendChild(deleteBtn);
        } else {
            let status = document.createElement('span');
            let statusText = document.createTextNode(`${doc.published ? 'Published' : 'Draft'}`)
            status.appendChild(statusText);
            card.appendChild(status);
        }
        
        this.posts.prepend(card);
    }

    editOrDeletePost() {
        this.posts.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON' && event.target.textContent === "Edit") {
                this.id = event.target.getAttribute('data-id');
                
                publish.style.display = "block";
                this.trash.style.display = "block";

                this.blog
                .doc(this.id)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        title.value = doc.data().title;
                        text.value = doc.data().text;
                        publish.textContent = doc.data().published ? 'Revert to draft': 'Publish';
                        this.trash.textContent = doc.data().deleted ? 'Restore': 'Trash';
                    }
                })
            } else if (event.target.tagName === 'BUTTON' && event.target.textContent === "Delete forever") {
                this.id = event.target.getAttribute('data-id');

                let status = confirm('Are you sure you want to DELETE post from database?');
                if (status) {
                    this.deleteForever(this.id);
                }
                return;
            }
        })
    }

    async deleteForever(id) {
        return await this.blog.doc(id).delete()
            .catch(err => alert('Something went wrong. Error:', err));
    }

    async savePost(title, text) {
        const firstDate = new Date();

        let post = {
            published: false,
            deleted: false,
            slug: `${this.formatDate(firstDate)}/${title.replace(/\s+/g, '-').toLowerCase()}`,
          
            title: title,
            date: firebase.firestore.Timestamp.fromDate(firstDate),
            image: 'images/LK.png',
            text: text
        }

        if (this.id) {
            return await this.blog.doc(this.id).update(post);
        } else {
            return await this.blog.doc().set(post);
        }
    }

    async publishPost(boolean) {
        return await this.blog.doc(this.id).update({
            published: boolean,
            deleted: false
        })
        .catch(err => alert('Something went wrong. Error:', err));
    }

    trashEvent() {
        this.trash.addEventListener('click', event => {
            if (event.target.textContent === "Trash") {
                let state = confirm('Are you sure you want to move this post to trash?');
                if (state) {
                    this.moveToTrash(true);
                }
                return document.querySelector(`button[data-id="${this.id}"]`).parentElement.remove();
            } else {
                this.moveToTrash(false);
            }
        })
    }

    async moveToTrash(boolean) {
        return await this.blog.doc(this.id).update({
            published: false,
            deleted: boolean
        })
        .catch(err => alert('Something went wrong. Error:', err));
    }

    autosave(title, text, id) {
        let timer = setTimeout(() => {
            this.savePost(title, text, id);
        }, 10000);
        
        // needs to be completed
    }

    getPosts(boolean) {
        this.posts.innerHTML = '';

        this.blog
        .orderBy('date', 'asc')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added' && change.doc.data().deleted === boolean) {
                    this.postUI(change.doc.data(), change.doc.id, boolean);
                } else if (change.type === 'removed') {




                    
                    // Javlja se error




                    document.querySelector(`button[data-id="${change.doc.id}"]`).parentElement.remove();
                } 
            });
        });
    }
}

const post = new Dashboard();

post.getPosts(false); // print posts 
post.editOrDeletePost(); // event
post.trashEvent();

let toggle;
deletedPosts.addEventListener('click', () => {
    if (toggle) {
        toggle = false;
        deletedPosts.textContent = 'Deleted posts';
        postsDesc.textContent = 'Active posts';
    } else {
        toggle = true;
        deletedPosts.textContent = 'Active posts';
        postsDesc.textContent = 'Deleted posts';
    }
    post.getPosts(toggle);
});

save.addEventListener('click', () => {
    if (title.value && text.value) {
        post.savePost(title.value, text.value);
    }
});

publish.addEventListener('click', () => {
    if (publish.textContent === "Publish") {
        let state = confirm('Are you sure?');
        if (state) {
            post.publishPost(true);
        }
        return;
    } else {
        post.publishPost(false);
    }
});


