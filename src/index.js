import { run } from '@cycle/run';
import { makeDOMDriver, div, input, p } from '@cycle/dom';
import { html } from 'snabbdom-jsx';
import { insertRoot } from './utils/dom';

insertRoot(document.body);

const main = (sources) => {
	const sinks = {
		DOM: sources.DOM.select('input').events('click')
			.map((evt) => evt.target.checked)
			.startWith(false)
			.map((toggled) => (
				<div>
					<input type="checkbox" /> Toggle me
					<p>{toggled ? 'on' : 'off'}</p>
				</div>
			)),
	};

	return sinks;
};


const drivers = {
	DOM: makeDOMDriver('#root'),
};

run(main, drivers);
