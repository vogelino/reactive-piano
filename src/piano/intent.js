import xs from 'xstream';

const mapKeyEventToPressedState = (pressed) =>
	({ keyCode }) => ({ pressed, keyCode });

const mapClickEventToPressedState = (pressed) =>
	({ target }) => ({
		pressed,
		keyCode: parseInt(target.getAttribute('id'), 10),
	});

export default ({ DOM }) => {
	const keyDownEv$ = DOM.select('document').events('keydown')
		.map(mapKeyEventToPressedState(true));
	const keyUpEv$ = DOM.select('document').events('keyup')
		.map(mapKeyEventToPressedState(false));
	const mouseDownEv$ = DOM.select('.piano_key').events('mousedown')
		.map(mapClickEventToPressedState(true));
	const mouseUpEv$ = DOM.select('.piano_key').events('mouseup')
		.map(mapClickEventToPressedState(false));

	return xs.merge(keyDownEv$, keyUpEv$, mouseDownEv$, mouseUpEv$);
};
