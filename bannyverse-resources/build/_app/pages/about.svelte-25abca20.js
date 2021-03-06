import {
	S as R,
	i as V,
	s as j,
	k as y,
	e as l,
	t as c,
	K as z,
	d as n,
	m as _,
	c as i,
	a as r,
	h,
	b as Y,
	g as C,
	J as e,
	E as K
} from '../chunks/index-f52b3be9.js';
const F = !0,
	G = !1;
function N(D) {
	let p, t, u, w, E, s, b, d, k, T, x, v, S, A, f, P, H, m;
	return {
		c() {
			(p = y()),
				(t = l('div')),
				(u = l('h1')),
				(w = c('About this app')),
				(E = y()),
				(s = l('p')),
				(b = c('This is a ')),
				(d = l('a')),
				(k = c('SvelteKit')),
				(T = c(` app. You can make your own by typing the
		following into your command line and following the prompts:`)),
				(x = y()),
				(v = l('pre')),
				(S = c('npm init svelte@next')),
				(A = y()),
				(f = l('p')),
				(P =
					c(`The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.`)),
				(H = y()),
				(m = l('p')),
				this.h();
		},
		l(o) {
			z('[data-svelte="svelte-1ine71f"]', document.head).forEach(n),
				(p = _(o)),
				(t = i(o, 'DIV', { class: !0 }));
			var a = r(t);
			u = i(a, 'H1', {});
			var q = r(u);
			(w = h(q, 'About this app')), q.forEach(n), (E = _(a)), (s = i(a, 'P', {}));
			var g = r(s);
			(b = h(g, 'This is a ')), (d = i(g, 'A', { href: !0 }));
			var B = r(d);
			(k = h(B, 'SvelteKit')),
				B.forEach(n),
				(T = h(
					g,
					` app. You can make your own by typing the
		following into your command line and following the prompts:`
				)),
				g.forEach(n),
				(x = _(a)),
				(v = i(a, 'PRE', {}));
			var L = r(v);
			(S = h(L, 'npm init svelte@next')), L.forEach(n), (A = _(a)), (f = i(a, 'P', {}));
			var M = r(f);
			(P = h(
				M,
				`The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.`
			)),
				M.forEach(n),
				(H = _(a)),
				(m = i(a, 'P', {}));
			var I = r(m);
			I.forEach(n), a.forEach(n), this.h();
		},
		h() {
			(document.title = 'About'),
				Y(d, 'href', 'https://kit.svelte.dev'),
				Y(t, 'class', 'content svelte-cf77e8');
		},
		m(o, J) {
			C(o, p, J),
				C(o, t, J),
				e(t, u),
				e(u, w),
				e(t, E),
				e(t, s),
				e(s, b),
				e(s, d),
				e(d, k),
				e(s, T),
				e(t, x),
				e(t, v),
				e(v, S),
				e(t, A),
				e(t, f),
				e(f, P),
				e(t, H),
				e(t, m);
		},
		p: K,
		i: K,
		o: K,
		d(o) {
			o && n(p), o && n(t);
		}
	};
}
const Q = G,
	U = F,
	W = !0;
class X extends R {
	constructor(p) {
		super(), V(this, p, null, N, j, {});
	}
}
export { X as default, Q as hydrate, W as prerender, U as router };
