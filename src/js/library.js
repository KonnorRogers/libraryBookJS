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

  console.log(books);
  root.innerHTML = '';
  root.appendChild(docFrag);
};

Library.prototype.addNewBookButtonListener = function(element) {
  element.addEventListener('click', () => this.handleNewBookClick());
};

Library.prototype.addBookSubmitListener = function() {
  const submit = document.getElementById('add-book-form');

  const handleAddBookSubmit = e => this.handleAddBookSubmit(e);

  // Remove the listener so you do not duplicate listeners
  // https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b
  submit.addEventListener(
    'submit',
    function submitListener(e) {
      handleAddBookSubmit(e);

      // Because the page will rerender, the event listener mut be removed here
      submit.removeEventListener('submit', submitListener, false);
    },
    false,
  );

  // submit.onsubmit = this.handleAddBookSubmit.bind(this);
};

Library.prototype.handleAddBookSubmit = function(e) {
  // Prevents making a GET request
  e.preventDefault();
  const form = document.getElementById('add-book-form');

  const newBook = this.readFormData(form);

  if (newBook === null) {
    this.render();
    return;
  }

  this.addBook(newBook);
  this.formReset(form);

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

Library.prototype.readFormData = function(form) {
  const formData = new FormData(form);

  let newBook = Object.create(Book.prototype);

  // value is an array, data[0] === propertyName
  //                    data[1] === properyValue
  for (const data of formData) {
    const field = data[0];
    const value = data[1];

    if (value == '') {
      return null;
    }

    newBook[field] = value;
  }

  return newBook;
};

Library.prototype.formReset = function(form) {
  // Reset text values
  const textValues = [...form].filter(f => f.type === 'text');
  textValues.forEach(f => (f.value = ''));

  // Reset to the user has read the book
  form['has-read'].checked = true;
};
