import type { IPFS as IPFSCore, create } from 'ipfs-core';
import { getSvg } from '$lib/getSvg';
import { minted } from '$stores';

type IPFSType = IPFSCore & { create: typeof create };

export const IPFS: IPFSType = window['IpfsCore'];

async function uploadCharacter() {
    const ipfs = await IPFS.create({
        repo: 'ipfs-' + Math.random()
    });
    const { cid } = await ipfs.add(
        JSON.stringify({
            name: `Juicebox #${1}`,
            // TODO Derive attributes from character
            attributes: [
                { trait_type: 'Color', value: 'White' },
                { trait_type: 'Distortion Scale', value: 11 },
                { trait_type: 'Rings', value: 6 },
                { trait_type: 'Frequency Multiple', value: 2 }
            ],
            description: 'Distortion is a fully hand-typed 100% on-chain art collection.',
            image: `data:image/svg+xml;base64,${btoa(await getSvg($values))}`
        })
    );
    minted.set(`https://cloudflare-ipfs.com/ipfs/${cid.toString()}`);
}
