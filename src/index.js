import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeAudioDriver } from 'cycle-html5-audio-driver';
import { html } from 'snabbdom-jsx';
import { insertRoot } from './utils/dom';
import piano from './piano';
import description from './description';
import './index.css';

insertRoot(document.body);

const main = (sources) => {
	const pianoView = piano(sources);
	const descriptionView = description(sources);
	return {
		DOM: xs.combine(pianoView.DOM, descriptionView.DOM)
			.map(([pianoDOM, descriptionDOM]) => (
				<div className="app">
					{pianoDOM}
					{descriptionDOM}
				</div>
			)),
		audio: pianoView.audio,
	};
};

run(main, {
	DOM: makeDOMDriver('#root'),
	audio: makeAudioDriver(),
});
