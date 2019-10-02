import {createTagWithClass, appendChildren} from './utils.js';

export default function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.hasReadString = function() {
  if (this.read === true || this.read == 'true') {
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

Book.prototype.HTMLInfo = function(id) {
  const div = createTagWithClass('div', 'book');
  // Allows for easy removal of the book, has to be set here
  // because dynamic removal from the array causes IDs to change
  div.setAttribute('data-id', id);

  const title = createTagWithClass('p', 'title', this.title);
  const author = createTagWithClass('p', 'author', 'by ' + this.author);
  const pages = createTagWithClass('p', 'pages', this.pages + ' pages');
  const hasRead = createTagWithClass('p', 'has-read', this.hasReadString());

  const children = [title, author, pages, hasRead];
  appendChildren(div, children);
  return div;
};
