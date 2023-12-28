import BookSkeleton from './labels.js';

export default class BookClass {
  hasBooks = localStorage.getItem('books');

  books = [
    {
      title: 'Book 1',
      author: 'Ali ',
    },
    {
      title: 'Book 2',
      author: 'Hamad Afzal',
    },
    {
      title: 'Book 3',
      author: 'Arham Rauf ',
    },
    {
      title: 'Book 4',
      author: 'MUHAMMAD',
    },
    {
      title: 'Book 5',
      author: 'Kashif Ali ',
    },
    {
      title: 'Book 6',
      author: 'Sidhu ',
    },
  ];

  constructor() {
    if (!this.hasBooks) {
      localStorage.setItem('books', JSON.stringify(this.books));
    } else {
      this.books = JSON.parse(this.hasBooks);
    }
  }

  displayBooks() {
    let bookHtml = '';
    for (let i = 0; i < this.books.length; i += 1) {
      bookHtml += `<div class="${
        i % 2 === 0 ? 'blue-container' : 'white-container'
      }" id="book-${i}">
          <p class="title-descr">${this.books[i].title} by ${
  this.books[i].author
}</p>
          <button class="btn" onclick ='window.books.removeBook(${i})'>Remove</button>
        </div>`;
    }

    document.querySelector('#books').innerHTML = bookHtml;
  }

  
  addBook(title, author) {
    this.books.push(new BookSkeleton(title, author));
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }


  removeBook(key) {
    this.books.splice(key, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    const id = `book-${key}`;
    document.getElementById(id).remove();
    this.displayBooks();
  }
}
