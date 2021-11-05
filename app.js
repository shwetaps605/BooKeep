const bookList = document.querySelector("#book-list");
const bookForm = document.querySelector("#book-form");
const additionalFields = document.querySelectorAll('.additional-field');


class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

const getBooksFromStore = () => {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

const addBookToStore = (book) => {
    const books = getBooksFromStore();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

const removeBookFromStore = (bookTitle) => {
    const books = getBooksFromStore();
    books.forEach((book, index) => {
        if (book.title === String(bookTitle)) {
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}


const displayBooks = () => {
    const books = getBooksFromStore();
    books.forEach(book => {
        addBookToList(book);
    })
}

const addBookToList = ({ title, author }) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.className = "book-element";
    const a = document.createElement('a');
    a.className = "delete";
    a.innerText = "X";
    const text = `${title}`;
    const authorText = author.length !== 0 ? ` by ${author}` : ``;
    p.innerText = text + authorText;
    p.className = `book-info ${title}`;
    div.appendChild(p);
    div.appendChild(a);
    li.appendChild(div);
    bookList.appendChild(li);
}


const addField = (e) => {
    const bookTitle = document.querySelector('#title').value;
    if (bookTitle.length < 1) {
        showErrorMessage("Shouldn't you add the title first ? ", "error");
    }
    else {
        const fieldName = e.target.classList[1];
        const div = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.id = "author";
        input.type = "text";
        label.innerText = `Written by`;
        input.name = fieldName;
        div.className = "form-group";
        div.appendChild(label);
        div.appendChild(input);
        bookForm.insertBefore(div, document.querySelector('.submit-group'));
        e.target.remove();
    }

}

const clearFields = (authorPresent) => {
    document.querySelector('#title').value = "";
    if (authorPresent) {
        document.querySelector('#author').value = "";
    }
}

const showErrorMessage = (message, type) => {
    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.appendChild(document.createTextNode(message));
    //const container = document.querySelector('.form-container');
    bookForm.insertBefore(div, document.querySelector('.form-group'));
    setTimeout(() => { document.querySelector('.alert').remove() }, 3000);
}



const addBook = (e) => {
    e.preventDefault();
    let authorPresent = false;
    let authorName;
    const bookTitle = document.querySelector('#title').value;
    if (bookTitle.length < 1) {
        showErrorMessage("Dude you forgot the title :/", "error");
    }
    else {
        if (bookForm.childElementCount > 2) {
            authorName = document.querySelector('#author').value;
            authorPresent = true;
        } else {
            authorName = "";
        }
        const book = new Book(bookTitle, authorName);
        addBookToList(book);
        addBookToStore(book);
        clearFields(authorPresent);
        showErrorMessage("Book added.I hope you read it *wink*", "error");
    }
}

const removeBook = (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
    }
    const bookTitle = String(e.target.parentElement.firstChild.innerText.split("by")[0]);
    removeBookFromStore(bookTitle.trim());
    showErrorMessage("Cool I removed that one for you.", "success");
}

// const updateBook = (e) => {
//     const div = e.target.parentElement;
//     const childElement = div.firstChild;
//     console.log(childElement.classList);
// }

additionalFields.forEach(field => {
    field.addEventListener('click', addField);
});

document.addEventListener('DOMContentLoaded', displayBooks);
bookForm.addEventListener('submit', addBook);
bookList.addEventListener('click', removeBook);
//bookList.addEventListener('dblclick',updateBook);

