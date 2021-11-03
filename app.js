const bookList = document.querySelector("#book-list");
const bookForm = document.querySelector("#book-form");
const additionalFields = document.querySelectorAll('.additional-field');

class Book {
    constructor(title,author) {
        this.title=title;
        this.author=author; 
    }
}

const getBooksFromStore = () => {
    let books;
    if(localStorage.getItem('books')===null){
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


const displayBooks = () => {
    const books = getBooksFromStore();
    books.forEach( book => {
        addBookToList(book);
    })
}

const addBookToList = ({title,author}) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    div.className = "book-element";
    const a = document.createElement('a');
    a.className="delete";
    a.innerText="X";
    const text = `${title}`;
    const authorText = author.length !== 0 ? ` by ${author}`:``;
    div.appendChild(document.createTextNode(text + authorText));
    div.appendChild(a);
    li.appendChild(div);
    bookList.appendChild(li);
}


const addField = (e) => {
    const fieldName = e.target.classList[1];
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.id = "author";
    input.type="text";
    label.innerText=`Written by`;
    input.name=fieldName;
    div.className = "form-group";
    div.appendChild(label);
    div.appendChild(input);
    bookForm.insertBefore(div,document.querySelector('.submit-group'));
    console.log(bookForm);
    e.target.remove();
}

additionalFields.forEach(field => {
    field.addEventListener('click',addField);
});




const clearFields = (authorPresent) => {
    document.querySelector('#title').value ="";
    if(authorPresent) {
        document.querySelector('#author').value="";
    }
}

const addBooks = (e) => {
    e.preventDefault();
    let authorPresent = false;
    let authorName;
    const bookTitle = document.querySelector('#title').value;
    if(bookForm.childElementCount > 2) {
        authorName = document.querySelector('#author').value;
        authorPresent = true;
    } else {
        authorName = "";
    }
    const book = new Book(bookTitle,authorName);
    addBookToList(book);
    addBookToStore(book);
    clearFields(authorPresent);
}

const removeBook = (e) => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.parentElement.remove();
    }
    console.log(e.target.parentElement.firstChild);
}
document.addEventListener('DOMContentLoaded',displayBooks);
bookForm.addEventListener('submit',addBooks);
bookList.addEventListener('click',removeBook);

