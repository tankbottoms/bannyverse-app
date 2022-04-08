import type Store from './Store';
import { DISCORD_URL_MASK, URL_REGEXP } from '../../constants';

export const TOKEN_SYMBOL = {
	prepend: '$',
	mustMatch: /^[A-Z][A-Z0-9]*$/,
	blockedKeys: [' ', /^[.,/\\'"`$#@!%^&*()]$/],
	maxLength: 7,
	invalidMsg: 'must be uppercase and first characher must be from A-Z',
};

export const DAYS = {
	append: ' days',
	mustMatch: /^[\d]+$/,
	blockedKeys: [' ', /^[_.a-zA-Z,/\\'"`$#@!%^&*()]$/],
	maxLength: 4,
	hasOnlyDigits: true,
	invalidMsg: 'enter a valid number',
};

export const AT_HANDLE = {
	prepend: '@',
	mustMatch: /^[\w.]+$/,
	blockedKeys: [' ', /^[/\\'"`$#@!%^&*()]$/],
	invalidMsg: 'enter a valid username',
};

export const tokens = (tokenSymbol: string): Record<string, unknown> => ({
	mustMatch: /^(\d[.,]?)+$/,
	append: ` ${tokenSymbol}`,
	blockedKeys: [' ', /^[^\d.,]$/],
	hasOnlyDigits: true,
	invalidMsg: 'enter a valid number',
});

export const ETH_ADDRESS = {
	mustMatch: /^(0x[\dA-Fa-f]+)$|^([a-zA-Z0-9]{3,}.eth)$/,
	maxLength: 42,
	invalidMsg: 'enter a valid ETH address',
	placeholder: '0x00B504F333F9DE60...',
};

export const PERCENTAGE = {
	append: '%',
	mustMatch: /^\d\d?(0([.]0+)?|[.]\d+)?$/,
	blockedKeys: [' ', /^[a-zA-Z,\s]$/],
	hasOnlyDigits: true,
	invalidMsg: 'enter a number less than or equal to 100',
};

export const CALENDAR = {
	invalidMsg: 'Date should not be in the past',
};

export const FROM_10_TO_100 = {
	mustMatch: /^[1-9][0-9]$|^100$/,
	invalidMsg: 'Enter value between 10-100',
}

export const DISCORD_URL = {
	mustMatch: DISCORD_URL_MASK,
	invalidMsg: 'Enter a valid Discord url',
}

export const URL = {
	mustMatch: URL_REGEXP,
	invalidMsg: 'Enter a valid url',
}

export function handleFormReset(steps: Store[], key = 'STEP'): boolean {
	steps.forEach((step, index) => {
		localStorage.removeItem(`${key}${index}`);
		step.set(null);
	});
	return true;
}
