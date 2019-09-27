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
  const div = document.getElementById('root');
  const docFrag = document.createDocumentFragment();

  books.forEach((book, index) => {
    docFrag.appendChild(book.HTMLInfo(index));
  });

  div.appendChild(docFrag);
};
