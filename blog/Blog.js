import db from '../config.js';
import Router from './router.js';

class Blog {
    router = new Router({
        mode: 'hash',
        root: '/'
    });

    constructor() {
        this.blog = db.collection('blog');
        this.blogEl = document.getElementById('blog');
    }

    // setRoute() {
    //     router
    //         .add(/about/, () => {
    //             alert('welcome in about page');
    //         })
    //         .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    //             alert(`products: ${id} specification: ${specification}`);
    //         })
    //         .add('', () => {
    //             // general controller
    //             console.log('welcome in catch all controller');
    //         });
    // }

    ui(doc) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        let h2 = document.createElement('h2');
        h2.setAttribute('class', 'post-title');
        let title = document.createTextNode(doc.title);
        h2.appendChild(title);
        card.appendChild(h2);

        let divImg = document.createElement('div');
        divImg.setAttribute('class', 'featured');
        let img = document.createElement('img');
        img.setAttribute('src', `${doc.image}`)
        divImg.appendChild(img);
        card.appendChild(divImg);

        let date = document.createElement('p');
        let dateText = document.createTextNode(`${this.formatDate(doc.date.toDate())}`);
        date.appendChild(dateText);
        card.appendChild(date);

        let excerpt = document.createElement('p');
        excerpt.setAttribute('class', 'excerpt');
        let excerptText = document.createTextNode(doc.text.slice(0, 160) + '...');
        excerpt.appendChild(excerptText);
        card.appendChild(excerpt);

        let readMore = document.createElement('a');
        readMore.setAttribute('class', 'read-more');
        readMore.setAttribute('href', `https://lazarkulasevic.github.io/${doc.slug}`);
        let readMoreText = document.createTextNode('Read More');
        readMore.appendChild(readMoreText);
        card.appendChild(readMore);

        this.blogEl.appendChild(card);
    }

    formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        day = day.toString().padStart(2, "0");
        month = month.toString().padStart(2, "0");
        return day + "/" + month + "/" + year;
    }

    getPosts() {
        this.blog
        .where('published', '==', true)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.ui(doc.data());
            })
        });
    }
}

let blog = new Blog()
blog.getPosts();

