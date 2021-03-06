class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));

    // get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // make alert gone after 3 secs
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// local storage class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;

      // Add book to ui
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Dom load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
  // get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Instantiate book Constructor
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // validation
  if(title === '' || author === '' || isbn === '') {
    // error alert
    ui.showAlert('please fill in all fields', 'error');
  } else {
    // Add book to List
    ui.addBookToList(book);

    // Add to ls
    Store.addBook(book);

    // show success
    ui.showAlert('Book Added', 'success');

    //clear fields after Submit
    ui.clearFields();
  }

  e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

  // Instantiate ui
  const ui = new UI();

  ui.deleteBook(e.target);

  // remove book from ls, we are targeting the isbn
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show alert when delete
  ui.showAlert('book removed', 'success');

  e.preventDefault();
});
