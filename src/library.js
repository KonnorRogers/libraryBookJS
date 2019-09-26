let library = [];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.hasReadToString = function() {
  if (this.read === true) {
    return 'has read';
  }

  return 'not read yet';
};

Book.prototype.info = function() {
  return (
    `${this.title} by ${this.author}, ${this.pages} pages, ` +
    this.hasReadToString()
  );
};

function addBookToLibrary(book) {
  library.push(book);
}

function render(library) {
  library.forEach(book => {
    let fragment = document.createElement(`<p>${book.info()}</p>`);
    document.body.insertBefore(fragment, document.body.childNodes[0]);
  });
}

book1 = new Book('Lord of the Rings', 'J.R.R. Tolkien', 1253);
book2 = new Book('The Hobbit', 'J.R.R. Tolkien', 295);
addBookToLibrary(book1);
addBookToLibrary(book2);

render(library);
