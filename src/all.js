import passepartout, { html } from 'passepartout';
import marked from 'marked';
import './style.styl';
import hljs from 'highlight.js';
import icon from './icon.svg';

marked.setOptions({
  highlight: (code, language) => {
    console.log(language);

    return language
      ? hljs.highlight(language, code).value
      : hljs.highlightAuto(code).value;
  }
});

const view = [
  [{ _: 'h1' }, [{ _: 'img', src: icon }], 'passepartout'],
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
