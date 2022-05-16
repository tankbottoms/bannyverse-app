import { firestore, getDocuments } from '$lib/stores/firebase';
import type { ProfileDataResponse } from '$lib/twitter-auth/api/get-profile-data';
import { doc, DocumentSnapshot, getDoc, setDoc, where } from 'firebase/firestore';
import { getFirestorePath } from './firebase';
import { dateToString } from './string';
import { connectedAccount } from '$lib/stores/web3';
import environment from '../../environment';

function getActivityTitle(activity: Any) {
	const type = activity.type as string;
	let str = type
		.replace(/[^a-zA-Z0-9]/g, ' ')
		.split(' ')
		.map((w) => `${w[0].toUpperCase()}${w.slice(1)}`)
		.join(' ');

	if (['purchase', 'back_movement'].includes(activity.type)) {
		str = `Purchase $${activity.token_symbol}`;
	}
	return str;
}

export async function getActivites(
	ethAddress = connectedAccount.get(),
	handle = ''
): Promise<Record<string, Any>[]> {
	let activities = [];
	let _activities = [];
	if (ethAddress) {
		const condition = where('created_by', '==', ethAddress);
		const _acts = (await getDocuments(
			getFirestorePath('activities'),
			condition
		)) as unknown as Any[];
		_activities = { ..._activities, ..._acts };
	}
	if (handle) {
		const condition = where('created_by', '==', handle?.toLowerCase());
		const _acts = (await getDocuments(
			getFirestorePath('activities-by-twitter-handle'),
			condition
		)) as unknown as Any[];
		_activities = { ..._activities, ..._acts };
	}
	for (const [, activity] of Object.entries(_activities)) {
		const date = new Date(activity.created_at);
		const dateString = dateToString(date);
		let refDoc: DocumentSnapshot;
		if (activity?.ref) {
			refDoc = await getDoc(activity?.ref);
		}
		activities = [
			...(activities || []),
			{
				...activity,
				title: getActivityTitle(activity),
				created_at_string: dateString,
				refId: activity?.ref ? refDoc.id : undefined,
				ref: activity?.ref ? refDoc.data() : undefined
			}
		];
	}
	for (const activity of activities) {
		const ref = activity?.ref as Record<string, string>;
		try {
			if (ref?.movement) {
				activity.movementId = ref.movement;
				activity.movement = (
					await getDoc(doc(firestore, `${environment.BACKEND_API}-movements/${ref.movement}`))
				).data();
			}
		} catch (e) {
			console.error(e.message);
		}
	}
	activities = [...activities];

	return activities;
}

export function processUserData(data: Any): Record<string, Any> {
	const username = (data?.username || '')?.toLowerCase();
	if (username) return { ...data, username };
	return { ...(data || {}) };
}

export async function checkAccount(): Promise<Any> {
	const connectedData = connectedAccount.get();
	const snap = await getDoc(doc(firestore, `${environment.BACKEND_API}-users/${connectedData}`));

	if (snap.exists()) {
		return snap.data() as ProfileDataResponse['data'];
	}

	const account = {
		created_at: new Date().getTime(),
		created_by: connectedData,
		ethAddress: connectedData,
		customName: '',
		data: '',
		id: '',
		name: '',
		username: ''
	};

	await setDoc(doc(firestore, `${environment.BACKEND_API}-users/${connectedData}`), account);
	return account as unknown as ProfileDataResponse['data'];
}
