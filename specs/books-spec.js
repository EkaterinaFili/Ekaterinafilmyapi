const BooksApi = require('../api/books-api');
const { expect } = require('chai');

describe('Books', async function () {

  it('should be able to get a book', async function () {
    const timestamp = Date.now();
    const title = 'Title.' + timestamp;
    const author = 'Author.' + timestamp;

    // Create a book
    const postNewBook = await BooksApi.createBook(title, author);

    // Verify create book response
    expect(postNewBook.data.id.length).to.equal(32);
    expect(postNewBook.data.title).to.be.equal(title);
    expect(postNewBook.data.author).to.be.equal(author);

    // Get new book by id
    const getNewBook = await BooksApi.getBook(postNewBook.data.id);

    // Verify new book can be successfully retrieved
    expect(getNewBook.id.length).to.equal(32);
    expect(getNewBook.title).to.be.equal(title);
    expect(getNewBook.author).to.be.equal(author);
  })

  it('Should be able to delete a book', async function () {
    const timestamp = Date.now();
    const title = 'Title.' + timestamp;
    const author = 'Author.' + timestamp;

    // Create a book
    const postNewBook = await BooksApi.createBook(title, author);

    // Verify create book response
    expect(postNewBook.data.title).to.be.equal(title);

    // Delete book by id
    const deleteBook = await BooksApi.deleteBook(postNewBook.data.id);

    // Verify that created book not found after have been  deleted
    const getBook = await BooksApi.getBook(postNewBook.data.id);
    expect(getBook.message).to.be.equal('Not found');
  });

  it('should be able to update a book', async function () {
    const timestamp = Date.now();
    const title = 'Title.' + timestamp;
    const author = 'Author.' + timestamp;

    // Create a book
    const postNewBook = await BooksApi.createBook(title, author);

    // Get new book's ID
    const bookID = postNewBook.data.id;

    // Set new parameteres
    const newTitle = 'NewTitle.' + timestamp;
    const newAuthor = 'NewAuthor.' + timestamp;

    // update parameters
    const updateBook = await BooksApi.updateBook(bookID, newTitle, newAuthor);

    // Verify api call success and parameters change
    expect(updateBook.status).to.be.equal(200);
    expect(updateBook.data.title).to.be.equal(newTitle);
    expect(updateBook.data.author).to.be.equal(newAuthor);

    // Delete newly created and modified book
    await BooksApi.deleteBook(bookID);
  });

  it('Should not be able to create a book without author', async function () {
    const postNewBook = await BooksApi.createBook(null, 'Nothing is difficult, if you know how to do it!');

    // Verify should not be able to create a book without author
    expect(postNewBook.data.error).to.equal('One of required fields is missing');
  });

  it('Should not be able to create a book without title', async function () {
    const postNewBook = await BooksApi.createBook('Sergii K', null);

    // Verify should not be able to create a book without title
    expect(postNewBook.data.error).to.equal('One of required fields is missing');
  });

});