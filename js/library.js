import Book from './book.js';

export default function Library() {
  // Attempt to fetch local storage array of books first, if not, then
  // create a blank array
  this.books = this.retrieveLocalStorage() || [];
}

Library.prototype.addBook = function(book) {
  this.books.push(book);
  this.updateLocalStorage();
};

// Mutates books
Library.prototype.removeBook = function(id) {
  this.books.splice(id, 1);
  this.updateLocalStorage();
};

// Does not mutate books
// function removeBook(id) {
//   return this.books.filter((_, index) => {
//     return index !== id;
//   });
// }

Library.prototype.render = function() {
  const books = this.books;
  const bookButton = document.getElementById('add-book');
  this.addNewBookButtonListener(bookButton);

  this.addBookSubmitListener();

  const root = document.getElementById('books');
  const docFrag = document.createDocumentFragment();
  books.forEach((book, index) => {
    const HTMLInfo = book.HTMLInfo(index);
    HTMLInfo.appendChild(this.toggleReadButton(index));
    HTMLInfo.appendChild(document.createElement('br'));
    HTMLInfo.appendChild(this.deleteButton(index));

    docFrag.appendChild(HTMLInfo);
  });

  root.innerHTML = '';
  root.appendChild(docFrag);
};

Library.prototype.addNewBookButtonListener = function(element) {
  element.addEventListener('click', () => this.handleNewBookClick());
};

Library.prototype.addBookSubmitListener = function() {
  const submit = document.getElementById('add-book-form');

  // const handleAddBookSubmit = e => this.handleAddBookSubmit(e);

  // Remove the listener so you do not duplicate listeners
  // https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b
  // submit.addEventListener(
  //   'submit',
  //   function submitListener(e) {
  //     handleAddBookSubmit(e);

  //     // Because the page will rerender, the event listener mut be removed here
  //     submit.removeEventListener('submit', submitListener, false);
  //   },
  //   false,
  // );

  // Alternative way to handle it
  submit.onsubmit = this.handleAddBookSubmit.bind(this);
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

Library.prototype.toggleReadButton = function(id) {
  const button = document.createElement('button');
  let book = this.books[id];

  if (book.read === true || book.read === 'true') {
    button.innerText = 'Mark as unread';
    button.addEventListener('click', () => this.markAsUnread(id), false);
  } else {
    button.innerText = 'Mark as read';
    button.addEventListener('click', () => this.markAsRead(id), false);
  }

  return button;
};

Library.prototype.markAsUnread = function(id) {
  this.books[id].read = false;
  this.updateLocalStorage();
  this.render();
};

Library.prototype.markAsRead = function(id) {
  this.books[id].read = true;
  this.updateLocalStorage();
  this.render();
};

Library.prototype.deleteButton = function(id) {
  const button = document.createElement('button');
  button.innerText = 'Delete';
  button.addEventListener('click', () => this.handleBookDelete(id));

  return button;
};

Library.prototype.handleBookDelete = function(id) {
  this.removeBook(id);
  this.render();
};

Library.prototype.retrieveLocalStorage = function() {
  try {
    let books = JSON.parse(localStorage.getItem('books'));
    books = books.map(b => new Book(b.title, b.author, b.pages, b.read));
    console.log(books);
    return books;
  } catch (e) {
    console.log('unable to retrieve from localStorage');
  }
};

Library.prototype.updateLocalStorage = function() {
  // Check that you can write to localStorage
  try {
    localStorage.setItem('books', JSON.stringify(this.books));
  } catch (e) {
    console.log('unable to write to localStorage');
  }
};
