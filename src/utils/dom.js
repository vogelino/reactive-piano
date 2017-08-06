export const insertRoot = (elementToInsertTo) => {
	const root = document.createElement('div');
	root.setAttribute('id', 'root');
	elementToInsertTo.appendChild(root);
};
