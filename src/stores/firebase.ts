/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { DocumentData } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { CollectionReference, Query, query, QueryConstraint } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
	getAuth,
	signInWithPopup,
	signOut,
	TwitterAuthProvider,
	onAuthStateChanged
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { connectedAccount } from './web3';
import { browser } from '$app/env';
import Store from '$lib/utils/Store';
import { derived } from 'svelte/store';
import { FIREBASE_CONFIG } from '../../environment';

export const firebaseConfig = FIREBASE_CONFIG;

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const user = new Store<User & Record<string, any>>();
export const userdata = derived(user, ($user) =>
	$user
		? {
				username: $user?.reloadUserInfo?.screenName,
				name: $user?.displayName,
				profile_image_url: $user?.reloadUserInfo?.photoUrl
		  }
		: null
);

if (browser) {
	const auth = getAuth(firebaseApp);
	onAuthStateChanged(auth, (_user) => {
		if (_user?.uid) user.set(_user);
		else user.set(null);
	});
}

export async function twitterLogin() {
	const auth = getAuth(firebaseApp);
	const provider = new TwitterAuthProvider();
	await signInWithPopup(auth, provider);
}

export async function twitterLogout() {
	const auth = getAuth(firebaseApp);
	await signOut(auth);
}

export function getFileURI(path: string, alt = 'media'): string {
	return (
		`https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}` +
		`/o/${encodeURIComponent(path)}?alt=${alt || 'media'}`
	);
}

export async function getDocument(path: string): Promise<DocumentData> {
	try {
		const document = doc(firestore, path);
		const snap = await getDoc(document);
		return snap.data();
	} catch (err) {
		console.error(err.message || err);
		return;
	}
}

export async function getDocuments(
	path: string,
	queryConstraints: QueryConstraint = undefined
): Promise<Record<string, DocumentData>> {
	try {
		let coll = collection(firestore, path) as CollectionReference | Query;
		if (queryConstraints) {
			coll = query(coll as CollectionReference, queryConstraints);
		}
		const snap = await getDocs(coll);
		return Object.fromEntries(snap.docs.map((snap) => [snap.id, snap.data()]));
	} catch (err) {
		console.error(err.message || err);
		return;
	}
}

export async function createMoveDocument(type: string, data: MoveDocument): Promise<boolean> {
	if (!connectedAccount.get()) return false;
	data.created_at = new Date().getTime();
	data.created_by = connectedAccount.get();
	try {
		if (typeof type === 'string') {
			await addDoc(collection(firestore, type), data);
			return true;
		}
		throw Error('unknown document type');
	} catch (err: unknown) {
		console.error(`failed to save ${type} document`);
		return false;
	}
}

export async function setDocument(path: string, data: DocumentData): Promise<boolean> {
	if (!connectedAccount.get()) return false;
	data.created_at = new Date().getTime();
	data.created_by = connectedAccount.get();
	try {
		const _doc = doc(firestore, path);
		await setDoc(_doc, data);
		return true;
	} catch (error) {
		console.error(error.message || error);
		return false;
	}
}
