import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver, h1 } from '@cycle/dom';
import { insertRoot } from './utils/dom';

insertRoot(document.body);

const main = () => {
	const sinks = {
		DOM: xs.periodic(1000).map((secondsElapsed) => (
			h1(`${secondsElapsed} seconds elapsed`)
		)),
	};

	return sinks;
};


const drivers = {
	DOM: makeDOMDriver('#root'),
};

run(main, drivers);
