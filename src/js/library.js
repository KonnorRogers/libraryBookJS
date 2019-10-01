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

  const root = document.getElementById('root');
  const docFrag = document.createDocumentFragment();
  books.forEach((book, index) => {
    docFrag.appendChild(book.HTMLInfo(index));
  });

  root.appendChild(docFrag);
};

Library.prototype.addNewBookButtonListener = function(element) {
  element.addEventListener('click', () => this.handleNewBookClick());
};

Library.prototype.addBookSubmitListener = function() {
  const submit = document.getElementById('add-book-form');
  submit.addEventListener('submit', e => this.handleAddBookSubmit(e));
};

Library.prototype.handleAddBookSubmit = function(e) {
  e.preventDefault();
  const form = document.getElementById('add-book-form');

  const formData = new FormData(form);

  // value is an array, data[0] === propertyName
  //                    data[1] === properyValue
  for (const data of formData) {
    const field = data[0];
    const value = data[1];
    console.log(field);
    console.log(value);
  }

  // // Rerenders the book using the given input
  // this.render();
  // // This prevents the form from attempting to submit the data
  return false;
};

Library.prototype.handleNewBookClick = function() {
  const addBook = document.getElementById('add-book');
  addBook.classList.add('hide');

  const bookForm = document.getElementById('add-book-form');
  bookForm.classList.remove('hide');
  bookForm.classList.add('book-form-show');
};
