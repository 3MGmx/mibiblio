document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('book-list');

    bookForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(bookForm);
        const response = await fetch('/api/books', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const book = await response.json();
            addBookToList(book);
            bookForm.reset();
        } else {
            alert('Error al registrar el libro. Inténtalo de nuevo.');
        }
    });

    const addBookToList = (book) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author}`;
        bookList.appendChild(listItem);
    };
});

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pdfFile = document.getElementById('pdfFile').files[0];

    if (title && author && pdfFile) {
        const bookList = document.getElementById('books');
        const listItem = document.createElement('li');

        const bookInfo = document.createElement('span');
        bookInfo.textContent = `Título: ${title}, Autor: ${author}`;

        const pdfLink = document.createElement('a');
        pdfLink.href = URL.createObjectURL(pdfFile);
        pdfLink.textContent = ' Ver PDF';
        pdfLink.target = '_blank';

        listItem.appendChild(bookInfo);
        listItem.appendChild(pdfLink);
        bookList.appendChild(listItem);

        // Clear the form
        document.getElementById('bookForm').reset();
    }
});