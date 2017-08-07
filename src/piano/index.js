import intent from './intent';
import model from './model';
import view from './view';
import './piano.css';

export default (sources) => {
	const changingKeys$ = intent(sources);
	const state$ = model(changingKeys$);
	const view$ = view(state$);

	return {
		DOM: view$,
	};
};
