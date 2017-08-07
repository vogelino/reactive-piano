import xs from 'xstream';
import { div } from '@cycle/dom';
import marked from 'marked';
import README from '../../README.md';
import './description.css';

export default () => ({
	DOM: xs.of(README)
		.map(marked)
		.map((htmlString) => div('.description', { props: { innerHTML: htmlString } })),
});
