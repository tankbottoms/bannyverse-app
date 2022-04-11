<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { getSvg } from '$lib/getSvg';
	import { IPFS } from '$lib/ipfs';
	import Store from '$utils/Store';

	const form = {
		Body: ['Green', 'Pink', 'Red', 'Yellow'],
		Choker: ['Choker', 'Christmas_Lights', 'No_Choker'],
		Face: [
			'Alien',
			'Buddha_Face',
			'Bunny_Eyes',
			'Eye_Mouth',
			'Harley_Quinn',
			'No_Face',
			'Peach_Face',
			'Wonder_Woman'
		],
		Headgear: [
			'Assassin_Headgear',
			'Cowboy_Hat',
			'Green_Cap',
			'Kill_Bill',
			'Pirate',
			'Sakura',
			'Viking',
			'Astronaut_Helmet',
			'Cyberpunk_Glasses',
			'Hannible_Lector',
			'Mario',
			'Playboy',
			'Samurai_Ribbon',
			'Witchcraft',
			'Batman',
			'Dorthy',
			'Harley_Quinn',
			'Narutohead',
			'Princess_Leia',
			'Shining',
			'Wonder_Woman',
			'Blondie',
			'Elf',
			'Harry_Potter',
			'No_Hat',
			'Professor',
			'Smoking_Glasses',
			'Boba',
			'Farmer',
			'Headphones',
			'Obiwan',
			'Raggae',
			'Spock',
			'Brown_Hair',
			'Feather_Hat',
			'Ironman_Helmet',
			'Peach',
			'Rave_Glasses',
			'The_Mask_Hat',
			'Chef_Hat',
			'Fisherman',
			'Jesus',
			'Pharaoh',
			'Red_Hair',
			'Tinkerbell',
			'Clown',
			'Geisha',
			'Jinx_Hair',
			'Pink_Hat',
			'Robinhood_Hat',
			'Vampire'
		],
		Left_Hand: [
			'Cyberpunk_Weapon',
			'Holy_Wine',
			'Nothing',
			'Pirate_Sword',
			'Pitchfork',
			'Samurai_Katana',
			'Shark_v2',
			'Surf_Board',
			'Viking_Shield'
		],
		Lower_Accessory: [
			'Black_Shoes',
			'Christmas_Boots',
			'No_Shoes',
			'Robinhood_Boots',
			'Sandals',
			'Wonder_Shoes'
		],
		Oral_Fixation: ['Mouthstraw', 'Nothing'],
		Outfit: [
			'Assasin',
			'Dolly',
			'Harry_Potter',
			'Pharaoh',
			'Robinhood',
			'The_Mask',
			'Astronaut',
			'Dorthy',
			'Iron_Man',
			'Pink_Dress',
			'Sakura',
			'Tinkerbell',
			'Banana_Givi',
			'Dr.Manhattan',
			'Jesus',
			'Pink_Girl',
			'Samurai',
			'Vampire',
			'Batman',
			'Elf',
			'Jinx',
			'Pirate',
			'Satan',
			'Vampire_Girl',
			'Boba_Fett',
			'Farmer',
			'Kill_Bill',
			'Playboy',
			'Shiningbody',
			'Witchbelt',
			'Chef',
			'Fisherman_Vest',
			'Mario',
			'Princess_Leia',
			'Smalls',
			'Wonder_Woman_Dress',
			'Chokha',
			'Geisha',
			'Musketeer',
			'Princess_Peach',
			'Smoking',
			'Cowboy',
			"Guardians_of_Gaalaxy's_Gamora",
			'Naruto',
			'Professor',
			'Spock',
			'Cyberpunk',
			'Hannible_Lector',
			'No_Outfit',
			'Punk',
			'Surfer_T-shirt',
			'Deadpool',
			'Harley_Quinn',
			'Obiwan',
			'Rave',
			'Tao_of_Banana_Buddha_Robe'
		],
		Right_Hand: [
			'Anch',
			'Dagger',
			'Harley',
			'Lollipop',
			'Pistol',
			'Wagasa',
			'Butcher_Knife',
			'Dorthy_Basket',
			'Katana',
			'Musketeer_Rapier',
			'Robinhood_Dagger',
			'Witchbroom',
			'Christmas_Lights',
			'Fishing_Pole',
			'Lightsaber',
			'Nothing',
			'Viking_Axe',
			'Wonder_Woman'
		],
		Background: ['1000_Days', '100_Days', '10_Days', '500_Days', '50_Days']
	};

	let svgElement: SVGElement;

	const values = new Store<Record<string, string>>({
		Background: '',
		Body: '',
		Choker: '',
		Face: '',
		Headgear: '',
		Left_Hand: '',
		Lower_Accessory: '',
		Oral_Fixation: '',
		Outfit: '',
		Right_Hand: ''
	});

	let minted = '';

	/*
		* should we make a cloud function which would generate the character, metadata and push to IPFS?
		* we will need the minter contract to operate effectively like the Tiles saving the CID in a mapping of tokenId and owner address
		* certain accessories are incompatible with others how to encode?
		* certain accessories are rarer than others how to encode?
		* add ETH pricing per accessory left, right, hat, both hands
		* whichever character  you have in your wallet you are allowed to mint from that character backwards
		* each character has a "naked" version which retains the core feature of the character directory structure in production 
			see page Banny Assets https://www.figma.com/file/p2oVgTPz0DxC1iv7LvrhdM/JBX%2FMove-DAO-Components?node-id=1487%3A23333
		* 
	*/

	async function upload() {
		const ipfs = await IPFS.create({
			repo: 'ipfs-' + Math.random()
		});
		const { cid } = await ipfs.add(
			JSON.stringify({
				name: `Juicebox #${1}`,
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
		minted = `https://cloudflare-ipfs.com/ipfs/${cid.toString()}`;
		console.log(minted);
	}

	async function getNFTUrl(metedataURI: string) {
		const response = await fetch(metedataURI);
		const json = await response.json();
		return json.image;
	}
</script>

<svelte:head>
	<title>BannyVerse</title>
</svelte:head>

<section>
	{#if minted}
		{#await getNFTUrl(minted) then src}
			<img {src} alt="" />
			<span class="metedata-url">{minted}</span>
		{/await}
	{:else}
		{#await getSvg($values) then src}
			{@html src}
		{/await}

		<div class="controls">
			{#each Object.entries(form) as [key, options]}
				<div class="control">
					<label for={key}>{key}</label>
					<select name={key} bind:value={$values[key]}>
						<option value="">None</option>
						{#each options as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>
			{/each}
		</div>

		<p>

		</p>
		<button on:click={upload}>Upload to IPFS</button>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	.controls {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.control {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	label {
		font-size: 0.75rem;
		font-weight: bold;
		margin-bottom: 0.25rem;
	}
	button {
		margin-top: 1rem;
	}

	.metedata-url {
		margin-top: 2rem;
	}
</style>
