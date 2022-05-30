import characters from '$data/characters.json';

/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
}

declare global {
    type Banny = typeof characters[0];
}
