class Post {
    constructor(title, text) {
        this.title = title;
        this.text = text;
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


}

export default Post;