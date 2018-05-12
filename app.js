// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book to list
UI.prototype.addBookToList = function(book) {
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

// show alert
UI.prototype.showAlert = function(message, className) {
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

// clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

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

    //clear fields after Submit
    ui.clearFields();
  }



  e.preventDefault();
});
