import Book from './book.js';

export default function Library() {
  this.books = [];
}

Library.prototype.addBook = function(book) {
  this.books.push(book);
};

// Mutates books
Library.prototype.removeBook = function(id) {
  this.books.splice(id, 1);
};

// Does not mutate books
// function removeBook(id) {
//   return this.books.filter((_, index) => {
//     return index !== id;
//   });
// }

Library.prototype.render = function(books = this.books) {
  const bookButton = document.getElementById('add-book');
  this.addNewBookButtonListener(bookButton);

  this.addBookSubmitListener();

  const root = document.getElementById('books');
  const docFrag = document.createDocumentFragment();
  books.forEach((book, index) => {
    docFrag.appendChild(book.HTMLInfo(index));
  });

  root.innerHTML = '';
  root.appendChild(docFrag);
};

Library.prototype.addNewBookButtonListener = function(element) {
  element.addEventListener('click', () => this.handleNewBookClick());
};

Library.prototype.addBookSubmitListener = function() {
  const submit = document.getElementById('add-book-form');
  submit.addEventListener('submit', e => this.handleAddBookSubmit(e), true);
};

Library.prototype.handleAddBookSubmit = function(e) {
  console.log(this);
  // Prevents making a GET request
  e.preventDefault();
  const form = document.getElementById('add-book-form');

  const formData = new FormData(form);

  let newBook = Object.create(Book.prototype);

  // value is an array, data[0] === propertyName
  //                    data[1] === properyValue
  for (const data of formData) {
    const field = data[0];
    const value = data[1];

    newBook[field] = value;
  }

  console.log(newBook);
  this.addBook(newBook);
  newBook = null;
  // Rerenders the book using the given input
  this.render();
};

Library.prototype.handleNewBookClick = function() {
  const addBook = document.getElementById('add-book');
  addBook.classList.add('hide');

  const bookForm = document.getElementById('add-book-form');
  bookForm.classList.remove('hide');
  bookForm.classList.add('book-form-show');
};
