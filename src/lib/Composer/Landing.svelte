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

    /* Constant slow hovering animation */
    #planet1 {
        animation: planet1 10s infinite;
    }

    @keyframes planet1 {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(5px, 10px);
        }
        100% {
            transform: translate(0, 0px);
        }
    }

    #planet2 {
        animation: planet2 10s infinite;
    }

    @keyframes planet2 {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(10px, 0px);
        }
        100% {
            transform: translate(0, 0px);
        }
    }

    #planet3 {
        animation: planet3 60s infinite;
    }

    @keyframes planet3 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(0, 0) rotate(360deg);
        }
    }

    #planet4 {
        animation: planet4 10s infinite;
    }

    @keyframes planet4 {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(-5px, 10px);
        }
        100% {
            transform: translate(0, 0px);
        }
    }


</style>
