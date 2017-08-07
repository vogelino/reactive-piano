import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { insertRoot } from './utils/dom';
import piano from './piano';
import './index.css';

insertRoot(document.body);

const main = (sources) => {
	const { DOM } = piano(sources);
	return { DOM };
};

const drivers = {
	DOM: makeDOMDriver('#root'),
};

run(main, drivers);
