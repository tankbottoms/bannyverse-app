window.addEventListener('message', function (event) {
	var action = event.data.action;
	if (action === 'IFRAME_PREVIEW_RELOAD_CSS') {
		var els = document.querySelectorAll('[_has]');
		for (var i = 0; i < els.length; i++) {
			els[i].removeAttribute('_has');
		}
		hasQueries = [];
		getAllHas();
		assignAllHas();
	}
});

setTimeout(function ref() {
	getAllHas();
	assignAllHas();
	setTimeout(ref, 1000);
}, 1000);
