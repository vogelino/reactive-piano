import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { html } from 'snabbdom-jsx';
import { insertRoot } from './utils/dom';
import pianoKeys from './constants/pianoKeys';
import './index.css';

insertRoot(document.body);

const getPianoKeysByEvent = (previousPianoKeys, { keyCode, pressed }) => {
	const preparedPianoKeys = previousPianoKeys.map((pianoKey) => ({
		...pianoKey,
		pressed: (
			pianoKey.keyboardKeyCode === keyCode ?
				pressed : pianoKey.pressed
		),
	}));
	return preparedPianoKeys;
};

const mapKeyEventToPressedState = (pressed) =>
	({ keyCode }) => ({ pressed, keyCode });

const mapClickEventToPressedState = (pressed) =>
	({ target }) => ({
		pressed,
		keyCode: parseInt(target.getAttribute('id'), 10),
	});

const main = ({ DOM }) => {
	const keyDownEv$ = DOM.select('document').events('keydown')
		.map(mapKeyEventToPressedState(true));
	const keyUpEv$ = DOM.select('document').events('keyup')
		.map(mapKeyEventToPressedState(false));
	const mouseDownEv$ = DOM.select('.piano_key').events('mousedown')
		.map(mapClickEventToPressedState(true));
	const mouseUpEv$ = DOM.select('.piano_key').events('mouseup')
		.map(mapClickEventToPressedState(false));
	const keyUpAndDown$ = xs.merge(keyDownEv$, keyUpEv$, mouseDownEv$, mouseUpEv$);
	const keyCodes$ = keyUpAndDown$.fold(getPianoKeysByEvent, pianoKeys);

	const sinks = {
		DOM: keyCodes$.map((preparedPianoKeys) => (
			<ul className="piano">
				{preparedPianoKeys.map(({ keyColor, keyboardKeyCode, pressed }) => (
					<li
						id={keyboardKeyCode}
						className={`
							piano_key piano_key_${keyColor}
							piano_key_${keyColor}--${pressed ? 'pressed' : 'unpressed'}`
						}
					/>
				))}
			</ul>
		)),
	};

	return sinks;
};


const drivers = {
	DOM: makeDOMDriver('#root'),
};

run(main, drivers);
