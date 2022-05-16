function N() {}
function K(t, e) {
	for (const n in e) t[n] = e[n];
	return t;
}
function Q(t) {
	return t && typeof t == 'object' && typeof t.then == 'function';
}
function P(t) {
	return t();
}
function H() {
	return Object.create(null);
}
function y(t) {
	t.forEach(P);
}
function U(t) {
	return typeof t == 'function';
}
function mt(t, e) {
	return t != t ? e == e : t !== e || (t && typeof t == 'object') || typeof t == 'function';
}
let g;
function pt(t, e) {
	return g || (g = document.createElement('a')), (g.href = e), t === g.href;
}
function V(t) {
	return Object.keys(t).length === 0;
}
function D(t, ...e) {
	if (t == null) return N;
	const n = t.subscribe(...e);
	return n.unsubscribe ? () => n.unsubscribe() : n;
}
function yt(t) {
	let e;
	return D(t, (n) => (e = n))(), e;
}
function gt(t, e, n) {
	t.$$.on_destroy.push(D(e, n));
}
function bt(t, e, n, i) {
	if (t) {
		const r = G(t, e, n, i);
		return t[0](r);
	}
}
function G(t, e, n, i) {
	return t[1] && i ? K(n.ctx.slice(), t[1](i(e))) : n.ctx;
}
function xt(t, e, n, i) {
	if (t[2] && i) {
		const r = t[2](i(n));
		if (e.dirty === void 0) return r;
		if (typeof r == 'object') {
			const o = [],
				l = Math.max(e.dirty.length, r.length);
			for (let s = 0; s < l; s += 1) o[s] = e.dirty[s] | r[s];
			return o;
		}
		return e.dirty | r;
	}
	return e.dirty;
}
function kt(t, e, n, i, r, o) {
	if (r) {
		const l = G(e, n, i, o);
		t.p(l, r);
	}
}
function $t(t) {
	if (t.ctx.length > 32) {
		const e = [],
			n = t.ctx.length / 32;
		for (let i = 0; i < n; i++) e[i] = -1;
		return e;
	}
	return -1;
}
let w = !1;
function X() {
	w = !0;
}
function Y() {
	w = !1;
}
function Z(t, e, n, i) {
	for (; t < e; ) {
		const r = t + ((e - t) >> 1);
		n(r) <= i ? (t = r + 1) : (e = r);
	}
	return t;
}
function tt(t) {
	if (t.hydrate_init) return;
	t.hydrate_init = !0;
	let e = t.childNodes;
	if (t.nodeName === 'HEAD') {
		const c = [];
		for (let u = 0; u < e.length; u++) {
			const f = e[u];
			f.claim_order !== void 0 && c.push(f);
		}
		e = c;
	}
	const n = new Int32Array(e.length + 1),
		i = new Int32Array(e.length);
	n[0] = -1;
	let r = 0;
	for (let c = 0; c < e.length; c++) {
		const u = e[c].claim_order,
			f = (r > 0 && e[n[r]].claim_order <= u ? r + 1 : Z(1, r, (d) => e[n[d]].claim_order, u)) - 1;
		i[c] = n[f] + 1;
		const a = f + 1;
		(n[a] = c), (r = Math.max(a, r));
	}
	const o = [],
		l = [];
	let s = e.length - 1;
	for (let c = n[r] + 1; c != 0; c = i[c - 1]) {
		for (o.push(e[c - 1]); s >= c; s--) l.push(e[s]);
		s--;
	}
	for (; s >= 0; s--) l.push(e[s]);
	o.reverse(), l.sort((c, u) => c.claim_order - u.claim_order);
	for (let c = 0, u = 0; c < l.length; c++) {
		for (; u < o.length && l[c].claim_order >= o[u].claim_order; ) u++;
		const f = u < o.length ? o[u] : null;
		t.insertBefore(l[c], f);
	}
}
function et(t, e) {
	if (w) {
		for (
			tt(t),
				(t.actual_end_child === void 0 ||
					(t.actual_end_child !== null && t.actual_end_child.parentElement !== t)) &&
					(t.actual_end_child = t.firstChild);
			t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

		)
			t.actual_end_child = t.actual_end_child.nextSibling;
		e !== t.actual_end_child
			? (e.claim_order !== void 0 || e.parentNode !== t) && t.insertBefore(e, t.actual_end_child)
			: (t.actual_end_child = e.nextSibling);
	} else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e);
}
function nt(t, e, n) {
	t.insertBefore(e, n || null);
}
function it(t, e, n) {
	w && !n ? et(t, e) : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null);
}
function $(t) {
	t.parentNode.removeChild(t);
}
function wt(t, e) {
	for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function I(t) {
	return document.createElement(t);
}
function S(t) {
	return document.createTextNode(t);
}
function vt() {
	return S(' ');
}
function Et() {
	return S('');
}
function At(t, e, n, i) {
	return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function Tt(t, e, n) {
	n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function rt(t) {
	return Array.from(t.childNodes);
}
function z(t) {
	t.claim_info === void 0 && (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function F(t, e, n, i, r = !1) {
	z(t);
	const o = (() => {
		for (let l = t.claim_info.last_index; l < t.length; l++) {
			const s = t[l];
			if (e(s)) {
				const c = n(s);
				return c === void 0 ? t.splice(l, 1) : (t[l] = c), r || (t.claim_info.last_index = l), s;
			}
		}
		for (let l = t.claim_info.last_index - 1; l >= 0; l--) {
			const s = t[l];
			if (e(s)) {
				const c = n(s);
				return (
					c === void 0 ? t.splice(l, 1) : (t[l] = c),
					r ? c === void 0 && t.claim_info.last_index-- : (t.claim_info.last_index = l),
					s
				);
			}
		}
		return i();
	})();
	return (o.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), o;
}
function ct(t, e, n, i) {
	return F(
		t,
		(r) => r.nodeName === e,
		(r) => {
			const o = [];
			for (let l = 0; l < r.attributes.length; l++) {
				const s = r.attributes[l];
				n[s.name] || o.push(s.name);
			}
			o.forEach((l) => r.removeAttribute(l));
		},
		() => i(e)
	);
}
function Nt(t, e, n) {
	return ct(t, e, n, I);
}
function lt(t, e) {
	return F(
		t,
		(n) => n.nodeType === 3,
		(n) => {
			const i = '' + e;
			if (n.data.startsWith(i)) {
				if (n.data.length !== i.length) return n.splitText(i.length);
			} else n.data = i;
		},
		() => S(e),
		!0
	);
}
function St(t) {
	return lt(t, ' ');
}
function q(t, e, n) {
	for (let i = n; i < t.length; i += 1) {
		const r = t[i];
		if (r.nodeType === 8 && r.textContent.trim() === e) return i;
	}
	return t.length;
}
function jt(t) {
	const e = q(t, 'HTML_TAG_START', 0),
		n = q(t, 'HTML_TAG_END', e);
	if (e === n) return new L();
	z(t);
	const i = t.splice(e, n - e + 1);
	$(i[0]), $(i[i.length - 1]);
	const r = i.slice(1, i.length - 1);
	for (const o of r)
		(o.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1);
	return new L(r);
}
function Ct(t, e) {
	(e = '' + e), t.wholeText !== e && (t.data = e);
}
function Mt(t, e, n, i) {
	n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, i ? 'important' : '');
}
function Ht(t, e) {
	for (let n = 0; n < t.options.length; n += 1) {
		const i = t.options[n];
		if (i.__value === e) {
			i.selected = !0;
			return;
		}
	}
	t.selectedIndex = -1;
}
function qt(t) {
	const e = t.querySelector(':checked') || t.options[0];
	return e && e.__value;
}
function Lt(t, e = document.body) {
	return Array.from(e.querySelectorAll(t));
}
class st {
	constructor() {
		this.e = this.n = null;
	}
	c(e) {
		this.h(e);
	}
	m(e, n, i = null) {
		this.e || ((this.e = I(n.nodeName)), (this.t = n), this.c(e)), this.i(i);
	}
	h(e) {
		(this.e.innerHTML = e), (this.n = Array.from(this.e.childNodes));
	}
	i(e) {
		for (let n = 0; n < this.n.length; n += 1) nt(this.t, this.n[n], e);
	}
	p(e) {
		this.d(), this.h(e), this.i(this.a);
	}
	d() {
		this.n.forEach($);
	}
}
class L extends st {
	constructor(e) {
		super(), (this.e = this.n = null), (this.l = e);
	}
	c(e) {
		this.l ? (this.n = this.l) : super.c(e);
	}
	i(e) {
		for (let n = 0; n < this.n.length; n += 1) it(this.t, this.n[n], e);
	}
}
let p;
function _(t) {
	p = t;
}
function v() {
	if (!p) throw new Error('Function called outside component initialization');
	return p;
}
function Bt(t) {
	v().$$.on_mount.push(t);
}
function Ot(t) {
	v().$$.after_update.push(t);
}
function Pt(t, e) {
	v().$$.context.set(t, e);
}
const m = [],
	B = [],
	x = [],
	O = [],
	R = Promise.resolve();
let A = !1;
function W() {
	A || ((A = !0), R.then(j));
}
function Dt() {
	return W(), R;
}
function T(t) {
	x.push(t);
}
const E = new Set();
let b = 0;
function j() {
	const t = p;
	do {
		for (; b < m.length; ) {
			const e = m[b];
			b++, _(e), ut(e.$$);
		}
		for (_(null), m.length = 0, b = 0; B.length; ) B.pop()();
		for (let e = 0; e < x.length; e += 1) {
			const n = x[e];
			E.has(n) || (E.add(n), n());
		}
		x.length = 0;
	} while (m.length);
	for (; O.length; ) O.pop()();
	(A = !1), E.clear(), _(t);
}
function ut(t) {
	if (t.fragment !== null) {
		t.update(), y(t.before_update);
		const e = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(T);
	}
}
const k = new Set();
let h;
function ot() {
	h = { r: 0, c: [], p: h };
}
function at() {
	h.r || y(h.c), (h = h.p);
}
function J(t, e) {
	t && t.i && (k.delete(t), t.i(e));
}
function ft(t, e, n, i) {
	if (t && t.o) {
		if (k.has(t)) return;
		k.add(t),
			h.c.push(() => {
				k.delete(t), i && (n && t.d(1), i());
			}),
			t.o(e);
	}
}
function Gt(t, e) {
	const n = (e.token = {});
	function i(r, o, l, s) {
		if (e.token !== n) return;
		e.resolved = s;
		let c = e.ctx;
		l !== void 0 && ((c = c.slice()), (c[l] = s));
		const u = r && (e.current = r)(c);
		let f = !1;
		e.block &&
			(e.blocks
				? e.blocks.forEach((a, d) => {
						d !== o &&
							a &&
							(ot(),
							ft(a, 1, 1, () => {
								e.blocks[d] === a && (e.blocks[d] = null);
							}),
							at());
				  })
				: e.block.d(1),
			u.c(),
			J(u, 1),
			u.m(e.mount(), e.anchor),
			(f = !0)),
			(e.block = u),
			e.blocks && (e.blocks[o] = u),
			f && j();
	}
	if (Q(t)) {
		const r = v();
		if (
			(t.then(
				(o) => {
					_(r), i(e.then, 1, e.value, o), _(null);
				},
				(o) => {
					if ((_(r), i(e.catch, 2, e.error, o), _(null), !e.hasCatch)) throw o;
				}
			),
			e.current !== e.pending)
		)
			return i(e.pending, 0), !0;
	} else {
		if (e.current !== e.then) return i(e.then, 1, e.value, t), !0;
		e.resolved = t;
	}
}
function It(t, e, n) {
	const i = e.slice(),
		{ resolved: r } = t;
	t.current === t.then && (i[t.value] = r),
		t.current === t.catch && (i[t.error] = r),
		t.block.p(i, n);
}
function zt(t, e) {
	const n = {},
		i = {},
		r = { $$scope: 1 };
	let o = t.length;
	for (; o--; ) {
		const l = t[o],
			s = e[o];
		if (s) {
			for (const c in l) c in s || (i[c] = 1);
			for (const c in s) r[c] || ((n[c] = s[c]), (r[c] = 1));
			t[o] = s;
		} else for (const c in l) r[c] = 1;
	}
	for (const l in i) l in n || (n[l] = void 0);
	return n;
}
function Ft(t) {
	return typeof t == 'object' && t !== null ? t : {};
}
function Rt(t) {
	t && t.c();
}
function Wt(t, e) {
	t && t.l(e);
}
function _t(t, e, n, i) {
	const { fragment: r, on_mount: o, on_destroy: l, after_update: s } = t.$$;
	r && r.m(e, n),
		i ||
			T(() => {
				const c = o.map(P).filter(U);
				l ? l.push(...c) : y(c), (t.$$.on_mount = []);
			}),
		s.forEach(T);
}
function dt(t, e) {
	const n = t.$$;
	n.fragment !== null &&
		(y(n.on_destroy),
		n.fragment && n.fragment.d(e),
		(n.on_destroy = n.fragment = null),
		(n.ctx = []));
}
function ht(t, e) {
	t.$$.dirty[0] === -1 && (m.push(t), W(), t.$$.dirty.fill(0)),
		(t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Jt(t, e, n, i, r, o, l, s = [-1]) {
	const c = p;
	_(t);
	const u = (t.$$ = {
		fragment: null,
		ctx: null,
		props: o,
		update: N,
		not_equal: r,
		bound: H(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(e.context || (c ? c.$$.context : [])),
		callbacks: H(),
		dirty: s,
		skip_bound: !1,
		root: e.target || c.$$.root
	});
	l && l(u.root);
	let f = !1;
	if (
		((u.ctx = n
			? n(t, e.props || {}, (a, d, ...C) => {
					const M = C.length ? C[0] : d;
					return (
						u.ctx &&
							r(u.ctx[a], (u.ctx[a] = M)) &&
							(!u.skip_bound && u.bound[a] && u.bound[a](M), f && ht(t, a)),
						d
					);
			  })
			: []),
		u.update(),
		(f = !0),
		y(u.before_update),
		(u.fragment = i ? i(u.ctx) : !1),
		e.target)
	) {
		if (e.hydrate) {
			X();
			const a = rt(e.target);
			u.fragment && u.fragment.l(a), a.forEach($);
		} else u.fragment && u.fragment.c();
		e.intro && J(t.$$.fragment), _t(t, e.target, e.anchor, e.customElement), Y(), j();
	}
	_(c);
}
class Kt {
	$destroy() {
		dt(this, 1), (this.$destroy = N);
	}
	$on(e, n) {
		const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
		return (
			i.push(n),
			() => {
				const r = i.indexOf(n);
				r !== -1 && i.splice(r, 1);
			}
		);
	}
	$set(e) {
		this.$$set && !V(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
	}
}
export {
	Ft as A,
	dt as B,
	K as C,
	Dt as D,
	N as E,
	bt as F,
	kt as G,
	$t as H,
	xt as I,
	et as J,
	Lt as K,
	yt as L,
	gt as M,
	qt as N,
	Gt as O,
	T as P,
	Ht as Q,
	At as R,
	Kt as S,
	wt as T,
	It as U,
	L as V,
	jt as W,
	pt as X,
	rt as a,
	Tt as b,
	Nt as c,
	$ as d,
	I as e,
	Mt as f,
	it as g,
	lt as h,
	Jt as i,
	Ct as j,
	vt as k,
	Et as l,
	St as m,
	ot as n,
	ft as o,
	at as p,
	J as q,
	Pt as r,
	mt as s,
	S as t,
	Ot as u,
	Bt as v,
	Rt as w,
	Wt as x,
	_t as y,
	zt as z
};
