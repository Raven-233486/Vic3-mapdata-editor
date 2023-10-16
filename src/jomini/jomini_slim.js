/**
 * Minified by jsDelivr using Terser v5.10.0.
 * Original file: /npm/jomini@0.6.4/dist/es-slim/index_slim.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
let wasm;
const heap = new Array(32)
	.fill(void 0);
heap.push(void 0, null, !0, !1);
let heap_next = heap.length;

function addHeapObject(t) {
	heap_next === heap.length && heap.push(heap.length + 1);
	const e = heap_next;
	return heap_next = heap[e], heap[e] = t, e
}

function getObject(t) {
	return heap[t]
}

function dropObject(t) {
	t < 36 || (heap[t] = heap_next, heap_next = t)
}

function takeObject(t) {
	const e = getObject(t);
	return dropObject(t), e
}
let cachedTextDecoder = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;

function getUint8Memory0() {
	return null !== cachegetUint8Memory0 && cachegetUint8Memory0.buffer === wasm.memory.buffer || (cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer)), cachegetUint8Memory0
}

function getStringFromWasm0(t, e) {
	return cachedTextDecoder.decode(getUint8Memory0()
		.subarray(t, t + e))
}
let WASM_VECTOR_LEN = 0,
	cachedTextEncoder = new TextEncoder("utf-8");
const encodeString = "function" == typeof cachedTextEncoder.encodeInto ? function(t, e) {
	return cachedTextEncoder.encodeInto(t, e)
} : function(t, e) {
	const r = cachedTextEncoder.encode(t);
	return e.set(r), {
		read: t.length,
		written: r.length
	}
};

function passStringToWasm0(t, e, r) {
	if (void 0 === r) {
		const r = cachedTextEncoder.encode(t),
			n = e(r.length);
		return getUint8Memory0()
			.subarray(n, n + r.length)
			.set(r), WASM_VECTOR_LEN = r.length, n
	}
	let n = t.length,
		a = e(n);
	const i = getUint8Memory0();
	let _ = 0;
	for (; _ < n; _++) {
		const e = t.charCodeAt(_);
		if (e > 127) break;
		i[a + _] = e
	}
	if (_ !== n) {
		0 !== _ && (t = t.slice(_)), a = r(a, n, n = _ + 3 * t.length);
		const e = getUint8Memory0()
			.subarray(a + _, a + n);
		_ += encodeString(t, e)
			.written
	}
	return WASM_VECTOR_LEN = _, a
}

function isLikeNone(t) {
	return null == t
}
let cachegetInt32Memory0 = null;

function getInt32Memory0() {
	return null !== cachegetInt32Memory0 && cachegetInt32Memory0.buffer === wasm.memory.buffer || (cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer)), cachegetInt32Memory0
}

function passArray8ToWasm0(t, e) {
	const r = e(1 * t.length);
	return getUint8Memory0()
		.set(t, r / 1), WASM_VECTOR_LEN = t.length, r
}

function parse_text(t, e) {
	try {
		const _ = wasm.__wbindgen_add_to_stack_pointer(-16);
		var r = passArray8ToWasm0(t, wasm.__wbindgen_malloc),
			n = WASM_VECTOR_LEN;
		wasm.parse_text(_, r, n, addHeapObject(e));
		var a = getInt32Memory0()[_ / 4 + 0],
			i = getInt32Memory0()[_ / 4 + 1];
		if (getInt32Memory0()[_ / 4 + 2]) throw takeObject(i);
		return Query$1.__wrap(a)
	} finally {
		wasm.__wbindgen_add_to_stack_pointer(16)
	}
}

function write_text() {
	try {
		const r = wasm.__wbindgen_add_to_stack_pointer(-16);
		wasm.write_text(r);
		var t = getInt32Memory0()[r / 4 + 0],
			e = getInt32Memory0()[r / 4 + 1];
		if (getInt32Memory0()[r / 4 + 2]) throw takeObject(e);
		return WasmWriter.__wrap(t)
	} finally {
		wasm.__wbindgen_add_to_stack_pointer(16)
	}
}

function getArrayU8FromWasm0(t, e) {
	return getUint8Memory0()
		.subarray(t / 1, t / 1 + e)
}
const u32CvtShim = new Uint32Array(2),
	uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);
class Query$1 {
	static __wrap(t) {
		const e = Object.create(Query$1.prototype);
		return e.ptr = t, e
	}
	__destroy_into_raw() {
		const t = this.ptr;
		return this.ptr = 0, t
	}
	free() {
		const t = this.__destroy_into_raw();
		wasm.__wbg_query_free(t)
	}
	root() {
		try {
			const r = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.query_root(r, this.ptr);
			var t = getInt32Memory0()[r / 4 + 0],
				e = getInt32Memory0()[r / 4 + 1];
			if (getInt32Memory0()[r / 4 + 2]) throw takeObject(e);
			return takeObject(t)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	json(t, e) {
		try {
			const _ = wasm.__wbindgen_add_to_stack_pointer(-16);
			var r = passStringToWasm0(e, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
				n = WASM_VECTOR_LEN;
			wasm.query_json(_, this.ptr, t, r, n);
			var a = getInt32Memory0()[_ / 4 + 0],
				i = getInt32Memory0()[_ / 4 + 1];
			if (getInt32Memory0()[_ / 4 + 2]) throw takeObject(i);
			return takeObject(a)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	at(t) {
		try {
			const i = wasm.__wbindgen_add_to_stack_pointer(-16);
			var e = passStringToWasm0(t, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
				r = WASM_VECTOR_LEN;
			wasm.query_at(i, this.ptr, e, r);
			var n = getInt32Memory0()[i / 4 + 0],
				a = getInt32Memory0()[i / 4 + 1];
			if (getInt32Memory0()[i / 4 + 2]) throw takeObject(a);
			return takeObject(n)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
}
class WasmWriter {
	static __wrap(t) {
		const e = Object.create(WasmWriter.prototype);
		return e.ptr = t, e
	}
	__destroy_into_raw() {
		const t = this.ptr;
		return this.ptr = 0, t
	}
	free() {
		const t = this.__destroy_into_raw();
		wasm.__wbg_wasmwriter_free(t)
	}
	inner() {
		try {
			const n = this.__destroy_into_raw(),
				a = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_inner(a, n);
			var t = getInt32Memory0()[a / 4 + 0],
				e = getInt32Memory0()[a / 4 + 1],
				r = getArrayU8FromWasm0(t, e)
				.slice();
			return wasm.__wbindgen_free(t, 1 * e), r
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_object_start() {
		try {
			const e = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_write_object_start(e, this.ptr);
			var t = getInt32Memory0()[e / 4 + 0];
			if (getInt32Memory0()[e / 4 + 1]) throw takeObject(t)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_hidden_object_start() {
		try {
			const e = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_write_hidden_object_start(e, this.ptr);
			var t = getInt32Memory0()[e / 4 + 0];
			if (getInt32Memory0()[e / 4 + 1]) throw takeObject(t)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_array_start() {
		try {
			const e = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_write_array_start(e, this.ptr);
			var t = getInt32Memory0()[e / 4 + 0];
			if (getInt32Memory0()[e / 4 + 1]) throw takeObject(t)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_end() {
		try {
			const e = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_write_end(e, this.ptr);
			var t = getInt32Memory0()[e / 4 + 0];
			if (getInt32Memory0()[e / 4 + 1]) throw takeObject(t)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_bool(t) {
		try {
			const r = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_write_bool(r, this.ptr, t);
			var e = getInt32Memory0()[r / 4 + 0];
			if (getInt32Memory0()[r / 4 + 1]) throw takeObject(e)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_operator(t) {
		try {
			const a = wasm.__wbindgen_add_to_stack_pointer(-16);
			var e = passStringToWasm0(t, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
				r = WASM_VECTOR_LEN;
			wasm.wasmwriter_write_operator(a, this.ptr, e, r);
			var n = getInt32Memory0()[a / 4 + 0];
			if (getInt32Memory0()[a / 4 + 1]) throw takeObject(n)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_unquoted(t) {
		try {
			const a = wasm.__wbindgen_add_to_stack_pointer(-16);
			var e = passArray8ToWasm0(t, wasm.__wbindgen_malloc),
				r = WASM_VECTOR_LEN;
			wasm.wasmwriter_write_unquoted(a, this.ptr, e, r);
			var n = getInt32Memory0()[a / 4 + 0];
			if (getInt32Memory0()[a / 4 + 1]) throw takeObject(n)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_quoted(t) {
		try {
			const a = wasm.__wbindgen_add_to_stack_pointer(-16);
			var e = passArray8ToWasm0(t, wasm.__wbindgen_malloc),
				r = WASM_VECTOR_LEN;
			wasm.wasmwriter_write_quoted(a, this.ptr, e, r);
			var n = getInt32Memory0()[a / 4 + 0];
			if (getInt32Memory0()[a / 4 + 1]) throw takeObject(n)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_integer(t) {
		try {
			const r = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_write_integer(r, this.ptr, t);
			var e = getInt32Memory0()[r / 4 + 0];
			if (getInt32Memory0()[r / 4 + 1]) throw takeObject(e)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_u64(t) {
		try {
			const r = wasm.__wbindgen_add_to_stack_pointer(-16);
			uint64CvtShim[0] = t;
			const n = u32CvtShim[0],
				a = u32CvtShim[1];
			wasm.wasmwriter_write_u64(r, this.ptr, n, a);
			var e = getInt32Memory0()[r / 4 + 0];
			if (getInt32Memory0()[r / 4 + 1]) throw takeObject(e)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_f32(t) {
		try {
			const r = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_write_f32(r, this.ptr, t);
			var e = getInt32Memory0()[r / 4 + 0];
			if (getInt32Memory0()[r / 4 + 1]) throw takeObject(e)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_f64(t) {
		try {
			const r = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_write_f64(r, this.ptr, t);
			var e = getInt32Memory0()[r / 4 + 0];
			if (getInt32Memory0()[r / 4 + 1]) throw takeObject(e)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_header(t) {
		try {
			const a = wasm.__wbindgen_add_to_stack_pointer(-16);
			var e = passArray8ToWasm0(t, wasm.__wbindgen_malloc),
				r = WASM_VECTOR_LEN;
			wasm.wasmwriter_write_header(a, this.ptr, e, r);
			var n = getInt32Memory0()[a / 4 + 0];
			if (getInt32Memory0()[a / 4 + 1]) throw takeObject(n)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
	write_date(t, e) {
		try {
			const n = wasm.__wbindgen_add_to_stack_pointer(-16);
			wasm.wasmwriter_write_date(n, this.ptr, addHeapObject(t), e);
			var r = getInt32Memory0()[n / 4 + 0];
			if (getInt32Memory0()[n / 4 + 1]) throw takeObject(r)
		} finally {
			wasm.__wbindgen_add_to_stack_pointer(16)
		}
	}
}
async function load(t, e) {
	if ("function" == typeof Response && t instanceof Response) {
		if ("function" == typeof WebAssembly.instantiateStreaming) try {
			return await WebAssembly.instantiateStreaming(t, e)
		} catch (e) {
			if ("application/wasm" == t.headers.get("Content-Type")) throw e;
			console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e)
		}
		const r = await t.arrayBuffer();
		return await WebAssembly.instantiate(r, e)
	} {
		const r = await WebAssembly.instantiate(t, e);
		return r instanceof WebAssembly.Instance ? {
			instance: r,
			module: t
		} : r
	}
}
async function init(t) {
	void 0 === t && (t = new URL("jomini_js_bg.wasm", ""));
	const e = {
		wbg: {}
	};
	e.wbg.__wbindgen_number_new = function(t) {
		return addHeapObject(t)
	}, e.wbg.__wbindgen_object_drop_ref = function(t) {
		takeObject(t)
	}, e.wbg.__wbindgen_string_new = function(t, e) {
		return addHeapObject(getStringFromWasm0(t, e))
	}, e.wbg.__wbg_new_d347363404089e02 = function() {
		return addHeapObject(new Object)
	}, e.wbg.__wbg_set_2edfbeb79a838694 = function(t, e, r) {
		getObject(t)[takeObject(e)] = takeObject(r)
	}, e.wbg.__wbindgen_string_get = function(t, e) {
		const r = getObject(e);
		var n = "string" == typeof r ? r : void 0,
			a = isLikeNone(n) ? 0 : passStringToWasm0(n, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
			i = WASM_VECTOR_LEN;
		getInt32Memory0()[t / 4 + 1] = i, getInt32Memory0()[t / 4 + 0] = a
	}, e.wbg.__wbg_newwithlength_9c398a17849b31ce = function(t) {
		return addHeapObject(new Array(t >>> 0))
	}, e.wbg.__wbg_set_a42efa3c7f01c8b1 = function(t, e, r) {
		getObject(t)[e >>> 0] = takeObject(r)
	}, e.wbg.__wbg_getUTCDate_55257fc1fc289fe1 = function(t) {
		return getObject(t)
			.getUTCDate()
	}, e.wbg.__wbg_getUTCFullYear_ac803d30c74c4ae5 = function(t) {
		return getObject(t)
			.getUTCFullYear()
	}, e.wbg.__wbg_getUTCHours_02c89df88ffb68db = function(t) {
		return getObject(t)
			.getUTCHours()
	}, e.wbg.__wbg_getUTCMonth_8b342516cb9b0874 = function(t) {
		return getObject(t)
			.getUTCMonth()
	}, e.wbg.__wbg_new_48463f6bb84b48d4 = function(t) {
		return addHeapObject(new Date(getObject(t)))
	}, e.wbg.__wbg_setUTCDate_9ecb79642d5d8472 = function(t, e) {
		return getObject(t)
			.setUTCDate(e >>> 0)
	}, e.wbg.__wbg_setUTCHours_004eb7bca70e11c4 = function(t, e) {
		return getObject(t)
			.setUTCHours(e >>> 0)
	}, e.wbg.__wbg_UTC_b141535fc8e7fe7f = function(t, e) {
		return Date.UTC(t, e)
	}, e.wbg.__wbindgen_throw = function(t, e) {
		throw new Error(getStringFromWasm0(t, e))
	}, ("string" == typeof t || "function" == typeof Request && t instanceof Request || "function" == typeof URL && t instanceof URL) && (t = fetch(t));
	const {
		instance: r,
		module: n
	} = await load(await t, e);
	return wasm = r.exports, init.__wbindgen_wasm_module = n, wasm
}
let wasmInit, initialized;
const encoder = new TextEncoder;
class Jomini {
	constructor() {}
	parseText(t, e, r) {
		var n;
		if ("string" == typeof t) {
			var a = encoder.encode(t);
			e = Object.assign(Object.assign({}, e), {
				encoding: "utf8"
			})
		} else a = t;
		const i = parse_text(a, null !== (n = null == e ? void 0 : e.encoding) && void 0 !== n ? n : "utf8"),
			_ = new Query(i);
		if (void 0 === r) {
			const t = _.root();
			return i.free(), t
		} {
			const t = r(_);
			return i.free(), t
		}
	}
	write(t) {
		let e = write_text();
		return t(new Writer(e)), e.inner()
	}
}
Jomini.initialize = async t => {
	var e;
	if (void 0 === initialized) {
		const r = null !== (e = null == t ? void 0 : t.wasm) && void 0 !== e ? e : wasmInit();
		initialized = init(r)
			.then((() => {}))
	}
	return await initialized, new Jomini
}, Jomini.resetModule = () => {
	initialized = void 0
};
class Query {
	constructor(t) {
		this.query = t
	}
	root() {
		return this.query.root()
	}
	at(t) {
		return this.query.at(t)
	}
	json(t) {
		return this.query.json((null == t ? void 0 : t.pretty) || !1, (null == t ? void 0 : t.disambiguate) || "none")
	}
}
class Writer {
	constructor(t) {
		this.writer = t
	}
	write_object_start() {
		this.writer.write_object_start()
	}
	write_hidden_object_start() {
		this.writer.write_hidden_object_start()
	}
	write_array_start() {
		this.writer.write_array_start()
	}
	write_end() {
		this.writer.write_end()
	}
	write_bool(t) {
		this.writer.write_bool(t)
	}
	write_operator(t) {
		this.writer.write_operator(t)
	}
	write_unquoted(t) {
		"string" == typeof t ? this.writer.write_unquoted(encoder.encode(t)) : this.writer.write_unquoted(t)
	}
	write_quoted(t) {
		"string" == typeof t ? this.writer.write_quoted(encoder.encode(t)) : this.writer.write_quoted(t)
	}
	write_header(t) {
		"string" == typeof t ? this.writer.write_header(encoder.encode(t)) : this.writer.write_header(t)
	}
	write_integer(t) {
		this.writer.write_integer(t)
	}
	write_u64(t) {
		this.writer.write_u64(t)
	}
	write_f32(t) {
		this.writer.write_f32(t)
	}
	write_f64(t) {
		this.writer.write_f64(t)
	}
	write_date(t, e) {
		this.writer.write_date(t, (null == e ? void 0 : e.hour) || !1)
	}
}

function toArray(t, e) {
	const r = e.split(".");
	if (1 == r.length) !Array.isArray(t[e]) && Object.prototype.hasOwnProperty.call(t, e) && (t[e] = [t[e]]);
	else if (Object.prototype.hasOwnProperty.call(t, r[0]))
		if (Array.isArray(t[r[0]])) {
			const n = t[r[0]];
			for (let t = 0; t < n.length; t++) "object" == typeof n[t] && toArray(n[t], e.substring(r[0].length + 1))
		} else "object" == typeof t[r[0]] && toArray(t[r[0]], e.substring(r[0].length + 1))
}
export {
	Jomini,
	Query,
	toArray
};
//# sourceMappingURL=/sm/e42e123ec610d727d24f21a618112d11d8220adf769002fcbd683cc4624cbda5.map