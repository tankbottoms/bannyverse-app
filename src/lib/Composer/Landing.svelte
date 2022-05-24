<section>
	<img src="/landing/landingText.svg" alt="The Banny Verse" />
	<img src="/landing/Planet_1.svg" alt="Planet 1" id="planet1"/>
	<img src="/landing/Planet_2.svg" alt="Planet 2" id="planet2"/>
	<img src="/landing/Planet_3.svg" alt="Planet 3" id="planet3"/>
	<img src="/landing/Planet_4.svg" alt="Planet 4" id="planet4"/>
</section>

<style>
	section {
        position: relative;
		background: black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
        height: 100vh;
		text-align: center;
		margin-top: 20px;
	}
    [id*="planet"] {
        position: absolute;
    }

    #planet1 {
        top: 10px;
        right: 20px;
    }

    #planet2 {
        top: 10px;
        left: 100px;
    }

    
    #planet3 {
        top: 200px;
        left: 30px;
    }

    #planet4 {
        bottom: 50px;
        right: 20px;
    }


</style>
