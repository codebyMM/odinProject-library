const myLibrary = [{
        id: '138b67f6-88e1-4183-b0e0-d7af5801c22a',
        name: "Harry Potter and the Philosopher's Stone",
        author: 'J.K. Rowling',
        page: 223,
        cover: 'https://images.tokopedia.net/img/cache/700/product-1/2017/5/2/18783090/18783090_02e52924-2a33-4c9d-aa59-612c1fd94e43_313_500.jpg',
        isRead: false
    },
    {
        id: '623faab0-99d6-4ddc-9587-770bd8daaa3e',
        name: 'The Lord of the Rings',
        author: 'John Ronald Reuel Tolkien',
        page: 1077,
        cover: 'https://ebooks.gramedia.com/ebook-covers/76535/image_highres/BLK_TLOTR2022295520.jpg',
        isRead: true
    },
];

function Book(name, author, page, cover, status) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.page = page;
    this.cover = cover;
    this.isRead = status;
}

function addBookToLibrary(name, author, page, cover, status) {
    if (cover === '') {
        cover = 'https://pngimg.com/d/book_PNG51004.png';
    }
    let newBook = new Book(name, author, page, cover, status);
    myLibrary.push(newBook);
}

const addBtn = document.querySelector('#toggleBtn');
const closeBtn = document.querySelector('#closeBtn');
const cardsContainer = document.querySelector('.cards-container');
const submitBtn = document.querySelector('#submitBtn');

addBtn.addEventListener('click', toggle);
closeBtn.addEventListener('click', toggle);
submitBtn.addEventListener('click', () => {
    let booktitleValue = document.querySelector('#bookTitle').value;
    let bookauthorValue = document.querySelector('#bookAuthor').value;
    let bookpageValue = document.querySelector('#bookPages').value;
    let bookcoverValue = document.querySelector('#bookCover').value;
    let bookStatusValue = document.querySelector('#bookStatus').checked;

    addBookToLibrary(booktitleValue, bookauthorValue, bookpageValue, bookcoverValue, bookStatusValue);
    cardsContainer.innerHTML = '';
    showAll();
    toggle();
})

function toggle() {
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.toggle('show');
}
function createElement(bookData) {
    let card = document.createElement('div');
    let imageContainer = document.createElement('div');
    let bookDescription = document.createElement('div');
    let cardButton = document.createElement('div');
    let bookImage = document.createElement('img');
    let bookTitle = document.createElement('h3');
    let bookAuthor = document.createElement('h4');
    let bookPages = document.createElement('p');
    let bookStatus = document.createElement('p');
    let removeBtn = document.createElement('button');
    let statusBtn = document.createElement('button');
    let bookId = document.createElement('p');
    
    card.classList.add('card');
    imageContainer.classList.add('image-container');
    bookDescription.classList.add('book-description');
    cardButton.classList.add('card-button');
    removeBtn.id = 'btnRemove';
    statusBtn.id = 'btnisRead';
    bookId.id = 'bookIdInput';
    bookId.setAttribute('hidden', true);
    bookPages.classList.add('pages');

    bookImage.src = bookData.cover;
    bookTitle.innerText = bookData.name;
    bookAuthor.innerText = bookData.author;
    bookPages.innerText = `${bookData.page} Pages`;
    bookId.innerText = bookData.id;
    removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    statusBtn.innerHTML = '<i class="fa-solid fa-book-open"></i>';
    removeBtn.setAttribute('title', 'Delete Book');

    if (bookData.isRead === true) {
        statusBtn.style.color = '#21ffcb';
        statusBtn.setAttribute('title', 'Not Finish');
        bookStatus.innerText = 'Finished';
    } else {
        statusBtn.setAttribute('title', 'Finish');
        bookStatus.innerText = 'Not Finished';
    }

    removeBtn.addEventListener('click', (e) => {
        let bookidValue = e.target.parentNode.parentNode.parentNode.querySelector('#bookIdInput').innerText;
        let bookIndex = myLibrary.findIndex( e => e.id === bookidValue);
        myLibrary.splice(bookIndex, 1);
        
        cardsContainer.innerHTML = '';
        showAll();
    });
    
    statusBtn.addEventListener('click', (e) => {
        let bookidValue = e.target.parentNode.parentNode.parentNode.querySelector('#bookIdInput').innerText;
        let bookIndex = myLibrary.findIndex( e => e.id === bookidValue);
        if (myLibrary[bookIndex].isRead === true) {
            myLibrary[bookIndex].isRead = false;
            bookStatus.innerText = 'Not Finished';
            e.target.style.color = '#fff';
        } else {
            e.target.style.color = '#21ffcb';
            myLibrary[bookIndex].isRead = true;
            bookStatus.innerText = 'Finished';
        }
    });

    cardButton.append(removeBtn, statusBtn);
    bookDescription.append(bookTitle, bookAuthor, bookPages, bookStatus, cardButton, bookId);
    imageContainer.appendChild(bookImage);
    card.append(imageContainer, bookDescription);
    cardsContainer.append(card);
}
function showAll() {
    myLibrary.forEach(element => {
        createElement(element);
    });
}
showAll();