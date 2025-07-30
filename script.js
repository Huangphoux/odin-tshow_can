const myLibrary = [];

function Book(title, author, pageNumber, isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();

    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.isRead = isRead;

    const pageInfo = pageNumber > 1 ? "pages" : "page";
    this.info = function () {
        // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"

        const isReadInfo = isRead ? "has read" : "not read yet";

        return `${title} by ${author}, ${pageNumber} ${pageInfo}, ${isReadInfo}`;
    };

    this.display = function () {
        return [this.title, this.author, `${this.pageNumber} ${pageInfo}`];
    };

    this.toggleRead = function () {
        this.isRead = !this.isRead;
    };
}

function addBookToLibrary(title, author, pageNumber, isRead) {
    myLibrary.push(new Book(title, author, pageNumber, isRead));
}

function displayLibrary() {
    const container = document.querySelector(".container");
    container.textContent = "";

    for (const book of myLibrary) {
        const card = document.createElement("ul");

        card.classList.toggle("book");
        if (book.isRead) {
            card.classList.toggle("read");
        }

        for (const prop of book.display()) {
            const info = document.createElement("li");
            info.textContent = prop;
            card.appendChild(info);
        }
        card.setAttribute("data-book", `${book.id}`);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            const index = myLibrary.map((e) => e.id).indexOf(card.dataset.book);
            myLibrary.splice(index, 1);

            displayLibrary();
        });
        card.appendChild(removeBtn);

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle";
        toggleBtn.addEventListener("click", () => {
            const index = myLibrary.map((e) => e.id).indexOf(card.dataset.book);
            myLibrary[index].toggleRead();
            displayLibrary();
        });
        card.appendChild(toggleBtn);

        container.appendChild(card);
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("Winnie-the-Pooh", "A. A. Milne", 176, true);
addBookToLibrary("A Study in Scarlet", "Arthur Conan Doyle", 192, true);

displayLibrary();

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const showBtn = document.querySelector(".newBook");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit");

showBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formObj = Object.fromEntries(new FormData(form));

    addBookToLibrary(formObj.title, formObj.author, +formObj.pageNumber, "isRead" in formObj ? true : false);

    displayLibrary();

    form.reset();
    dialog.close();
});
