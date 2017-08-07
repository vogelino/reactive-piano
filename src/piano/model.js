import initialState from '../constants/pianoKeys';

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

export default (changingKeys$) =>
	changingKeys$.fold(getPianoKeysByEvent, initialState);
