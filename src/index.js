import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeAudioDriver } from './drivers/audioDriver';
import { insertRoot } from './utils/dom';
import piano from './piano';
import './index.css';

insertRoot(document.body);

run(piano, {
	DOM: makeDOMDriver('#root'),
	audio: makeAudioDriver(),
});
