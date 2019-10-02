# Purpose

Learning javascript via practical projects

[Link to project details](https://www.theodinproject.com/courses/javascript/lessons/library?ref=lnav)

I broke the project up into modules inside the src/js files.

[Deployed site](https://paramagicdev.github.io/libraryBookJS)

This is a simple example of creating an array of books and being able to add
and remove books.

## Usage

### Local Development

```bash
git clone https://github.com/ParamagicDev/libraryBookJS.git
cd libraryBookJS/
npm install
npm run dev
```

### Deployment

```bash
npm install
npm run deploy
```

## Interesting notes

### [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)

This project uses [Document Fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) in order to render pages. A DocumentFragment
will aggregate elements in an invisible DOM so it does not trigger a rerender of the page.
Only when the DocumentFragment is inserted or appended within the visible DOM will the page
rerender

### [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

Because this project does not have a backend, I had to get creative as to how to
aggregate data submitted via the Add Book button. The basics of how I use the FormData
API is that I add a click listener onto the form button. Within this click listener,
I use the `event.preventDefault()` function to prevent the form from submitting a
GET request. After this, I then take any data that has been inserted into the form
fields and use it to add a new book to the library while checking to see that
each input contained a valid string.

### [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

This repo uses localStorage to store data. I quickly learned why the Factory Function is the
preferred way to create new objects in Javascript. It seems a lot more flexible and a lot easier to iterate on than
calling `new Prototype(arguments)`. When pulling from localStorage it feels fairly brittle but it works.
