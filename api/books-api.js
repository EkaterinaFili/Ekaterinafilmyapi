const ClientApi = require('./client-api');

class BooksApi extends ClientApi {
    async getBooks() {
        let response = await this.get('/books');

        return response.data.body;
    }

    async getBook(bookId) {
        let response = await this.get('/' + bookId);

        return response.data;
    }

    /**
     * 
     * @param {*} title - string: book title
     * @param {*} author - string: book author
     * @returns 
     */
    async createBook(title, author) {
        const body = {
            title: title,
            author: author
        }

       let response = await this.post('/books', body);

       return response;
   }

    async updateBook(id, title, author) {
        const body = {
            "title": title,
            "author": author
        };

        let response = await this.put(`/${id}`, body);

        return response;
    }

    async deleteBook(bookId) {
        let response = await this.delete('/' + bookId);

        return response.data.body;
    }
};
module.exports = new BooksApi();