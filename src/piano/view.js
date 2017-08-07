import { html } from 'snabbdom-jsx';

export default (state$) => state$.map((preparedPianoKeys) => (
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
));
