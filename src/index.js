function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.hasReadString = function() {
  if (this.read === true) {
    return 'has read';
  }

  return 'not read yet';
};

Book.prototype.info = function() {
  return (
    `${this.title} by ${this.author}, ${this.pages} pages, ` +
    this.hasReadString()
  );
};

function addBookToLibrary(book) {
  library.push(book);
}

Book.prototype.HTMLInfo = function(id) {
  const div = createTagWithClass('div', 'book');
  // Allows for easy removal of the book, has to be set here
  // because dynamic removal from the array causes IDs to change
  div.setAttribute('data-id', id);

  const title = createTagWithClass('p', 'title', this.title);
  const author = createTagWithClass('p', 'author', 'by ' + this.author);
  const pages = createTagWithClass('p', 'pages', this.pages + ' pages');
  const hasRead = createTagWithClass('p', 'has-read', this.hasReadString());

  children = [title, author, pages, hasRead];
  appendChildren(div, children);
  return div;
};

function createTagWithClass(tag, klass, text = '') {
  element = document.createElement(tag);
  element.classList.add(klass);
  element.innerText = text;
  return element;
}

// Explanation of document fragments and why its more performant
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
function appendChildren(parent, children) {
  const docFrag = document.createDocumentFragment();

  [...children].forEach(child => docFrag.appendChild(child));

  parent.appendChild(docFrag);
}

// Does not mutate library
// function removeBookFromLibrary(library, id) {
//   return library.filter((_, index) => {
//     return index !== id;
//   });
// }

// Will mutate the library array
function removeBookFromLibrary(library, id) {
  library.splice(id, 1);
}

function render(library) {
  const div = document.getElementById('root');
  const docFrag = document.createDocumentFragment();

  library.forEach((book, index) => {
    docFrag.appendChild(book.HTMLInfo(index));
  });

  div.appendChild(docFrag);
}

let library = [];
book1 = new Book('Lord of the Rings', 'J.R.R. Tolkien', 1253);
book2 = new Book('The Hobbit', 'J.R.R. Tolkien', 295);
book3 = new Book("Harry Potter and the Sorceror's stone", 'J.K. Rowling', 895);
book4 = new Book("Harry Potter and the Sorceror's stone", 'J.K. Rowling', 895);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
// removeBookFromLibrary(library, 0);

render(library);
