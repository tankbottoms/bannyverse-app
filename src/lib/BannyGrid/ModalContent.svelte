<script lang="ts">
	export let banny: Partial<Banny>;
</script>

<main>
    <img src={banny.src} alt={banny.name} />
    <section>
        <header><h1>{banny.name.replaceAll('_', ' ')}</h1></header>
        <h3>Personality</h3>
        <p>{banny.history}</p>
        <h3>Motto</h3>
        <p>"{banny.motto}"</p>
    </section>
</main>

<style>
    main {
        display: flex;
        align-items: center;
    }

    img {
        max-width: 500px;
        max-height: 500px;
        border-radius: 7%;
        padding: 15px;
    }

    section {
        padding: 0 4rem;
        max-width: 450px;
    }

    h1 {
        color: white;
        text-align: left;
    }

    h3 {
        text-transform: uppercase;
        font-size: 15px;
    }

    h3:last-of-type {
        margin-top: 40px;
    }

    p {
        font-size: 14px;
    }

    h3, p {
        color: #E7E7E7;
        font-weight: 300;
    }
</style>