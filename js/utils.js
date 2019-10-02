export function createTagWithClass(tag, klass, text = '') {
  const element = document.createElement(tag);
  element.classList.add(klass);
  element.innerText = text;
  return element;
}

// Explanation of document fragments and why its more performant
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
export function appendChildren(parent, children) {
  const docFrag = document.createDocumentFragment();

  [...children].forEach(child => docFrag.appendChild(child));

  parent.appendChild(docFrag);
}
