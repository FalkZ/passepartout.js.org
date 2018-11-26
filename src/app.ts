import brakets, { BraketElement } from '../src/brakets'
import query, { _, id } from '../src/brakets-query'
import markdown from '../src/brakets-markdown'

import './style.css'
import './highlight.css'

// @ts-ignore: import works
import * as icon from './icon.svg'

const title = ({ model, controller }) => [
	{ _: 'h1', id: 'h1', on: { click: controller.invert } },
	[
		{
			_: 'img',
			src: icon,
			style: (model || {}).invert ? { filter: 'invert(100%)' } : { filter: '' }
		}
	],
	'Brakets.js',
	[ { id: 'version' }, '0.0.2' + (model.test || '') ],
	...((model || {}).invert ? [ [ '  test' ], [ 't' ] ] : [ [ 'b' ] ])
]
//.selector('h1')
//.action((value) => null) //console.log(value))

const body = markdown(`

> A fast micro-framework for building complex applications without jsx.

### Install

\`\`\`
npm i bracets
\`\`\`
or 
\`\`\`html
<script src="cdn"></script>
\`\`\`

### Model–view–controller

Sure! \`code test\`

\`\`\`javascript
import bracets from 'bracets'

bracets({ model, view, controller })
\`\`\`

### View

Works like JSX but with arrays as tags and objects as properties

\`\`\`javascript
const view = [
	[{ _: 'h1' }, 'This is a h1 heading text'],
	[{ _: 'a', href: 'https://brakets.js' }, 
	 'this is a link to brakets.js'
	]
]

bracets({ view })

\`\`\`
`)

const view: BraketElement = [ [ { _: title } ], ...body ]

const controller = {
	do: (all) => {
		console.log(all)
		const { event } = all

		return { test: event.clientX }
	},
	invert: ({ model }) => ({ invert: (model || {}).invert ? false : true })
}

brakets({
	controller,
	view,
	query: document.body
})
