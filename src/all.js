import passepartout from 'passepartout';
import marked from 'marked';
import './style.styl';
import hljs from 'highlight.js';

marked.setOptions({
  highlight: (code, language) => {
    console.log(language);

    return language
      ? hljs.highlight(language, code).value
      : hljs.highlightAuto(code).value;
  }
});

const html = string => {
  const e = document.createElement('div');
  e.innerHTML = string;
  return e.children.length > 1 ? e : e.children[0];
};

const view = [
  [{ _: 'h1' }, 'passepartout'],
  [
    { _: 'main' },
    fetch(
      'https://raw.githubusercontent.com/FalkZ/passepartout/master/README.md'
    )
      .then(response => response.text())
      .then(text => text.replace('# passepartout', ''))
      .then(marked)
      .then(html)
  ]
];

passepartout({ view });
