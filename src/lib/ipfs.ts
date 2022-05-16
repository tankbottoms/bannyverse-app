import type { IPFS as IPFSCore, create } from 'ipfs-core';

type IPFSType = IPFSCore & { create: typeof create };

export const IPFS: IPFSType = window['IpfsCore'];
