
export default (state$) =>
	state$.map((keys) => keys.map(
		({ pressed: toPlay, soundFile: soundPath }) => ({ soundPath, toPlay })
	));
