import db from '../config.js';

const title = document.getElementById('title');
const text = document.getElementById('text');
const save = document.getElementById('btn-save');

class Post {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.save = document.getElementById('btn-save');
        this.blog = db.collection('blog');
        this.posts = document.querySelector('.left');
        this.id = '';
        this.edited = false;
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

    async savePost(title, text) {
        let post = {
            published: false,
            slug: `${this.formatDate(new Date())}/${title.replace(/\s+/g, '-').toLowerCase()}`,
          
            title: title,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            image: 'images/LK.png',
            text: text
        }

        if (this.id) {
            return await this.blog.doc(this.id).update(post);
        } else {
            return await this.blog.doc().set(post);
        }
    }

    formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        day = day.toString().padStart(2, "0");
        month = month.toString().padStart(2, "0");
        return year + "/" + month + "/" + day;
    }

    allPostsUI(doc, id) {
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

        let excerpt = document.createElement('excerpt');
        excerpt.setAttribute('class', 'excerpt');
        let excerptText = document.createTextNode(doc.text.slice(0, 100) + '...');
        excerpt.appendChild(excerptText);
        card.appendChild(excerpt);

        let editBtn = document.createElement('button');
        editBtn.textContent = 'EDIT';
        editBtn.setAttribute('data-id', `${id}`);
        editBtn.setAttribute('class', `edit`);
        card.appendChild(editBtn);

        this.posts.appendChild(card);
    }

    getBlog() {
        this.blog
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.allPostsUI(doc.data(), doc.id);
            })
        })
    }

    editPost() {
        this.posts.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                this.id = event.target.getAttribute('data-id');
                this.edited = true;

                this.blog
                .doc(this.id)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        title.value = doc.data().title;
                        text.value = doc.data().text;
                    }
                })
            }
        })
    }

    autosave(title, text, id) {
        let timer = setTimeout(() => {
            this.savePost(title, text, id);
        }, 10000);
        
        
    }
}

export default Post;

const post = new Post();

post.getBlog(); // write 
post.editPost(); // event

save.addEventListener('click', () => {
    post.savePost(title.value, text.value);
});



