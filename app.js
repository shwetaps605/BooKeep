const bookList = document.querySelector("#book-list");
const bookForm = document.querySelector("#book-form");

const clearFields = () => {
    document.querySelector("#book-entry").value="";
}

bookForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const book = document.querySelector('#book-entry').value;
    console.log(book);
    const li = document.createElement('li');
    const div = document.createElement('div');
    div.className = "book-element";
    const a = document.createElement('a');
    a.className="delete";
    a.innerText="X";
    div.appendChild(document.createTextNode(book));
    div.appendChild(a);
    li.appendChild(div);
    bookList.appendChild(li);
    clearFields();
});

bookList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        e.target.parentElement.parentElement.remove();
    }
});