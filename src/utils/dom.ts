import { browser } from '$app/env';

export const replaceFavicon = (icon: string | null): void => {
	if (!browser) {
		return;
	}

	const $head = document.head;
	const $icons = $head.querySelectorAll('link[rel="icon"]');

	for (let i = 0; i < $icons.length; i++) {
		const $icon = $icons[i];

		$icon.remove();
	}

	$head.insertAdjacentHTML('beforeend', `<link  rel="icon" href="${icon || '/favicon.png'}" />`);
};

export const setCaret = ($target: HTMLElement): void => {
	if (!browser) {
		return;
	}

	const textNode = $target?.childNodes[0];

	if (!textNode) {
		return;
	}

	const range = document.createRange();
	const sel = window.getSelection();

	range.setStart(textNode, $target.textContent.length);
	range.collapse(true);
	sel.removeAllRanges();
	sel.addRange(range);
};
