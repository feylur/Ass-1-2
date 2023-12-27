/* eslint-disable max-classes-per-file */
window.onload = () => {
  const add = document.querySelector('.add');
  const dateEl = document.querySelector('.date');

  const displayDate = () => {
    setInterval(() => {
      const date = new Date().toUTCString();
      dateEl.innerHTML = date;
    }, 1000);
  };
  displayDate();

  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }

  class Methods {
    constructor() {
      this.bookList = [];
      this.addBook = document.querySelector('.all-books');
    }

    removeBook = (e, newBookElement) => {
      const index = e.target.getAttribute('myIndex');
      this.bookList.splice(index, 1);
      newBookElement.remove();
      localStorage.setItem('bookArray', JSON.stringify(this.bookList));
      this.showBooks();
    };

    showBooks = () => {
      this.addBook.innerHTML = '';
      this.bookList.forEach((e, i) => {
        const newBookDiv = document.createElement('div');
        newBookDiv.classList.add('book-div');
        newBookDiv.innerHTML = `
          <p>"${e.title}" by ${e.author}</p>
          <button type="button" class="remove" myIndex="${i}">Remove</button>
        `;
        const removeButton = newBookDiv.querySelector('.remove');
        removeButton.addEventListener('click', (e) => {
          this.removeBook(e, newBookDiv);
        });
        this.addBook.appendChild(newBookDiv);
      });
    };
  }

  const method = new Methods();
  const bookStorage = localStorage.getItem('bookArray');
  const success = document.querySelector('.successMsg');

  if (bookStorage) {
    method.bookList = JSON.parse(bookStorage);
    method.showBooks();
  }

  add.addEventListener('click', (e) => {
    e.preventDefault();

    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const book = new Book(title, author);
    method.bookList.push(book);
    method.showBooks();
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
    localStorage.setItem('bookArray', JSON.stringify(method.bookList));
    success.classList.remove('transparent');
    setTimeout(() => success.classList.add('transparent'), 3000);
  });

  const listEl = document.querySelector('.list');
  const addNewEl = document.querySelector('.add-new');
  const contactEl = document.querySelector('.contact');
  const bookSection = document.querySelector('#books');
  const formSection = document.querySelector('#form');
  const contactSection = document.querySelector('#contact');

  listEl.addEventListener('click', () => {
    bookSection.style.display = 'block';
    formSection.style.display = 'none';
    contactSection.style.display = 'none';
    listEl.classList.add('active');
    addNewEl.classList.remove('active');
    contactEl.classList.remove('active');
  });

  addNewEl.addEventListener('click', () => {
    bookSection.style.display = 'none';
    formSection.style.display = 'block';
    contactSection.style.display = 'none';
    addNewEl.classList.add('active');
    listEl.classList.remove('active');
    contactEl.classList.remove('active');
  });

  contactEl.addEventListener('click', () => {
    bookSection.style.display = 'none';
    formSection.style.display = 'none';
    contactSection.style.display = 'block';
    contactEl.classList.add('active');
    addNewEl.classList.remove('active');
    listEl.classList.remove('active');
  });
};