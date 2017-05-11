
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

var _elm_lang$core$Random$onSelfMsg = F3(
	function (_p1, _p0, seed) {
		return _elm_lang$core$Task$succeed(seed);
	});
var _elm_lang$core$Random$magicNum8 = 2147483562;
var _elm_lang$core$Random$range = function (_p2) {
	return {ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Random$magicNum8};
};
var _elm_lang$core$Random$magicNum7 = 2147483399;
var _elm_lang$core$Random$magicNum6 = 2147483563;
var _elm_lang$core$Random$magicNum5 = 3791;
var _elm_lang$core$Random$magicNum4 = 40692;
var _elm_lang$core$Random$magicNum3 = 52774;
var _elm_lang$core$Random$magicNum2 = 12211;
var _elm_lang$core$Random$magicNum1 = 53668;
var _elm_lang$core$Random$magicNum0 = 40014;
var _elm_lang$core$Random$step = F2(
	function (_p3, seed) {
		var _p4 = _p3;
		return _p4._0(seed);
	});
var _elm_lang$core$Random$onEffects = F3(
	function (router, commands, seed) {
		var _p5 = commands;
		if (_p5.ctor === '[]') {
			return _elm_lang$core$Task$succeed(seed);
		} else {
			var _p6 = A2(_elm_lang$core$Random$step, _p5._0._0, seed);
			var value = _p6._0;
			var newSeed = _p6._1;
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p7) {
					return A3(_elm_lang$core$Random$onEffects, router, _p5._1, newSeed);
				},
				A2(_elm_lang$core$Platform$sendToApp, router, value));
		}
	});
var _elm_lang$core$Random$listHelp = F4(
	function (list, n, generate, seed) {
		listHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 1) < 0) {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$reverse(list),
					_1: seed
				};
			} else {
				var _p8 = generate(seed);
				var value = _p8._0;
				var newSeed = _p8._1;
				var _v2 = {ctor: '::', _0: value, _1: list},
					_v3 = n - 1,
					_v4 = generate,
					_v5 = newSeed;
				list = _v2;
				n = _v3;
				generate = _v4;
				seed = _v5;
				continue listHelp;
			}
		}
	});
var _elm_lang$core$Random$minInt = -2147483648;
var _elm_lang$core$Random$maxInt = 2147483647;
var _elm_lang$core$Random$iLogBase = F2(
	function (b, i) {
		return (_elm_lang$core$Native_Utils.cmp(i, b) < 0) ? 1 : (1 + A2(_elm_lang$core$Random$iLogBase, b, (i / b) | 0));
	});
var _elm_lang$core$Random$command = _elm_lang$core$Native_Platform.leaf('Random');
var _elm_lang$core$Random$Generator = function (a) {
	return {ctor: 'Generator', _0: a};
};
var _elm_lang$core$Random$list = F2(
	function (n, _p9) {
		var _p10 = _p9;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				return A4(
					_elm_lang$core$Random$listHelp,
					{ctor: '[]'},
					n,
					_p10._0,
					seed);
			});
	});
var _elm_lang$core$Random$map = F2(
	function (func, _p11) {
		var _p12 = _p11;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p13 = _p12._0(seed0);
				var a = _p13._0;
				var seed1 = _p13._1;
				return {
					ctor: '_Tuple2',
					_0: func(a),
					_1: seed1
				};
			});
	});
var _elm_lang$core$Random$map2 = F3(
	function (func, _p15, _p14) {
		var _p16 = _p15;
		var _p17 = _p14;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p18 = _p16._0(seed0);
				var a = _p18._0;
				var seed1 = _p18._1;
				var _p19 = _p17._0(seed1);
				var b = _p19._0;
				var seed2 = _p19._1;
				return {
					ctor: '_Tuple2',
					_0: A2(func, a, b),
					_1: seed2
				};
			});
	});
var _elm_lang$core$Random$pair = F2(
	function (genA, genB) {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			genA,
			genB);
	});
var _elm_lang$core$Random$map3 = F4(
	function (func, _p22, _p21, _p20) {
		var _p23 = _p22;
		var _p24 = _p21;
		var _p25 = _p20;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p26 = _p23._0(seed0);
				var a = _p26._0;
				var seed1 = _p26._1;
				var _p27 = _p24._0(seed1);
				var b = _p27._0;
				var seed2 = _p27._1;
				var _p28 = _p25._0(seed2);
				var c = _p28._0;
				var seed3 = _p28._1;
				return {
					ctor: '_Tuple2',
					_0: A3(func, a, b, c),
					_1: seed3
				};
			});
	});
var _elm_lang$core$Random$map4 = F5(
	function (func, _p32, _p31, _p30, _p29) {
		var _p33 = _p32;
		var _p34 = _p31;
		var _p35 = _p30;
		var _p36 = _p29;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p37 = _p33._0(seed0);
				var a = _p37._0;
				var seed1 = _p37._1;
				var _p38 = _p34._0(seed1);
				var b = _p38._0;
				var seed2 = _p38._1;
				var _p39 = _p35._0(seed2);
				var c = _p39._0;
				var seed3 = _p39._1;
				var _p40 = _p36._0(seed3);
				var d = _p40._0;
				var seed4 = _p40._1;
				return {
					ctor: '_Tuple2',
					_0: A4(func, a, b, c, d),
					_1: seed4
				};
			});
	});
var _elm_lang$core$Random$map5 = F6(
	function (func, _p45, _p44, _p43, _p42, _p41) {
		var _p46 = _p45;
		var _p47 = _p44;
		var _p48 = _p43;
		var _p49 = _p42;
		var _p50 = _p41;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p51 = _p46._0(seed0);
				var a = _p51._0;
				var seed1 = _p51._1;
				var _p52 = _p47._0(seed1);
				var b = _p52._0;
				var seed2 = _p52._1;
				var _p53 = _p48._0(seed2);
				var c = _p53._0;
				var seed3 = _p53._1;
				var _p54 = _p49._0(seed3);
				var d = _p54._0;
				var seed4 = _p54._1;
				var _p55 = _p50._0(seed4);
				var e = _p55._0;
				var seed5 = _p55._1;
				return {
					ctor: '_Tuple2',
					_0: A5(func, a, b, c, d, e),
					_1: seed5
				};
			});
	});
var _elm_lang$core$Random$andThen = F2(
	function (callback, _p56) {
		var _p57 = _p56;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p58 = _p57._0(seed);
				var result = _p58._0;
				var newSeed = _p58._1;
				var _p59 = callback(result);
				var genB = _p59._0;
				return genB(newSeed);
			});
	});
var _elm_lang$core$Random$State = F2(
	function (a, b) {
		return {ctor: 'State', _0: a, _1: b};
	});
var _elm_lang$core$Random$initState = function (seed) {
	var s = A2(_elm_lang$core$Basics$max, seed, 0 - seed);
	var q = (s / (_elm_lang$core$Random$magicNum6 - 1)) | 0;
	var s2 = A2(_elm_lang$core$Basics_ops['%'], q, _elm_lang$core$Random$magicNum7 - 1);
	var s1 = A2(_elm_lang$core$Basics_ops['%'], s, _elm_lang$core$Random$magicNum6 - 1);
	return A2(_elm_lang$core$Random$State, s1 + 1, s2 + 1);
};
var _elm_lang$core$Random$next = function (_p60) {
	var _p61 = _p60;
	var _p63 = _p61._1;
	var _p62 = _p61._0;
	var k2 = (_p63 / _elm_lang$core$Random$magicNum3) | 0;
	var rawState2 = (_elm_lang$core$Random$magicNum4 * (_p63 - (k2 * _elm_lang$core$Random$magicNum3))) - (k2 * _elm_lang$core$Random$magicNum5);
	var newState2 = (_elm_lang$core$Native_Utils.cmp(rawState2, 0) < 0) ? (rawState2 + _elm_lang$core$Random$magicNum7) : rawState2;
	var k1 = (_p62 / _elm_lang$core$Random$magicNum1) | 0;
	var rawState1 = (_elm_lang$core$Random$magicNum0 * (_p62 - (k1 * _elm_lang$core$Random$magicNum1))) - (k1 * _elm_lang$core$Random$magicNum2);
	var newState1 = (_elm_lang$core$Native_Utils.cmp(rawState1, 0) < 0) ? (rawState1 + _elm_lang$core$Random$magicNum6) : rawState1;
	var z = newState1 - newState2;
	var newZ = (_elm_lang$core$Native_Utils.cmp(z, 1) < 0) ? (z + _elm_lang$core$Random$magicNum8) : z;
	return {
		ctor: '_Tuple2',
		_0: newZ,
		_1: A2(_elm_lang$core$Random$State, newState1, newState2)
	};
};
var _elm_lang$core$Random$split = function (_p64) {
	var _p65 = _p64;
	var _p68 = _p65._1;
	var _p67 = _p65._0;
	var _p66 = _elm_lang$core$Tuple$second(
		_elm_lang$core$Random$next(_p65));
	var t1 = _p66._0;
	var t2 = _p66._1;
	var new_s2 = _elm_lang$core$Native_Utils.eq(_p68, 1) ? (_elm_lang$core$Random$magicNum7 - 1) : (_p68 - 1);
	var new_s1 = _elm_lang$core$Native_Utils.eq(_p67, _elm_lang$core$Random$magicNum6 - 1) ? 1 : (_p67 + 1);
	return {
		ctor: '_Tuple2',
		_0: A2(_elm_lang$core$Random$State, new_s1, t2),
		_1: A2(_elm_lang$core$Random$State, t1, new_s2)
	};
};
var _elm_lang$core$Random$Seed = function (a) {
	return {ctor: 'Seed', _0: a};
};
var _elm_lang$core$Random$int = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (_p69) {
				var _p70 = _p69;
				var _p75 = _p70._0;
				var base = 2147483561;
				var f = F3(
					function (n, acc, state) {
						f:
						while (true) {
							var _p71 = n;
							if (_p71 === 0) {
								return {ctor: '_Tuple2', _0: acc, _1: state};
							} else {
								var _p72 = _p75.next(state);
								var x = _p72._0;
								var nextState = _p72._1;
								var _v27 = n - 1,
									_v28 = x + (acc * base),
									_v29 = nextState;
								n = _v27;
								acc = _v28;
								state = _v29;
								continue f;
							}
						}
					});
				var _p73 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p73._0;
				var hi = _p73._1;
				var k = (hi - lo) + 1;
				var n = A2(_elm_lang$core$Random$iLogBase, base, k);
				var _p74 = A3(f, n, 1, _p75.state);
				var v = _p74._0;
				var nextState = _p74._1;
				return {
					ctor: '_Tuple2',
					_0: lo + A2(_elm_lang$core$Basics_ops['%'], v, k),
					_1: _elm_lang$core$Random$Seed(
						_elm_lang$core$Native_Utils.update(
							_p75,
							{state: nextState}))
				};
			});
	});
var _elm_lang$core$Random$bool = A2(
	_elm_lang$core$Random$map,
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		})(1),
	A2(_elm_lang$core$Random$int, 0, 1));
var _elm_lang$core$Random$float = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p76 = A2(
					_elm_lang$core$Random$step,
					A2(_elm_lang$core$Random$int, _elm_lang$core$Random$minInt, _elm_lang$core$Random$maxInt),
					seed);
				var number = _p76._0;
				var newSeed = _p76._1;
				var negativeOneToOne = _elm_lang$core$Basics$toFloat(number) / _elm_lang$core$Basics$toFloat(_elm_lang$core$Random$maxInt - _elm_lang$core$Random$minInt);
				var _p77 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p77._0;
				var hi = _p77._1;
				var scaled = ((lo + hi) / 2) + ((hi - lo) * negativeOneToOne);
				return {ctor: '_Tuple2', _0: scaled, _1: newSeed};
			});
	});
var _elm_lang$core$Random$initialSeed = function (n) {
	return _elm_lang$core$Random$Seed(
		{
			state: _elm_lang$core$Random$initState(n),
			next: _elm_lang$core$Random$next,
			split: _elm_lang$core$Random$split,
			range: _elm_lang$core$Random$range
		});
};
var _elm_lang$core$Random$init = A2(
	_elm_lang$core$Task$andThen,
	function (t) {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Random$initialSeed(
				_elm_lang$core$Basics$round(t)));
	},
	_elm_lang$core$Time$now);
var _elm_lang$core$Random$Generate = function (a) {
	return {ctor: 'Generate', _0: a};
};
var _elm_lang$core$Random$generate = F2(
	function (tagger, generator) {
		return _elm_lang$core$Random$command(
			_elm_lang$core$Random$Generate(
				A2(_elm_lang$core$Random$map, tagger, generator)));
	});
var _elm_lang$core$Random$cmdMap = F2(
	function (func, _p78) {
		var _p79 = _p78;
		return _elm_lang$core$Random$Generate(
			A2(_elm_lang$core$Random$map, func, _p79._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Random'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Random$init, onEffects: _elm_lang$core$Random$onEffects, onSelfMsg: _elm_lang$core$Random$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Random$cmdMap};

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _mgold$elm_nonempty_list$List_Nonempty$foldl1 = F2(
	function (f, _p0) {
		var _p1 = _p0;
		return A3(_elm_lang$core$List$foldl, f, _p1._0, _p1._1);
	});
var _mgold$elm_nonempty_list$List_Nonempty$foldl = F3(
	function (f, b, _p2) {
		var _p3 = _p2;
		return A3(
			_elm_lang$core$List$foldl,
			f,
			b,
			{ctor: '::', _0: _p3._0, _1: _p3._1});
	});
var _mgold$elm_nonempty_list$List_Nonempty$any = F2(
	function (f, _p4) {
		var _p5 = _p4;
		return f(_p5._0) || A2(_elm_lang$core$List$any, f, _p5._1);
	});
var _mgold$elm_nonempty_list$List_Nonempty$all = F2(
	function (f, _p6) {
		var _p7 = _p6;
		return f(_p7._0) && A2(_elm_lang$core$List$all, f, _p7._1);
	});
var _mgold$elm_nonempty_list$List_Nonempty$member = F2(
	function (y, _p8) {
		var _p9 = _p8;
		return _elm_lang$core$Native_Utils.eq(_p9._0, y) || A2(_elm_lang$core$List$member, y, _p9._1);
	});
var _mgold$elm_nonempty_list$List_Nonempty$length = function (_p10) {
	var _p11 = _p10;
	return _elm_lang$core$List$length(_p11._1) + 1;
};
var _mgold$elm_nonempty_list$List_Nonempty$isSingleton = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$List$isEmpty(_p13._1);
};
var _mgold$elm_nonempty_list$List_Nonempty$get = F2(
	function (i, _p14) {
		var _p15 = _p14;
		var find = F2(
			function (k, ys) {
				find:
				while (true) {
					var _p16 = ys;
					if (_p16.ctor === '[]') {
						return _elm_lang$core$Native_Utils.crashCase(
							'List.Nonempty',
							{
								start: {line: 104, column: 13},
								end: {line: 112, column: 40}
							},
							_p16)('This can\'t happen: attempted to take value at safe index from empty list');
					} else {
						if (_elm_lang$core$Native_Utils.eq(k, 0)) {
							return _p16._0;
						} else {
							var _v9 = k - 1,
								_v10 = _p16._1;
							k = _v9;
							ys = _v10;
							continue find;
						}
					}
				}
			});
		var j = A2(
			_elm_lang$core$Basics_ops['%'],
			i,
			_mgold$elm_nonempty_list$List_Nonempty$length(_p15));
		return _elm_lang$core$Native_Utils.eq(j, 0) ? _p15._0 : A2(find, j - 1, _p15._1);
	});
var _mgold$elm_nonempty_list$List_Nonempty$sample = function (nonempty) {
	return A2(
		_elm_lang$core$Random$map,
		function (i) {
			return A2(_mgold$elm_nonempty_list$List_Nonempty$get, i, nonempty);
		},
		A2(
			_elm_lang$core$Random$int,
			0,
			_mgold$elm_nonempty_list$List_Nonempty$length(nonempty) - 1));
};
var _mgold$elm_nonempty_list$List_Nonempty$toList = function (_p18) {
	var _p19 = _p18;
	return {ctor: '::', _0: _p19._0, _1: _p19._1};
};
var _mgold$elm_nonempty_list$List_Nonempty$tail = function (_p20) {
	var _p21 = _p20;
	return _p21._1;
};
var _mgold$elm_nonempty_list$List_Nonempty$head = function (_p22) {
	var _p23 = _p22;
	return _p23._0;
};
var _mgold$elm_nonempty_list$List_Nonempty$Nonempty = F2(
	function (a, b) {
		return {ctor: 'Nonempty', _0: a, _1: b};
	});
var _mgold$elm_nonempty_list$List_Nonempty$fromElement = function (x) {
	return A2(
		_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
		x,
		{ctor: '[]'});
};
var _mgold$elm_nonempty_list$List_Nonempty$fromList = function (ys) {
	var _p24 = ys;
	if (_p24.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, _p24._0, _p24._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _mgold$elm_nonempty_list$List_Nonempty$cons = F2(
	function (y, _p25) {
		var _p26 = _p25;
		return A2(
			_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
			y,
			{ctor: '::', _0: _p26._0, _1: _p26._1});
	});
var _mgold$elm_nonempty_list$List_Nonempty_ops = _mgold$elm_nonempty_list$List_Nonempty_ops || {};
_mgold$elm_nonempty_list$List_Nonempty_ops[':::'] = _mgold$elm_nonempty_list$List_Nonempty$cons;
var _mgold$elm_nonempty_list$List_Nonempty$append = F2(
	function (_p28, _p27) {
		var _p29 = _p28;
		var _p30 = _p27;
		return A2(
			_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
			_p29._0,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p29._1,
				{ctor: '::', _0: _p30._0, _1: _p30._1}));
	});
var _mgold$elm_nonempty_list$List_Nonempty$pop = function (_p31) {
	var _p32 = _p31;
	var _p34 = _p32._1;
	var _p33 = _p34;
	if (_p33.ctor === '[]') {
		return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, _p32._0, _p34);
	} else {
		return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, _p33._0, _p33._1);
	}
};
var _mgold$elm_nonempty_list$List_Nonempty$reverse = function (_p35) {
	var _p36 = _p35;
	var revapp = function (_p37) {
		revapp:
		while (true) {
			var _p38 = _p37;
			var _p41 = _p38._0;
			var _p40 = _p38._1;
			var _p39 = _p38._2;
			if (_p39.ctor === '[]') {
				return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, _p40, _p41);
			} else {
				var _v23 = {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: _p40, _1: _p41},
					_1: _p39._0,
					_2: _p39._1
				};
				_p37 = _v23;
				continue revapp;
			}
		}
	};
	return revapp(
		{
			ctor: '_Tuple3',
			_0: {ctor: '[]'},
			_1: _p36._0,
			_2: _p36._1
		});
};
var _mgold$elm_nonempty_list$List_Nonempty$concat = function (_p42) {
	var _p43 = _p42;
	var _p44 = _p43._0;
	var tl = A2(
		_elm_lang$core$Basics_ops['++'],
		_mgold$elm_nonempty_list$List_Nonempty$tail(_p44),
		_elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, _mgold$elm_nonempty_list$List_Nonempty$toList, _p43._1)));
	var hd = _mgold$elm_nonempty_list$List_Nonempty$head(_p44);
	return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, hd, tl);
};
var _mgold$elm_nonempty_list$List_Nonempty$replaceHead = F2(
	function (y, _p45) {
		var _p46 = _p45;
		return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, y, _p46._1);
	});
var _mgold$elm_nonempty_list$List_Nonempty$replaceTail = F2(
	function (ys, _p47) {
		var _p48 = _p47;
		return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, _p48._0, ys);
	});
var _mgold$elm_nonempty_list$List_Nonempty$dropTail = function (_p49) {
	var _p50 = _p49;
	return A2(
		_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
		_p50._0,
		{ctor: '[]'});
};
var _mgold$elm_nonempty_list$List_Nonempty$map = F2(
	function (f, _p51) {
		var _p52 = _p51;
		return A2(
			_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
			f(_p52._0),
			A2(_elm_lang$core$List$map, f, _p52._1));
	});
var _mgold$elm_nonempty_list$List_Nonempty$concatMap = F2(
	function (f, xs) {
		return _mgold$elm_nonempty_list$List_Nonempty$concat(
			A2(_mgold$elm_nonempty_list$List_Nonempty$map, f, xs));
	});
var _mgold$elm_nonempty_list$List_Nonempty$map2 = F3(
	function (f, _p54, _p53) {
		var _p55 = _p54;
		var _p56 = _p53;
		return A2(
			_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
			A2(f, _p55._0, _p56._0),
			A3(_elm_lang$core$List$map2, f, _p55._1, _p56._1));
	});
var _mgold$elm_nonempty_list$List_Nonempty$andMap = _mgold$elm_nonempty_list$List_Nonempty$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _mgold$elm_nonempty_list$List_Nonempty$indexedMap = F2(
	function (f, _p57) {
		var _p58 = _p57;
		var wrapped = F2(
			function (i, d) {
				return A2(f, i + 1, d);
			});
		return A2(
			_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
			A2(f, 0, _p58._0),
			A2(_elm_lang$core$List$indexedMap, wrapped, _p58._1));
	});
var _mgold$elm_nonempty_list$List_Nonempty$filter = F3(
	function (p, d, _p59) {
		var _p60 = _p59;
		var _p63 = _p60._1;
		var _p62 = _p60._0;
		if (p(_p62)) {
			return A2(
				_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
				_p62,
				A2(_elm_lang$core$List$filter, p, _p63));
		} else {
			var _p61 = A2(_elm_lang$core$List$filter, p, _p63);
			if (_p61.ctor === '[]') {
				return A2(
					_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
					d,
					{ctor: '[]'});
			} else {
				return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, _p61._0, _p61._1);
			}
		}
	});
var _mgold$elm_nonempty_list$List_Nonempty$sort = function (_p64) {
	var _p65 = _p64;
	var _p66 = _elm_lang$core$List$sort(
		{ctor: '::', _0: _p65._0, _1: _p65._1});
	if (_p66.ctor === '::') {
		return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, _p66._0, _p66._1);
	} else {
		return _elm_lang$core$Native_Utils.crashCase(
			'List.Nonempty',
			{
				start: {line: 331, column: 5},
				end: {line: 336, column: 92}
			},
			_p66)('This can\'t happen: sorting a nonempty list returned an empty list');
	}
};
var _mgold$elm_nonempty_list$List_Nonempty$sortBy = F2(
	function (f, _p68) {
		var _p69 = _p68;
		var _p70 = A2(
			_elm_lang$core$List$sortBy,
			f,
			{ctor: '::', _0: _p69._0, _1: _p69._1});
		if (_p70.ctor === '::') {
			return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, _p70._0, _p70._1);
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'List.Nonempty',
				{
					start: {line: 343, column: 5},
					end: {line: 348, column: 94}
				},
				_p70)('This can\'t happen: sortBying a nonempty list returned an empty list');
		}
	});
var _mgold$elm_nonempty_list$List_Nonempty$sortWith = F2(
	function (f, _p72) {
		var _p73 = _p72;
		var _p74 = A2(
			_elm_lang$core$List$sortWith,
			f,
			{ctor: '::', _0: _p73._0, _1: _p73._1});
		if (_p74.ctor === '::') {
			return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, _p74._0, _p74._1);
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'List.Nonempty',
				{
					start: {line: 355, column: 5},
					end: {line: 360, column: 96}
				},
				_p74)('This can\'t happen: sortWithing a nonempty list returned an empty list');
		}
	});
var _mgold$elm_nonempty_list$List_Nonempty$dedup = function (_p76) {
	var _p77 = _p76;
	var dedupe = F3(
		function (prev, done, next) {
			dedupe:
			while (true) {
				var _p78 = next;
				if (_p78.ctor === '[]') {
					return A2(_mgold$elm_nonempty_list$List_Nonempty$Nonempty, prev, done);
				} else {
					var _p80 = _p78._1;
					var _p79 = _p78._0;
					if (_elm_lang$core$Native_Utils.eq(_p79, prev)) {
						var _v42 = prev,
							_v43 = done,
							_v44 = _p80;
						prev = _v42;
						done = _v43;
						next = _v44;
						continue dedupe;
					} else {
						var _v45 = _p79,
							_v46 = {ctor: '::', _0: prev, _1: done},
							_v47 = _p80;
						prev = _v45;
						done = _v46;
						next = _v47;
						continue dedupe;
					}
				}
			}
		});
	return _mgold$elm_nonempty_list$List_Nonempty$reverse(
		A3(
			dedupe,
			_p77._0,
			{ctor: '[]'},
			_p77._1));
};
var _mgold$elm_nonempty_list$List_Nonempty$uniq = function (_p81) {
	var _p82 = _p81;
	var _p86 = _p82._0;
	var unique = F3(
		function (seen, done, next) {
			unique:
			while (true) {
				var _p83 = next;
				if (_p83.ctor === '[]') {
					return done;
				} else {
					var _p85 = _p83._1;
					var _p84 = _p83._0;
					if (A2(_elm_lang$core$List$member, _p84, seen)) {
						var _v50 = seen,
							_v51 = done,
							_v52 = _p85;
						seen = _v50;
						done = _v51;
						next = _v52;
						continue unique;
					} else {
						var _v53 = {ctor: '::', _0: _p84, _1: seen},
							_v54 = A2(_mgold$elm_nonempty_list$List_Nonempty_ops[':::'], _p84, done),
							_v55 = _p85;
						seen = _v53;
						done = _v54;
						next = _v55;
						continue unique;
					}
				}
			}
		});
	return _mgold$elm_nonempty_list$List_Nonempty$reverse(
		A3(
			unique,
			{
				ctor: '::',
				_0: _p86,
				_1: {ctor: '[]'}
			},
			A2(
				_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
				_p86,
				{ctor: '[]'}),
			_p82._1));
};
var _mgold$elm_nonempty_list$List_Nonempty$scanl = F3(
	function (f, b, _p87) {
		var _p88 = _p87;
		return A2(
			_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
			b,
			A3(
				_elm_lang$core$List$scanl,
				f,
				A2(f, _p88._0, b),
				_p88._1));
	});
var _mgold$elm_nonempty_list$List_Nonempty$scanl1 = F2(
	function (f, _p89) {
		var _p90 = _p89;
		var _p92 = _p90._0;
		var _p91 = _p90._1;
		if (_p91.ctor === '[]') {
			return A2(
				_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
				_p92,
				{ctor: '[]'});
		} else {
			return A2(
				_mgold$elm_nonempty_list$List_Nonempty$Nonempty,
				_p92,
				A3(
					_elm_lang$core$List$scanl,
					f,
					A2(f, _p91._0, _p92),
					_p91._1));
		}
	});

var _ckoster22$elm_genetic$NonemptyHelper$constructNonemptyFromHead = F3(
	function (thing, size, _p0) {
		var _p1 = _p0;
		var headList = _mgold$elm_nonempty_list$List_Nonempty$fromElement(thing);
		var entireList = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (item, nonemptyList) {
					return A2(_mgold$elm_nonempty_list$List_Nonempty$cons, item, nonemptyList);
				}),
			headList,
			_p1._0);
		return {ctor: '_Tuple2', _0: entireList, _1: _p1._1};
	});
var _ckoster22$elm_genetic$NonemptyHelper$randomNonemptyList = F3(
	function (size, seed, generator) {
		var _p2 = A2(_elm_lang$core$Random$step, generator, seed);
		var head = _p2._0;
		var seed2 = _p2._1;
		return A3(
			_ckoster22$elm_genetic$NonemptyHelper$constructNonemptyFromHead,
			head,
			size,
			A2(
				_elm_lang$core$Random$step,
				A2(_elm_lang$core$Random$list, size - 1, generator),
				seed2));
	});

var _ckoster22$elm_genetic$Genetic$population_size = 20;
var _ckoster22$elm_genetic$Genetic$half_population_size = _elm_lang$core$Basics$round(
	_elm_lang$core$Basics$toFloat(_ckoster22$elm_genetic$Genetic$population_size) / 2);
var _ckoster22$elm_genetic$Genetic$Organism = F2(
	function (a, b) {
		return {dna: a, points: b};
	});
var _ckoster22$elm_genetic$Genetic$generateInitialPopulation = function (options) {
	return A3(
		_ckoster22$elm_genetic$NonemptyHelper$randomNonemptyList,
		_ckoster22$elm_genetic$Genetic$population_size,
		options.initialSeed,
		A2(
			_elm_lang$core$Random$map,
			function (asciiCodes) {
				return A2(
					_ckoster22$elm_genetic$Genetic$Organism,
					asciiCodes,
					options.evaluateOrganism(asciiCodes));
			},
			options.randomDnaGenerator));
};
var _ckoster22$elm_genetic$Genetic$produceChild = F4(
	function (options, parent1, parent2, seed) {
		var _p0 = A2(_elm_lang$core$Random$step, _elm_lang$core$Random$bool, seed);
		var dna1IsFirst = _p0._0;
		var nextSeed = _p0._1;
		var _p1 = dna1IsFirst ? {ctor: '_Tuple2', _0: parent1.dna, _1: parent2.dna} : {ctor: '_Tuple2', _0: parent2.dna, _1: parent1.dna};
		var dna1 = _p1._0;
		var dna2 = _p1._1;
		var _p2 = A2(
			options.mutateDna,
			nextSeed,
			A2(options.crossoverDnas, dna1, dna2));
		var childDna = _p2._0;
		var nextSeed2 = _p2._1;
		return {
			ctor: '_Tuple2',
			_0: A2(
				_ckoster22$elm_genetic$Genetic$Organism,
				childDna,
				options.evaluateOrganism(childDna)),
			_1: nextSeed2
		};
	});
var _ckoster22$elm_genetic$Genetic$produceFamily = F4(
	function (options, parent1, parent2, seed) {
		var bestParent = function () {
			var _p3 = options.method;
			if (_p3.ctor === 'MaximizeScore') {
				return (_elm_lang$core$Native_Utils.cmp(parent1.points, parent2.points) > 0) ? parent1 : parent2;
			} else {
				return (_elm_lang$core$Native_Utils.cmp(parent1.points, parent2.points) < 0) ? parent1 : parent2;
			}
		}();
		var _p4 = A4(_ckoster22$elm_genetic$Genetic$produceChild, options, parent1, parent2, seed);
		var child1 = _p4._0;
		var seed2 = _p4._1;
		var _p5 = A4(_ckoster22$elm_genetic$Genetic$produceChild, options, parent1, parent2, seed2);
		var child2 = _p5._0;
		var seed3 = _p5._1;
		var _p6 = A4(_ckoster22$elm_genetic$Genetic$produceChild, options, parent1, parent2, seed3);
		var child3 = _p6._0;
		var seed4 = _p6._1;
		return {
			ctor: '_Tuple2',
			_0: {
				ctor: '::',
				_0: child1,
				_1: {
					ctor: '::',
					_0: child2,
					_1: {
						ctor: '::',
						_0: child3,
						_1: {
							ctor: '::',
							_0: bestParent,
							_1: {ctor: '[]'}
						}
					}
				}
			},
			_1: seed4
		};
	});
var _ckoster22$elm_genetic$Genetic$reproduceBestOrganisms = F3(
	function (options, bestHalfOfPopulation, seed) {
		var _p7 = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (currOrganism, _p8) {
					var _p9 = _p8;
					var _p13 = _p9._0;
					var _p12 = _p9._2;
					var _p10 = _p9._1;
					if (_p10.ctor === 'Just') {
						var _p11 = A4(_ckoster22$elm_genetic$Genetic$produceFamily, options, _p10._0, currOrganism, _p12);
						var family = _p11._0;
						var nextSeed2 = _p11._1;
						return {
							ctor: '_Tuple3',
							_0: A2(_elm_lang$core$List$append, _p13, family),
							_1: _elm_lang$core$Maybe$Nothing,
							_2: nextSeed2
						};
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p13,
							_1: _elm_lang$core$Maybe$Just(currOrganism),
							_2: _p12
						};
					}
				}),
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Maybe$Nothing,
				_2: seed
			},
			bestHalfOfPopulation);
		var nextGeneration = _p7._0;
		var nextSeed3 = _p7._2;
		return {ctor: '_Tuple2', _0: nextGeneration, _1: nextSeed3};
	});
var _ckoster22$elm_genetic$Genetic$generateNextGeneration = F3(
	function (options, currPopulation, seed) {
		var sortedPopulation = _mgold$elm_nonempty_list$List_Nonempty$toList(
			A2(
				_mgold$elm_nonempty_list$List_Nonempty$sortBy,
				function (_) {
					return _.points;
				},
				currPopulation));
		var bestHalfOfPopulation = function () {
			var _p14 = options.method;
			if (_p14.ctor === 'MaximizeScore') {
				return A2(_elm_lang$core$List$drop, _ckoster22$elm_genetic$Genetic$half_population_size, sortedPopulation);
			} else {
				return A2(_elm_lang$core$List$take, _ckoster22$elm_genetic$Genetic$half_population_size, sortedPopulation);
			}
		}();
		var _p15 = A3(_ckoster22$elm_genetic$Genetic$reproduceBestOrganisms, options, bestHalfOfPopulation, seed);
		var nextGeneration = _p15._0;
		var nextSeed = _p15._1;
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Maybe$withDefault,
				currPopulation,
				_mgold$elm_nonempty_list$List_Nonempty$fromList(nextGeneration)),
			_1: nextSeed
		};
	});
var _ckoster22$elm_genetic$Genetic$executeStep = F3(
	function (options, population, seed) {
		var _p16 = A3(_ckoster22$elm_genetic$Genetic$generateNextGeneration, options, population, seed);
		var nextPopulation = _p16._0;
		var nextSeed = _p16._1;
		var sortedPopulation = A2(
			_mgold$elm_nonempty_list$List_Nonempty$sortBy,
			function (_) {
				return _.points;
			},
			population);
		var bestSolution = function () {
			var _p17 = options.method;
			if (_p17.ctor === 'MaximizeScore') {
				return _mgold$elm_nonempty_list$List_Nonempty$head(
					_mgold$elm_nonempty_list$List_Nonempty$reverse(sortedPopulation));
			} else {
				return _mgold$elm_nonempty_list$List_Nonempty$head(sortedPopulation);
			}
		}();
		return {ctor: '_Tuple3', _0: nextPopulation, _1: bestSolution, _2: nextSeed};
	});
var _ckoster22$elm_genetic$Genetic$recursivelyEvolve = F5(
	function (numGenerations, options, population, bestOrganism, seed) {
		recursivelyEvolve:
		while (true) {
			if (A3(options.isDoneEvolving, bestOrganism.dna, bestOrganism.points, numGenerations)) {
				return {ctor: '_Tuple3', _0: population, _1: bestOrganism, _2: seed};
			} else {
				var _p18 = A3(_ckoster22$elm_genetic$Genetic$executeStep, options, population, seed);
				var nextPopulation = _p18._0;
				var nextBestOrganism = _p18._1;
				var nextSeed = _p18._2;
				var _v5 = numGenerations + 1,
					_v6 = options,
					_v7 = nextPopulation,
					_v8 = nextBestOrganism,
					_v9 = nextSeed;
				numGenerations = _v5;
				options = _v6;
				population = _v7;
				bestOrganism = _v8;
				seed = _v9;
				continue recursivelyEvolve;
			}
		}
	});
var _ckoster22$elm_genetic$Genetic$evolveSolution = function (options) {
	var _p19 = _ckoster22$elm_genetic$Genetic$generateInitialPopulation(options);
	var initialPopulation = _p19._0;
	var seed2 = _p19._1;
	var _p20 = function () {
		var _p21 = A3(_ckoster22$elm_genetic$Genetic$executeStep, options, initialPopulation, seed2);
		var nextPopulation = _p21._0;
		var bestOrganism = _p21._1;
		var seed3 = _p21._2;
		return A5(_ckoster22$elm_genetic$Genetic$recursivelyEvolve, 0, options, nextPopulation, bestOrganism, seed3);
	}();
	var finalGeneration = _p20._0;
	var bestOrganism = _p20._1;
	var seed3 = _p20._2;
	return {ctor: '_Tuple4', _0: finalGeneration, _1: bestOrganism.dna, _2: bestOrganism.points, _3: seed3};
};
var _ckoster22$elm_genetic$Genetic$Options = F7(
	function (a, b, c, d, e, f, g) {
		return {randomDnaGenerator: a, evaluateOrganism: b, crossoverDnas: c, mutateDna: d, isDoneEvolving: e, initialSeed: f, method: g};
	});
var _ckoster22$elm_genetic$Genetic$MinimizePenalty = {ctor: 'MinimizePenalty'};
var _ckoster22$elm_genetic$Genetic$MaximizeScore = {ctor: 'MaximizeScore'};

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Food = F4(
	function (a, b, c, d) {
		return {name: a, perPackage: b, unit: c, cost: d};
	});
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Ingredient = F2(
	function (a, b) {
		return {name: a, amount: b};
	});
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Recipe = F5(
	function (a, b, c, d, e) {
		return {name: a, servings: b, maxServings: c, ingredients: d, mealType: e};
	});
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Meal = F3(
	function (a, b, c) {
		return {recipe: a, servingMultiplier: b, isLeftover: c};
	});
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$MealPlan = F7(
	function (a, b, c, d, e, f, g) {
		return {sunday: a, monday: b, tuesday: c, wednesday: d, thursday: e, friday: f, saturday: g};
	});
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType = {ctor: 'LunchDinnerType'};
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastLunchType = {ctor: 'BreakfastLunchType'};
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$DinnerType = {ctor: 'DinnerType'};
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchType = {ctor: 'LunchType'};
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastType = {ctor: 'BreakfastType'};
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$NoMeals = {ctor: 'NoMeals'};
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$AllMeals = F3(
	function (a, b, c) {
		return {ctor: 'AllMeals', _0: a, _1: b, _2: c};
	});
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinner = F2(
	function (a, b) {
		return {ctor: 'LunchDinner', _0: a, _1: b};
	});
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastDinner = F2(
	function (a, b) {
		return {ctor: 'BreakfastDinner', _0: a, _1: b};
	});
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastLunch = F2(
	function (a, b) {
		return {ctor: 'BreakfastLunch', _0: a, _1: b};
	});
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Dinner = function (a) {
	return {ctor: 'Dinner', _0: a};
};
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Lunch = function (a) {
	return {ctor: 'Lunch', _0: a};
};
var _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Breakfast = function (a) {
	return {ctor: 'Breakfast', _0: a};
};

var _ckoster22$elm_genetic$Advanced_MealPlannerData$allRecipes = function () {
	var firstRecipe = _mgold$elm_nonempty_list$List_Nonempty$fromElement(
		{
			name: 'Frozen pizza',
			servings: 3,
			maxServings: 3,
			ingredients: {
				ctor: '::',
				_0: {name: 'Frozen pizza', amount: 1},
				_1: {ctor: '[]'}
			},
			mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
		});
	return A3(
		_elm_lang$core$List$foldl,
		_mgold$elm_nonempty_list$List_Nonempty$cons,
		firstRecipe,
		{
			ctor: '::',
			_0: {
				name: 'Frozen Chinese General\'s Chicken',
				servings: 2,
				maxServings: 2,
				ingredients: {
					ctor: '::',
					_0: {name: 'Frozen Chinese General\'s Chicken', amount: 1},
					_1: {ctor: '[]'}
				},
				mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
			},
			_1: {
				ctor: '::',
				_0: {
					name: 'Chicken cordon bleu',
					servings: 1,
					maxServings: 2,
					ingredients: {
						ctor: '::',
						_0: {name: 'Chicken cordon bleu', amount: 1},
						_1: {ctor: '[]'}
					},
					mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
				},
				_1: {
					ctor: '::',
					_0: {
						name: 'Grilled cheese sandwiches',
						servings: 2,
						maxServings: 3,
						ingredients: {
							ctor: '::',
							_0: {name: 'Sliced American cheese', amount: 4},
							_1: {
								ctor: '::',
								_0: {name: 'Sliced white bread', amount: 6},
								_1: {
									ctor: '::',
									_0: {name: 'Butter', amount: 0.5},
									_1: {ctor: '[]'}
								}
							}
						},
						mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
					},
					_1: {
						ctor: '::',
						_0: {
							name: 'Grilled ham and cheese sandwiches',
							servings: 2,
							maxServings: 3,
							ingredients: {
								ctor: '::',
								_0: {name: 'Sliced American cheese', amount: 4},
								_1: {
									ctor: '::',
									_0: {name: 'Sliced white bread', amount: 6},
									_1: {
										ctor: '::',
										_0: {name: 'Butter', amount: 0.5},
										_1: {
											ctor: '::',
											_0: {name: 'Deli ham', amount: 0.125},
											_1: {ctor: '[]'}
										}
									}
								}
							},
							mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
						},
						_1: {
							ctor: '::',
							_0: {
								name: 'French toast',
								servings: 2,
								maxServings: 3,
								ingredients: {
									ctor: '::',
									_0: {name: 'Sliced white bread', amount: 6},
									_1: {
										ctor: '::',
										_0: {name: 'Butter', amount: 0.5},
										_1: {
											ctor: '::',
											_0: {name: 'Milk', amount: 1},
											_1: {
												ctor: '::',
												_0: {name: 'Eggs', amount: 1},
												_1: {ctor: '[]'}
											}
										}
									}
								},
								mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastType
							},
							_1: {
								ctor: '::',
								_0: {
									name: 'Cereal',
									servings: 1,
									maxServings: 2,
									ingredients: {
										ctor: '::',
										_0: {name: 'Milk', amount: 0.125},
										_1: {
											ctor: '::',
											_0: {name: 'Cereal', amount: 6.125e-2},
											_1: {ctor: '[]'}
										}
									},
									mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastType
								},
								_1: {
									ctor: '::',
									_0: {
										name: 'Philly cheese steak',
										servings: 2,
										maxServings: 3,
										ingredients: {
											ctor: '::',
											_0: {name: 'Philly steak meat', amount: 1},
											_1: {
												ctor: '::',
												_0: {name: 'Hoagie buns', amount: 2},
												_1: {
													ctor: '::',
													_0: {name: 'Sliced provolone', amount: 3},
													_1: {
														ctor: '::',
														_0: {name: 'Green pepper', amount: 0.5},
														_1: {
															ctor: '::',
															_0: {name: 'White onion', amount: 0.125},
															_1: {ctor: '[]'}
														}
													}
												}
											}
										},
										mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
									},
									_1: {
										ctor: '::',
										_0: {
											name: 'Scrambled eggs',
											servings: 2,
											maxServings: 3,
											ingredients: {
												ctor: '::',
												_0: {name: 'Eggs', amount: 3},
												_1: {
													ctor: '::',
													_0: {name: 'Milk', amount: 0.125},
													_1: {ctor: '[]'}
												}
											},
											mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastType
										},
										_1: {
											ctor: '::',
											_0: {
												name: 'Buffalo chicken wraps',
												servings: 2,
												maxServings: 4,
												ingredients: {
													ctor: '::',
													_0: {name: 'Large tortilla', amount: 2},
													_1: {
														ctor: '::',
														_0: {name: 'Shredded lettuce', amount: 2},
														_1: {
															ctor: '::',
															_0: {name: 'Chicken breast', amount: 0.5},
															_1: {ctor: '[]'}
														}
													}
												},
												mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
											},
											_1: {
												ctor: '::',
												_0: {
													name: 'Tacos',
													servings: 2,
													maxServings: 5,
													ingredients: {
														ctor: '::',
														_0: {name: 'Large tortilla', amount: 2},
														_1: {
															ctor: '::',
															_0: {name: 'White onion', amount: 0.125},
															_1: {
																ctor: '::',
																_0: {name: 'Shredded lettuce', amount: 2},
																_1: {
																	ctor: '::',
																	_0: {name: 'Ground Beef', amount: 0.5},
																	_1: {
																		ctor: '::',
																		_0: {name: 'Taco seasoning', amount: 1},
																		_1: {
																			ctor: '::',
																			_0: {name: 'Green onion', amount: 0.125},
																			_1: {
																				ctor: '::',
																				_0: {name: 'Mexican taco cheese', amount: 2},
																				_1: {
																					ctor: '::',
																					_0: {name: 'Sour cream', amount: 2},
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}
																}
															}
														}
													},
													mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
												},
												_1: {
													ctor: '::',
													_0: {
														name: 'Walking tacos',
														servings: 2,
														maxServings: 5,
														ingredients: {
															ctor: '::',
															_0: {name: 'White onion', amount: 0.125},
															_1: {
																ctor: '::',
																_0: {name: 'Shredded lettuce', amount: 2},
																_1: {
																	ctor: '::',
																	_0: {name: 'Ground Beef', amount: 0.5},
																	_1: {
																		ctor: '::',
																		_0: {name: 'Taco seasoning', amount: 1},
																		_1: {
																			ctor: '::',
																			_0: {name: 'Green onion', amount: 0.125},
																			_1: {
																				ctor: '::',
																				_0: {name: 'Mexican taco cheese', amount: 2},
																				_1: {
																					ctor: '::',
																					_0: {name: 'Sour cream', amount: 2},
																					_1: {
																						ctor: '::',
																						_0: {name: 'Doritos', amount: 0.125},
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														},
														mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
													},
													_1: {
														ctor: '::',
														_0: {
															name: 'Fajitas',
															servings: 4,
															maxServings: 4,
															ingredients: {
																ctor: '::',
																_0: {name: 'Large tortilla', amount: 4},
																_1: {
																	ctor: '::',
																	_0: {name: 'Green pepper', amount: 1},
																	_1: {
																		ctor: '::',
																		_0: {name: 'Red pepper', amount: 1},
																		_1: {
																			ctor: '::',
																			_0: {name: 'White onion', amount: 0.33},
																			_1: {
																				ctor: '::',
																				_0: {name: 'Chicken breast', amount: 1},
																				_1: {
																					ctor: '::',
																					_0: {name: 'Shredded lettuce', amount: 3},
																					_1: {
																						ctor: '::',
																						_0: {name: 'Fajita seasoning', amount: 1},
																						_1: {
																							ctor: '::',
																							_0: {name: 'Mexican taco cheese', amount: 3},
																							_1: {
																								ctor: '::',
																								_0: {name: 'Sour cream', amount: 3},
																								_1: {ctor: '[]'}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															},
															mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
														},
														_1: {
															ctor: '::',
															_0: {
																name: 'Quesadillas',
																servings: 2,
																maxServings: 3,
																ingredients: {
																	ctor: '::',
																	_0: {name: 'Large tortilla', amount: 2},
																	_1: {
																		ctor: '::',
																		_0: {name: 'White onion', amount: 0.125},
																		_1: {
																			ctor: '::',
																			_0: {name: 'Chicken breast', amount: 0.5},
																			_1: {
																				ctor: '::',
																				_0: {name: 'Green onion', amount: 0.125},
																				_1: {
																					ctor: '::',
																					_0: {name: 'Mexican taco cheese', amount: 6},
																					_1: {
																						ctor: '::',
																						_0: {name: 'Sour cream', amount: 2},
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																},
																mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
															},
															_1: {
																ctor: '::',
																_0: {
																	name: 'Chili',
																	servings: 12,
																	maxServings: 12,
																	ingredients: {
																		ctor: '::',
																		_0: {name: 'Green pepper', amount: 1},
																		_1: {
																			ctor: '::',
																			_0: {name: 'Red pepper', amount: 1},
																			_1: {
																				ctor: '::',
																				_0: {name: 'White onion', amount: 1},
																				_1: {
																					ctor: '::',
																					_0: {name: 'Ground Beef', amount: 3},
																					_1: {
																						ctor: '::',
																						_0: {name: 'Ground sausage', amount: 1},
																						_1: {
																							ctor: '::',
																							_0: {name: 'Tomato paste', amount: 6},
																							_1: {
																								ctor: '::',
																								_0: {name: 'Diced tomatoes', amount: 56},
																								_1: {
																									ctor: '::',
																									_0: {name: 'Chili Beans', amount: 31},
																									_1: {
																										ctor: '::',
																										_0: {name: 'Shredded cheddar cheese', amount: 8},
																										_1: {
																											ctor: '::',
																											_0: {name: 'Fritos', amount: 1},
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	},
																	mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																},
																_1: {
																	ctor: '::',
																	_0: {
																		name: 'Waffles',
																		servings: 3,
																		maxServings: 3,
																		ingredients: {
																			ctor: '::',
																			_0: {name: 'Milk', amount: 1.5},
																			_1: {
																				ctor: '::',
																				_0: {name: 'Waffle mix', amount: 4.5},
																				_1: {ctor: '[]'}
																			}
																		},
																		mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastType
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			name: 'Breakfast sandwich',
																			servings: 1,
																			maxServings: 2,
																			ingredients: {
																				ctor: '::',
																				_0: {name: 'Sliced white bread', amount: 2},
																				_1: {
																					ctor: '::',
																					_0: {name: 'Butter', amount: 0.25},
																					_1: {
																						ctor: '::',
																						_0: {name: 'Sliced provolone', amount: 1},
																						_1: {
																							ctor: '::',
																							_0: {name: 'Avocado', amount: 0.5},
																							_1: {
																								ctor: '::',
																								_0: {name: 'Eggs', amount: 1},
																								_1: {
																									ctor: '::',
																									_0: {name: 'Bacon', amount: 2},
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}
																			},
																			mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastLunchType
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				name: 'Gyros',
																				servings: 3,
																				maxServings: 3,
																				ingredients: {
																					ctor: '::',
																					_0: {name: 'Flank steak', amount: 1},
																					_1: {
																						ctor: '::',
																						_0: {name: 'Feta cheese', amount: 2},
																						_1: {
																							ctor: '::',
																							_0: {name: 'Pita bread', amount: 4},
																							_1: {
																								ctor: '::',
																								_0: {name: 'Greek yogurt', amount: 5.3},
																								_1: {
																									ctor: '::',
																									_0: {name: 'White onion', amount: 0.125},
																									_1: {
																										ctor: '::',
																										_0: {name: 'Tomato', amount: 0.5},
																										_1: {
																											ctor: '::',
																											_0: {name: 'Cucumber', amount: 0.33},
																											_1: {
																												ctor: '::',
																												_0: {name: 'Lemon', amount: 0.25},
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				},
																				mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					name: 'Deli sandwiches',
																					servings: 2,
																					maxServings: 3,
																					ingredients: {
																						ctor: '::',
																						_0: {name: 'Sliced American cheese', amount: 2},
																						_1: {
																							ctor: '::',
																							_0: {name: 'Sliced white bread', amount: 4},
																							_1: {
																								ctor: '::',
																								_0: {name: 'Deli ham', amount: 0.25},
																								_1: {
																									ctor: '::',
																									_0: {name: 'Deli turkey', amount: 0.25},
																									_1: {
																										ctor: '::',
																										_0: {name: 'White onion', amount: 0.125},
																										_1: {
																											ctor: '::',
																											_0: {name: 'Lettuce', amount: 0.2},
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}
																					},
																					mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						name: 'Beef and broccoli',
																						servings: 3,
																						maxServings: 3,
																						ingredients: {
																							ctor: '::',
																							_0: {name: 'Soy sauce', amount: 7},
																							_1: {
																								ctor: '::',
																								_0: {name: 'Flank steak', amount: 1},
																								_1: {
																									ctor: '::',
																									_0: {name: 'Broccoli', amount: 1},
																									_1: {ctor: '[]'}
																								}
																							}
																						},
																						mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							name: 'Loaded salad',
																							servings: 3,
																							maxServings: 3,
																							ingredients: {
																								ctor: '::',
																								_0: {name: 'Chicken breast', amount: 0.5},
																								_1: {
																									ctor: '::',
																									_0: {name: 'Spinach', amount: 3},
																									_1: {
																										ctor: '::',
																										_0: {name: 'Avocado', amount: 0.5},
																										_1: {
																											ctor: '::',
																											_0: {name: 'Tomato', amount: 0.25},
																											_1: {
																												ctor: '::',
																												_0: {name: 'Cucumber', amount: 0.125},
																												_1: {
																													ctor: '::',
																													_0: {name: 'Carrots', amount: 2},
																													_1: {
																														ctor: '::',
																														_0: {name: 'Feta cheese', amount: 1},
																														_1: {ctor: '[]'}
																													}
																												}
																											}
																										}
																									}
																								}
																							},
																							mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								name: 'Spaghetti',
																								servings: 3,
																								maxServings: 3,
																								ingredients: {
																									ctor: '::',
																									_0: {name: 'Ground Beef', amount: 0.5},
																									_1: {
																										ctor: '::',
																										_0: {name: 'Spaghetti noodles', amount: 16},
																										_1: {
																											ctor: '::',
																											_0: {name: 'Tomato sauce', amount: 15},
																											_1: {
																												ctor: '::',
																												_0: {name: 'Tomato paste', amount: 6},
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								},
																								mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									name: 'Lasagna',
																									servings: 4,
																									maxServings: 4,
																									ingredients: {
																										ctor: '::',
																										_0: {name: 'Ground Beef', amount: 1},
																										_1: {
																											ctor: '::',
																											_0: {name: 'Tomato sauce', amount: 15},
																											_1: {
																												ctor: '::',
																												_0: {name: 'Tomato paste', amount: 6},
																												_1: {
																													ctor: '::',
																													_0: {name: 'Lasagna noodles', amount: 16},
																													_1: {
																														ctor: '::',
																														_0: {name: 'Shredded mozzarella cheese', amount: 8},
																														_1: {
																															ctor: '::',
																															_0: {name: 'Cottage cheese', amount: 12},
																															_1: {ctor: '[]'}
																														}
																													}
																												}
																											}
																										}
																									},
																									mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$DinnerType
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										name: 'Chicken alfredo',
																										servings: 3,
																										maxServings: 3,
																										ingredients: {
																											ctor: '::',
																											_0: {name: 'Chicken breast', amount: 0.5},
																											_1: {
																												ctor: '::',
																												_0: {name: 'Alfredo sauce', amount: 15},
																												_1: {
																													ctor: '::',
																													_0: {name: 'Fettuccine noodles', amount: 8},
																													_1: {ctor: '[]'}
																												}
																											}
																										},
																										mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											name: 'Shrimp alfredo',
																											servings: 3,
																											maxServings: 3,
																											ingredients: {
																												ctor: '::',
																												_0: {name: 'Alfredo sauce', amount: 15},
																												_1: {
																													ctor: '::',
																													_0: {name: 'Frozen shrimp', amount: 1},
																													_1: {
																														ctor: '::',
																														_0: {name: 'Fettuccine noodles', amount: 8},
																														_1: {ctor: '[]'}
																													}
																												}
																											},
																											mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												name: 'Chicken parmesan',
																												servings: 3,
																												maxServings: 4,
																												ingredients: {
																													ctor: '::',
																													_0: {name: 'Chicken breast', amount: 1.5},
																													_1: {
																														ctor: '::',
																														_0: {name: 'Tomato sauce', amount: 15},
																														_1: {
																															ctor: '::',
																															_0: {name: 'Tomato paste', amount: 6},
																															_1: {
																																ctor: '::',
																																_0: {name: 'Bread crumbs', amount: 2.5},
																																_1: {
																																	ctor: '::',
																																	_0: {name: 'Spaghetti noodles', amount: 16},
																																	_1: {ctor: '[]'}
																																}
																															}
																														}
																													}
																												},
																												mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$DinnerType
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													name: 'Cheese ravioli',
																													servings: 3,
																													maxServings: 3,
																													ingredients: {
																														ctor: '::',
																														_0: {name: 'Cheese ravioli', amount: 24},
																														_1: {
																															ctor: '::',
																															_0: {name: 'Tomato sauce', amount: 15},
																															_1: {
																																ctor: '::',
																																_0: {name: 'Tomato paste', amount: 6},
																																_1: {ctor: '[]'}
																															}
																														}
																													},
																													mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																												},
																												_1: {
																													ctor: '::',
																													_0: {
																														name: 'Pizza smothered chicken',
																														servings: 3,
																														maxServings: 3,
																														ingredients: {
																															ctor: '::',
																															_0: {name: 'Chicken breast', amount: 1.5},
																															_1: {
																																ctor: '::',
																																_0: {name: 'Pizza sauce', amount: 10},
																																_1: {
																																	ctor: '::',
																																	_0: {name: 'Pepperoni', amount: 0.125},
																																	_1: {
																																		ctor: '::',
																																		_0: {name: 'Shredded mozzarella cheese', amount: 1},
																																		_1: {ctor: '[]'}
																																	}
																																}
																															}
																														},
																														mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$DinnerType
																													},
																													_1: {
																														ctor: '::',
																														_0: {
																															name: 'Pigs in a blanket',
																															servings: 4,
																															maxServings: 4,
																															ingredients: {
																																ctor: '::',
																																_0: {name: 'Sliced American cheese', amount: 2},
																																_1: {
																																	ctor: '::',
																																	_0: {name: 'Crescent roles', amount: 1},
																																	_1: {
																																		ctor: '::',
																																		_0: {name: 'Hot dogs', amount: 4},
																																		_1: {ctor: '[]'}
																																	}
																																}
																															},
																															mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																														},
																														_1: {
																															ctor: '::',
																															_0: {
																																name: 'Salmon',
																																servings: 3,
																																maxServings: 3,
																																ingredients: {
																																	ctor: '::',
																																	_0: {name: 'Salmon', amount: 0.5},
																																	_1: {
																																		ctor: '::',
																																		_0: {name: 'Asparagus', amount: 0.5},
																																		_1: {ctor: '[]'}
																																	}
																																},
																																mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$DinnerType
																															},
																															_1: {
																																ctor: '::',
																																_0: {
																																	name: 'Homemade pepperoni & beef pizza',
																																	servings: 4,
																																	maxServings: 4,
																																	ingredients: {
																																		ctor: '::',
																																		_0: {name: 'Ground Beef', amount: 1},
																																		_1: {
																																			ctor: '::',
																																			_0: {name: 'Pizza sauce', amount: 15},
																																			_1: {
																																				ctor: '::',
																																				_0: {name: 'Pepperoni', amount: 0.5},
																																				_1: {
																																					ctor: '::',
																																					_0: {name: 'Pizza dough', amount: 1},
																																					_1: {
																																						ctor: '::',
																																						_0: {name: 'Shredded mozzarella cheese', amount: 12},
																																						_1: {ctor: '[]'}
																																					}
																																				}
																																			}
																																		}
																																	},
																																	mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																																},
																																_1: {
																																	ctor: '::',
																																	_0: {
																																		name: 'Homemade bbq chicken pizza',
																																		servings: 4,
																																		maxServings: 4,
																																		ingredients: {
																																			ctor: '::',
																																			_0: {name: 'Pizza dough', amount: 1},
																																			_1: {
																																				ctor: '::',
																																				_0: {name: 'Chicken breast', amount: 0.5},
																																				_1: {
																																					ctor: '::',
																																					_0: {name: 'BBQ sauce', amount: 20},
																																					_1: {
																																						ctor: '::',
																																						_0: {name: 'Shredded mozzarella cheese', amount: 12},
																																						_1: {ctor: '[]'}
																																					}
																																				}
																																			}
																																		},
																																		mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																																	},
																																	_1: {
																																		ctor: '::',
																																		_0: {
																																			name: 'Grilled steak',
																																			servings: 2,
																																			maxServings: 3,
																																			ingredients: {
																																				ctor: '::',
																																				_0: {name: 'Ribeye steak', amount: 16},
																																				_1: {ctor: '[]'}
																																			},
																																			mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$DinnerType
																																		},
																																		_1: {
																																			ctor: '::',
																																			_0: {
																																				name: 'Grilled burgers',
																																				servings: 3,
																																				maxServings: 4,
																																				ingredients: {
																																					ctor: '::',
																																					_0: {name: 'Sliced American cheese', amount: 3},
																																					_1: {
																																						ctor: '::',
																																						_0: {name: 'Hamburger buns', amount: 3},
																																						_1: {
																																							ctor: '::',
																																							_0: {name: 'White onion', amount: 0.125},
																																							_1: {
																																								ctor: '::',
																																								_0: {name: 'Lettuce', amount: 0.125},
																																								_1: {
																																									ctor: '::',
																																									_0: {name: 'Ground Beef', amount: 1},
																																									_1: {ctor: '[]'}
																																								}
																																							}
																																						}
																																					}
																																				},
																																				mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																																			},
																																			_1: {
																																				ctor: '::',
																																				_0: {
																																					name: 'Grilled bacon cheddar brat',
																																					servings: 1,
																																					maxServings: 4,
																																					ingredients: {
																																						ctor: '::',
																																						_0: {name: 'Hot dog buns', amount: 1},
																																						_1: {
																																							ctor: '::',
																																							_0: {name: 'Bacon cheddar brat', amount: 1},
																																							_1: {ctor: '[]'}
																																						}
																																					},
																																					mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																																				},
																																				_1: {
																																					ctor: '::',
																																					_0: {
																																						name: 'Grilled pineapple brat',
																																						servings: 1,
																																						maxServings: 4,
																																						ingredients: {
																																							ctor: '::',
																																							_0: {name: 'Hot dog buns', amount: 1},
																																							_1: {
																																								ctor: '::',
																																								_0: {name: 'Pineapple brat', amount: 1},
																																								_1: {ctor: '[]'}
																																							}
																																						},
																																						mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: {
																																							name: 'Grilled hot dogs',
																																							servings: 1,
																																							maxServings: 4,
																																							ingredients: {
																																								ctor: '::',
																																								_0: {name: 'Hot dog buns', amount: 1},
																																								_1: {
																																									ctor: '::',
																																									_0: {name: 'Hot dogs', amount: 1},
																																									_1: {ctor: '[]'}
																																								}
																																							},
																																							mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																																						},
																																						_1: {
																																							ctor: '::',
																																							_0: {
																																								name: 'Chicken burgers',
																																								servings: 3,
																																								maxServings: 3,
																																								ingredients: {
																																									ctor: '::',
																																									_0: {name: 'Hamburger buns', amount: 3},
																																									_1: {
																																										ctor: '::',
																																										_0: {name: 'Sliced provolone', amount: 3},
																																										_1: {
																																											ctor: '::',
																																											_0: {name: 'Ground chicken', amount: 1},
																																											_1: {ctor: '[]'}
																																										}
																																									}
																																								},
																																								mealType: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinnerType
																																							},
																																							_1: {ctor: '[]'}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
}();
var _ckoster22$elm_genetic$Advanced_MealPlannerData$allFood = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'Cereal',
			_1: {name: 'Cereal', perPackage: 1, unit: 'box', cost: 3.5}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'Sliced American cheese',
				_1: {name: 'Sliced American cheese', perPackage: 24, unit: 'slice', cost: 3.79}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'Sliced provolone',
					_1: {name: 'Sliced provolone', perPackage: 10, unit: 'slice', cost: 2.99}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'Milk',
						_1: {name: 'Milk', perPackage: 8, unit: 'cup', cost: 2.29}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'Feta cheese',
							_1: {name: 'Feta cheese', perPackage: 4, unit: 'ounce', cost: 3.49}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'Mexican taco cheese',
								_1: {name: 'Mexican taco cheese', perPackage: 8, unit: 'ounce', cost: 2.59}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'Shredded mozzarella cheese',
									_1: {name: 'Shredded mozzarella cheese', perPackage: 8, unit: 'ounce', cost: 2.69}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'Shredded cheddar cheese',
										_1: {name: 'Shredded cheddar cheese', perPackage: 8, unit: 'ounce', cost: 2.59}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'Cottage cheese',
											_1: {name: 'Cottage cheese', perPackage: 12, unit: 'ounce', cost: 1.79}
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'Greek yogurt',
												_1: {name: 'Greek yogurt', perPackage: 5.3, unit: 'ounce', cost: 1.19}
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'Green pepper',
													_1: {name: 'Green pepper', perPackage: 1, unit: 'item', cost: 1.5}
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'Red pepper',
														_1: {name: 'Red pepper', perPackage: 1, unit: 'item', cost: 1.5}
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'White onion',
															_1: {name: 'White onion', perPackage: 1, unit: 'item', cost: 0.77}
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'Red onion',
																_1: {name: 'Red onion', perPackage: 1, unit: 'item', cost: 1.16}
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'Shredded lettuce',
																	_1: {name: 'Shredded lettuce', perPackage: 8, unit: 'ounce', cost: 1.99}
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 'Lettuce',
																		_1: {name: 'Lettuce', perPackage: 1, unit: 'item', cost: 2.49}
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: 'Green onion',
																			_1: {name: 'Green onion', perPackage: 1, unit: 'item', cost: 0.99}
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: 'Avocado',
																				_1: {name: 'Avocado', perPackage: 1, unit: 'item', cost: 1.5}
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: 'Asparagus',
																					_1: {name: 'Asparagus', perPackage: 1, unit: 'item', cost: 3.69}
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '_Tuple2',
																						_0: 'Tomato',
																						_1: {name: 'Tomato', perPackage: 1, unit: 'item', cost: 0.35}
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							ctor: '_Tuple2',
																							_0: 'Cucumber',
																							_1: {name: 'Cucumber', perPackage: 1, unit: 'item', cost: 0.99}
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								ctor: '_Tuple2',
																								_0: 'Broccoli',
																								_1: {name: 'Broccoli', perPackage: 1, unit: 'item', cost: 2.39}
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									ctor: '_Tuple2',
																									_0: 'Spinach',
																									_1: {name: 'Spinach', perPackage: 5, unit: 'ounce', cost: 3.99}
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										ctor: '_Tuple2',
																										_0: 'Carrots',
																										_1: {name: 'Carrots', perPackage: 16, unit: 'ounce', cost: 1.79}
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											ctor: '_Tuple2',
																											_0: 'Lemon',
																											_1: {name: 'Lemon', perPackage: 1, unit: 'item', cost: 0.69}
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												ctor: '_Tuple2',
																												_0: 'Tomato sauce',
																												_1: {name: 'Tomato sauce', perPackage: 15, unit: 'ounce', cost: 0.89}
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													ctor: '_Tuple2',
																													_0: 'Tomato paste',
																													_1: {name: 'Tomato paste', perPackage: 6, unit: 'ounce', cost: 0.59}
																												},
																												_1: {
																													ctor: '::',
																													_0: {
																														ctor: '_Tuple2',
																														_0: 'Diced tomatoes',
																														_1: {name: 'Diced tomatoes', perPackage: 28, unit: 'ounce', cost: 1.69}
																													},
																													_1: {
																														ctor: '::',
																														_0: {
																															ctor: '_Tuple2',
																															_0: 'Alfredo sauce',
																															_1: {name: 'Alfredo sauce', perPackage: 15, unit: 'ounce', cost: 1.99}
																														},
																														_1: {
																															ctor: '::',
																															_0: {
																																ctor: '_Tuple2',
																																_0: 'BBQ sauce',
																																_1: {name: 'BBQ sauce', perPackage: 20, unit: 'ounce', cost: 2.29}
																															},
																															_1: {
																																ctor: '::',
																																_0: {
																																	ctor: '_Tuple2',
																																	_0: 'Soy sauce',
																																	_1: {name: 'Soy sauce', perPackage: 10, unit: 'ounce', cost: 2.19}
																																},
																																_1: {
																																	ctor: '::',
																																	_0: {
																																		ctor: '_Tuple2',
																																		_0: 'Pizza sauce',
																																		_1: {name: 'Pizza sauce', perPackage: 15, unit: 'ounce', cost: 1.69}
																																	},
																																	_1: {
																																		ctor: '::',
																																		_0: {
																																			ctor: '_Tuple2',
																																			_0: 'Large tortilla',
																																			_1: {name: 'Large tortilla', perPackage: 10, unit: 'tortilla', cost: 3.19}
																																		},
																																		_1: {
																																			ctor: '::',
																																			_0: {
																																				ctor: '_Tuple2',
																																				_0: 'Sliced white bread',
																																				_1: {name: 'Sliced white bread', perPackage: 24, unit: 'slice', cost: 2.79}
																																			},
																																			_1: {
																																				ctor: '::',
																																				_0: {
																																					ctor: '_Tuple2',
																																					_0: 'Hoagie buns',
																																					_1: {name: 'Hoagie buns', perPackage: 6, unit: 'hoagie', cost: 3.19}
																																				},
																																				_1: {
																																					ctor: '::',
																																					_0: {
																																						ctor: '_Tuple2',
																																						_0: 'Hot dog buns',
																																						_1: {name: 'Hot dog buns', perPackage: 8, unit: 'bun', cost: 2.59}
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: {
																																							ctor: '_Tuple2',
																																							_0: 'Hamburger buns',
																																							_1: {name: 'Hamburger buns', perPackage: 8, unit: 'bun', cost: 1.79}
																																						},
																																						_1: {
																																							ctor: '::',
																																							_0: {
																																								ctor: '_Tuple2',
																																								_0: 'Spaghetti noodles',
																																								_1: {name: 'Spaghetti noodles', perPackage: 32, unit: 'ounce', cost: 2.49}
																																							},
																																							_1: {
																																								ctor: '::',
																																								_0: {
																																									ctor: '_Tuple2',
																																									_0: 'Lasagna noodles',
																																									_1: {name: 'Lasagna noodles', perPackage: 16, unit: 'ounce', cost: 1.99}
																																								},
																																								_1: {
																																									ctor: '::',
																																									_0: {
																																										ctor: '_Tuple2',
																																										_0: 'Fettuccine noodles',
																																										_1: {name: 'Fettuccine noodles', perPackage: 16, unit: 'ounce', cost: 1.29}
																																									},
																																									_1: {
																																										ctor: '::',
																																										_0: {
																																											ctor: '_Tuple2',
																																											_0: 'Cheese ravioli',
																																											_1: {name: 'Cheese ravioli', perPackage: 24, unit: 'ounce', cost: 3.77}
																																										},
																																										_1: {
																																											ctor: '::',
																																											_0: {
																																												ctor: '_Tuple2',
																																												_0: 'Crescent roles',
																																												_1: {name: 'Crescent roles', perPackage: 1, unit: 'item', cost: 2.88}
																																											},
																																											_1: {
																																												ctor: '::',
																																												_0: {
																																													ctor: '_Tuple2',
																																													_0: 'Pizza dough',
																																													_1: {name: 'Pizza dough', perPackage: 1, unit: 'item', cost: 2.88}
																																												},
																																												_1: {
																																													ctor: '::',
																																													_0: {
																																														ctor: '_Tuple2',
																																														_0: 'Pita bread',
																																														_1: {name: 'Pita bread', perPackage: 6, unit: 'pita', cost: 3.29}
																																													},
																																													_1: {
																																														ctor: '::',
																																														_0: {
																																															ctor: '_Tuple2',
																																															_0: 'Bread crumbs',
																																															_1: {name: 'Bread crumbs', perPackage: 10, unit: 'ounce', cost: 1.59}
																																														},
																																														_1: {
																																															ctor: '::',
																																															_0: {
																																																ctor: '_Tuple2',
																																																_0: 'Butter',
																																																_1: {name: 'Butter', perPackage: 13, unit: 'ounce', cost: 4.69}
																																															},
																																															_1: {
																																																ctor: '::',
																																																_0: {
																																																	ctor: '_Tuple2',
																																																	_0: 'Eggs',
																																																	_1: {name: 'Eggs', perPackage: 12, unit: 'item', cost: 3.99}
																																																},
																																																_1: {
																																																	ctor: '::',
																																																	_0: {
																																																		ctor: '_Tuple2',
																																																		_0: 'Taco seasoning',
																																																		_1: {name: 'Taco seasoning', perPackage: 1, unit: 'item', cost: 0.99}
																																																	},
																																																	_1: {
																																																		ctor: '::',
																																																		_0: {
																																																			ctor: '_Tuple2',
																																																			_0: 'Fajita seasoning',
																																																			_1: {name: 'Fajita seasoning', perPackage: 1, unit: 'item', cost: 1.0}
																																																		},
																																																		_1: {
																																																			ctor: '::',
																																																			_0: {
																																																				ctor: '_Tuple2',
																																																				_0: 'Frozen pizza',
																																																				_1: {name: 'Frozen pizza', perPackage: 1, unit: 'item', cost: 3.97}
																																																			},
																																																			_1: {
																																																				ctor: '::',
																																																				_0: {
																																																					ctor: '_Tuple2',
																																																					_0: 'P.F. Chang\'s General\'s Chicken',
																																																					_1: {name: 'P.F. Chang\'s General\'s Chicken', perPackage: 1, unit: 'item', cost: 7.49}
																																																				},
																																																				_1: {
																																																					ctor: '::',
																																																					_0: {
																																																						ctor: '_Tuple2',
																																																						_0: 'Chicken cordon bleu',
																																																						_1: {name: 'Chicken cordon bleu', perPackage: 1, unit: 'item', cost: 3.98}
																																																					},
																																																					_1: {
																																																						ctor: '::',
																																																						_0: {
																																																							ctor: '_Tuple2',
																																																							_0: 'Sour cream',
																																																							_1: {name: 'Sour cream', perPackage: 8, unit: 'ounce', cost: 0.79}
																																																						},
																																																						_1: {
																																																							ctor: '::',
																																																							_0: {
																																																								ctor: '_Tuple2',
																																																								_0: 'Doritos',
																																																								_1: {name: 'Doritos', perPackage: 1, unit: 'item', cost: 4.29}
																																																							},
																																																							_1: {
																																																								ctor: '::',
																																																								_0: {
																																																									ctor: '_Tuple2',
																																																									_0: 'Fritos',
																																																									_1: {name: 'Fritos', perPackage: 1, unit: 'item', cost: 3.0}
																																																								},
																																																								_1: {
																																																									ctor: '::',
																																																									_0: {
																																																										ctor: '_Tuple2',
																																																										_0: 'Chili Beans',
																																																										_1: {name: 'Chili Beans', perPackage: 15.5, unit: 'ounce', cost: 0.79}
																																																									},
																																																									_1: {
																																																										ctor: '::',
																																																										_0: {
																																																											ctor: '_Tuple2',
																																																											_0: 'Waffle mix',
																																																											_1: {name: 'Waffle mix', perPackage: 32, unit: 'ounce', cost: 2.19}
																																																										},
																																																										_1: {
																																																											ctor: '::',
																																																											_0: {
																																																												ctor: '_Tuple2',
																																																												_0: 'Deli ham',
																																																												_1: {name: 'Deli ham', perPackage: 1, unit: 'pound', cost: 7.99}
																																																											},
																																																											_1: {
																																																												ctor: '::',
																																																												_0: {
																																																													ctor: '_Tuple2',
																																																													_0: 'Deli turkey',
																																																													_1: {name: 'Deli turkey', perPackage: 1, unit: 'pound', cost: 9.99}
																																																												},
																																																												_1: {
																																																													ctor: '::',
																																																													_0: {
																																																														ctor: '_Tuple2',
																																																														_0: 'Philly steak meat',
																																																														_1: {name: 'Philly steak meat', perPackage: 1, unit: 'item', cost: 4.99}
																																																													},
																																																													_1: {
																																																														ctor: '::',
																																																														_0: {
																																																															ctor: '_Tuple2',
																																																															_0: 'Chicken breast',
																																																															_1: {name: 'Chicken breast', perPackage: 1, unit: 'pounds', cost: 7.64}
																																																														},
																																																														_1: {
																																																															ctor: '::',
																																																															_0: {
																																																																ctor: '_Tuple2',
																																																																_0: 'Ground Beef',
																																																																_1: {name: 'Ground Beef', perPackage: 3, unit: 'pound', cost: 2.99}
																																																															},
																																																															_1: {
																																																																ctor: '::',
																																																																_0: {
																																																																	ctor: '_Tuple2',
																																																																	_0: 'Ground sausage',
																																																																	_1: {name: 'Ground sausage', perPackage: 1, unit: 'pound', cost: 4.49}
																																																																},
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: {
																																																																		ctor: '_Tuple2',
																																																																		_0: 'Ground chicken',
																																																																		_1: {name: 'Ground chicken', perPackage: 1, unit: 'pound', cost: 6.49}
																																																																	},
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: {
																																																																			ctor: '_Tuple2',
																																																																			_0: 'Flank steak',
																																																																			_1: {name: 'Flank steak', perPackage: 1, unit: 'pound', cost: 11.98}
																																																																		},
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: {
																																																																				ctor: '_Tuple2',
																																																																				_0: 'Salmon',
																																																																				_1: {name: 'Salmon', perPackage: 2, unit: 'pound', cost: 12.99}
																																																																			},
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: {
																																																																					ctor: '_Tuple2',
																																																																					_0: 'Ribeye steak',
																																																																					_1: {name: 'Ribeye steak', perPackage: 8, unit: 'ounce', cost: 7.99}
																																																																				},
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: {
																																																																						ctor: '_Tuple2',
																																																																						_0: 'Bacon cheddar brat',
																																																																						_1: {name: 'Bacon cheddar brat', perPackage: 1, unit: 'item', cost: 1.0}
																																																																					},
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: {
																																																																							ctor: '_Tuple2',
																																																																							_0: 'Pineapple brat',
																																																																							_1: {name: 'Pineapple brat', perPackage: 1, unit: 'item', cost: 1.0}
																																																																						},
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: {
																																																																								ctor: '_Tuple2',
																																																																								_0: 'Pepperoni',
																																																																								_1: {name: 'Pepperoni', perPackage: 1, unit: 'item', cost: 2.99}
																																																																							},
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: {
																																																																									ctor: '_Tuple2',
																																																																									_0: 'Frozen shrimp',
																																																																									_1: {name: 'Frozen shrimp', perPackage: 2, unit: 'pounds', cost: 16.99}
																																																																								},
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: {
																																																																										ctor: '_Tuple2',
																																																																										_0: 'Hot dogs',
																																																																										_1: {name: 'Hot dogs', perPackage: 8, unit: 'item', cost: 2.99}
																																																																									},
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: {
																																																																											ctor: '_Tuple2',
																																																																											_0: 'Bacon',
																																																																											_1: {name: 'Bacon', perPackage: 12, unit: 'ounce', cost: 4.79}
																																																																										},
																																																																										_1: {ctor: '[]'}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});

var _ckoster22$elm_genetic$Advanced_MealPlanner$getDinnerPenaltyFor = function (meal) {
	var _p0 = meal.recipe.mealType;
	switch (_p0.ctor) {
		case 'DinnerType':
			return 0;
		case 'LunchDinnerType':
			return 0;
		default:
			return 8;
	}
};
var _ckoster22$elm_genetic$Advanced_MealPlanner$getLunchPenaltyFor = function (meal) {
	var _p1 = meal.recipe.mealType;
	switch (_p1.ctor) {
		case 'LunchType':
			return 0;
		case 'BreakfastLunchType':
			return 0;
		case 'LunchDinnerType':
			return 0;
		default:
			return 8;
	}
};
var _ckoster22$elm_genetic$Advanced_MealPlanner$getBreakfastPenaltyFor = function (meal) {
	var _p2 = meal.recipe.mealType;
	switch (_p2.ctor) {
		case 'BreakfastType':
			return 0;
		case 'BreakfastLunchType':
			return 0;
		default:
			return 8;
	}
};
var _ckoster22$elm_genetic$Advanced_MealPlanner$getPenaltyForDay = function (day) {
	var _p3 = day;
	switch (_p3.ctor) {
		case 'Breakfast':
			return _ckoster22$elm_genetic$Advanced_MealPlanner$getBreakfastPenaltyFor(_p3._0);
		case 'Lunch':
			return _ckoster22$elm_genetic$Advanced_MealPlanner$getLunchPenaltyFor(_p3._0);
		case 'Dinner':
			return _ckoster22$elm_genetic$Advanced_MealPlanner$getDinnerPenaltyFor(_p3._0);
		default:
			return 0;
	}
};
var _ckoster22$elm_genetic$Advanced_MealPlanner$evaluateOrganism = function (mealPlan) {
	var totalPenalty = ((((((0 + _ckoster22$elm_genetic$Advanced_MealPlanner$getPenaltyForDay(mealPlan.sunday)) + _ckoster22$elm_genetic$Advanced_MealPlanner$getPenaltyForDay(mealPlan.monday)) + _ckoster22$elm_genetic$Advanced_MealPlanner$getPenaltyForDay(mealPlan.tuesday)) + _ckoster22$elm_genetic$Advanced_MealPlanner$getPenaltyForDay(mealPlan.wednesday)) + _ckoster22$elm_genetic$Advanced_MealPlanner$getPenaltyForDay(mealPlan.thursday)) + _ckoster22$elm_genetic$Advanced_MealPlanner$getPenaltyForDay(mealPlan.friday)) + _ckoster22$elm_genetic$Advanced_MealPlanner$getPenaltyForDay(mealPlan.saturday);
	return A2(_elm_lang$core$Basics$max, 0, 100 - totalPenalty);
};
var _ckoster22$elm_genetic$Advanced_MealPlanner$isDoneEvolving = F3(
	function (mealPlan, _p4, generations) {
		var _p5 = A2(_elm_lang$core$Debug$log, 'gen', generations);
		var _p6 = A2(_elm_lang$core$Debug$log, '', mealPlan);
		return _elm_lang$core$Native_Utils.cmp(generations, 100) > -1;
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateAllMealsDay = F4(
	function (meal, meal2, meal3, seed) {
		var _p7 = A2(
			_elm_lang$core$Random$step,
			A2(_elm_lang$core$Random$int, 0, 2),
			seed);
		var actionId = _p7._0;
		var nextSeed = _p7._1;
		return _elm_lang$core$Native_Utils.eq(actionId, 0) ? {
			ctor: '_Tuple2',
			_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinner, meal2, meal3),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 1) ? {
			ctor: '_Tuple2',
			_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastDinner, meal, meal3),
			_1: nextSeed
		} : {
			ctor: '_Tuple2',
			_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastLunch, meal, meal2),
			_1: nextSeed
		});
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$crossoverMealplans = F2(
	function (mealplan1, mealplan2) {
		var crossedMealplan = {sunday: mealplan1.sunday, monday: mealplan1.monday, tuesday: mealplan1.tuesday, wednesday: mealplan2.wednesday, thursday: mealplan2.thursday, friday: mealplan2.friday, saturday: mealplan2.saturday};
		return crossedMealplan;
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$randomRecipeGenerator = A2(
	_elm_lang$core$Random$map,
	function (index) {
		return A2(_mgold$elm_nonempty_list$List_Nonempty$get, index, _ckoster22$elm_genetic$Advanced_MealPlannerData$allRecipes);
	},
	A2(
		_elm_lang$core$Random$int,
		0,
		_mgold$elm_nonempty_list$List_Nonempty$length(_ckoster22$elm_genetic$Advanced_MealPlannerData$allRecipes) - 1));
var _ckoster22$elm_genetic$Advanced_MealPlanner$randomMealGenerator = A4(
	_elm_lang$core$Random$map3,
	_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Meal,
	_ckoster22$elm_genetic$Advanced_MealPlanner$randomRecipeGenerator,
	A2(_elm_lang$core$Random$float, 1, 3),
	_elm_lang$core$Random$bool);
var _ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal = function (seed) {
	return A2(_elm_lang$core$Random$step, _ckoster22$elm_genetic$Advanced_MealPlanner$randomMealGenerator, seed);
};
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateBreakfastOnlyDay = F2(
	function (meal, seed) {
		var _p8 = A2(
			_elm_lang$core$Random$step,
			A2(_elm_lang$core$Random$int, 0, 4),
			seed);
		var actionId = _p8._0;
		var nextSeed = _p8._1;
		return _elm_lang$core$Native_Utils.eq(actionId, 0) ? {ctor: '_Tuple2', _0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$NoMeals, _1: nextSeed} : (_elm_lang$core$Native_Utils.eq(actionId, 1) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Lunch(meal),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 2) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Dinner(meal),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 3) ? function (_p9) {
			var _p10 = _p9;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastLunch, meal, _p10._0),
				_1: _p10._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : function (_p11) {
			var _p12 = _p11;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastDinner, meal, _p12._0),
				_1: _p12._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)))));
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateLunchOnlyDay = F2(
	function (meal, seed) {
		var _p13 = A2(
			_elm_lang$core$Random$step,
			A2(_elm_lang$core$Random$int, 0, 4),
			seed);
		var actionId = _p13._0;
		var nextSeed = _p13._1;
		return _elm_lang$core$Native_Utils.eq(actionId, 0) ? {ctor: '_Tuple2', _0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$NoMeals, _1: nextSeed} : (_elm_lang$core$Native_Utils.eq(actionId, 1) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Breakfast(meal),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 2) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Dinner(meal),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 3) ? function (_p14) {
			var _p15 = _p14;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastLunch, meal, _p15._0),
				_1: _p15._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : function (_p16) {
			var _p17 = _p16;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinner, meal, _p17._0),
				_1: _p17._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)))));
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateDinnerOnlyDay = F2(
	function (meal, seed) {
		var _p18 = A2(
			_elm_lang$core$Random$step,
			A2(_elm_lang$core$Random$int, 0, 4),
			seed);
		var actionId = _p18._0;
		var nextSeed = _p18._1;
		return _elm_lang$core$Native_Utils.eq(actionId, 0) ? {ctor: '_Tuple2', _0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$NoMeals, _1: nextSeed} : (_elm_lang$core$Native_Utils.eq(actionId, 1) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Breakfast(meal),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 2) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Lunch(meal),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 3) ? function (_p19) {
			var _p20 = _p19;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinner, meal, _p20._0),
				_1: _p20._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : function (_p21) {
			var _p22 = _p21;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastDinner, meal, _p22._0),
				_1: _p22._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)))));
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateBreakfastLunchDay = F3(
	function (meal, meal2, seed) {
		var _p23 = A2(
			_elm_lang$core$Random$step,
			A2(_elm_lang$core$Random$int, 0, 4),
			seed);
		var actionId = _p23._0;
		var nextSeed = _p23._1;
		return _elm_lang$core$Native_Utils.eq(actionId, 0) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Breakfast(meal),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 1) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Lunch(meal2),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 2) ? function (_p24) {
			var _p25 = _p24;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastLunch, meal, _p25._0),
				_1: _p25._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : (_elm_lang$core$Native_Utils.eq(actionId, 3) ? function (_p26) {
			var _p27 = _p26;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastLunch, _p27._0, meal2),
				_1: _p27._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : function (_p28) {
			var _p29 = _p28;
			var _p30 = _p29._0;
			return {
				ctor: '_Tuple2',
				_0: A3(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$AllMeals, _p30, meal2, _p30),
				_1: _p29._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)))));
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateBreakfastDinnerDay = F3(
	function (meal, meal2, seed) {
		var _p31 = A2(
			_elm_lang$core$Random$step,
			A2(_elm_lang$core$Random$int, 0, 4),
			seed);
		var actionId = _p31._0;
		var nextSeed = _p31._1;
		return _elm_lang$core$Native_Utils.eq(actionId, 0) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Breakfast(meal),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 1) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Dinner(meal2),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 2) ? function (_p32) {
			var _p33 = _p32;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastDinner, meal, _p33._0),
				_1: _p33._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : (_elm_lang$core$Native_Utils.eq(actionId, 3) ? function (_p34) {
			var _p35 = _p34;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastDinner, _p35._0, meal2),
				_1: _p35._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : function (_p36) {
			var _p37 = _p36;
			var _p38 = _p37._0;
			return {
				ctor: '_Tuple2',
				_0: A3(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$AllMeals, _p38, meal2, _p38),
				_1: _p37._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)))));
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateLunchDinnerDay = F3(
	function (meal, meal2, seed) {
		var _p39 = A2(
			_elm_lang$core$Random$step,
			A2(_elm_lang$core$Random$int, 0, 4),
			seed);
		var actionId = _p39._0;
		var nextSeed = _p39._1;
		return _elm_lang$core$Native_Utils.eq(actionId, 0) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Lunch(meal),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 1) ? {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Dinner(meal2),
			_1: nextSeed
		} : (_elm_lang$core$Native_Utils.eq(actionId, 2) ? function (_p40) {
			var _p41 = _p40;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinner, meal, _p41._0),
				_1: _p41._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : (_elm_lang$core$Native_Utils.eq(actionId, 3) ? function (_p42) {
			var _p43 = _p42;
			return {
				ctor: '_Tuple2',
				_0: A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinner, _p43._0, meal2),
				_1: _p43._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : function (_p44) {
			var _p45 = _p44;
			var _p46 = _p45._0;
			return {
				ctor: '_Tuple2',
				_0: A3(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$AllMeals, _p46, meal2, _p46),
				_1: _p45._1
			};
		}(
			_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)))));
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateNoMealsDay = function (seed) {
	var _p47 = A2(
		_elm_lang$core$Random$step,
		A2(_elm_lang$core$Random$int, 0, 2),
		seed);
	var actionId = _p47._0;
	var nextSeed = _p47._1;
	return _elm_lang$core$Native_Utils.eq(actionId, 0) ? function (_p48) {
		var _p49 = _p48;
		return {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Breakfast(_p49._0),
			_1: _p49._1
		};
	}(
		_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : (_elm_lang$core$Native_Utils.eq(actionId, 1) ? function (_p50) {
		var _p51 = _p50;
		return {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Lunch(_p51._0),
			_1: _p51._1
		};
	}(
		_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)) : function (_p52) {
		var _p53 = _p52;
		return {
			ctor: '_Tuple2',
			_0: _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Dinner(_p53._0),
			_1: _p53._1
		};
	}(
		_ckoster22$elm_genetic$Advanced_MealPlanner$getRandomMeal(nextSeed)));
};
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateDay = F2(
	function (day, seed) {
		var _p54 = day;
		switch (_p54.ctor) {
			case 'Breakfast':
				return A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateBreakfastOnlyDay, _p54._0, seed);
			case 'Lunch':
				return A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateLunchOnlyDay, _p54._0, seed);
			case 'Dinner':
				return A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateDinnerOnlyDay, _p54._0, seed);
			case 'BreakfastLunch':
				return A3(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateBreakfastLunchDay, _p54._0, _p54._1, seed);
			case 'BreakfastDinner':
				return A3(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateBreakfastDinnerDay, _p54._0, _p54._1, seed);
			case 'LunchDinner':
				return A3(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateLunchDinnerDay, _p54._0, _p54._1, seed);
			case 'AllMeals':
				return A4(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateAllMealsDay, _p54._0, _p54._1, _p54._2, seed);
			default:
				return _ckoster22$elm_genetic$Advanced_MealPlanner$mutateNoMealsDay(seed);
		}
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$mutateMealplan = F2(
	function (seed, mealPlan) {
		var _p55 = A2(
			_elm_lang$core$Random$step,
			A2(_elm_lang$core$Random$int, 1, 7),
			seed);
		var randDay = _p55._0;
		var seed2 = _p55._1;
		return _elm_lang$core$Native_Utils.eq(randDay, 1) ? function (_p56) {
			var _p57 = _p56;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					mealPlan,
					{sunday: _p57._0}),
				_1: _p57._1
			};
		}(
			A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateDay, mealPlan.sunday, seed2)) : (_elm_lang$core$Native_Utils.eq(randDay, 2) ? function (_p58) {
			var _p59 = _p58;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					mealPlan,
					{monday: _p59._0}),
				_1: _p59._1
			};
		}(
			A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateDay, mealPlan.monday, seed2)) : (_elm_lang$core$Native_Utils.eq(randDay, 3) ? function (_p60) {
			var _p61 = _p60;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					mealPlan,
					{tuesday: _p61._0}),
				_1: _p61._1
			};
		}(
			A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateDay, mealPlan.tuesday, seed2)) : (_elm_lang$core$Native_Utils.eq(randDay, 4) ? function (_p62) {
			var _p63 = _p62;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					mealPlan,
					{wednesday: _p63._0}),
				_1: _p63._1
			};
		}(
			A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateDay, mealPlan.wednesday, seed2)) : (_elm_lang$core$Native_Utils.eq(randDay, 5) ? function (_p64) {
			var _p65 = _p64;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					mealPlan,
					{thursday: _p65._0}),
				_1: _p65._1
			};
		}(
			A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateDay, mealPlan.thursday, seed2)) : (_elm_lang$core$Native_Utils.eq(randDay, 6) ? function (_p66) {
			var _p67 = _p66;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					mealPlan,
					{friday: _p67._0}),
				_1: _p67._1
			};
		}(
			A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateDay, mealPlan.friday, seed2)) : function (_p68) {
			var _p69 = _p68;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					mealPlan,
					{saturday: _p69._0}),
				_1: _p69._1
			};
		}(
			A2(_ckoster22$elm_genetic$Advanced_MealPlanner$mutateDay, mealPlan.saturday, seed2)))))));
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$randomDayGenerator = A5(
	_elm_lang$core$Random$map4,
	F4(
		function (randInt, meal1, meal2, meal3) {
			return _elm_lang$core$Native_Utils.eq(randInt, 1) ? _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Breakfast(meal1) : (_elm_lang$core$Native_Utils.eq(randInt, 2) ? _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Lunch(meal1) : (_elm_lang$core$Native_Utils.eq(randInt, 3) ? _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$Dinner(meal1) : (_elm_lang$core$Native_Utils.eq(randInt, 4) ? A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastLunch, meal1, meal2) : (_elm_lang$core$Native_Utils.eq(randInt, 5) ? A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$BreakfastDinner, meal1, meal2) : (_elm_lang$core$Native_Utils.eq(randInt, 6) ? A2(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$LunchDinner, meal1, meal2) : (_elm_lang$core$Native_Utils.eq(randInt, 7) ? A3(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$AllMeals, meal1, meal2, meal3) : _ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$NoMeals))))));
		}),
	A2(_elm_lang$core$Random$int, 1, 8),
	_ckoster22$elm_genetic$Advanced_MealPlanner$randomMealGenerator,
	_ckoster22$elm_genetic$Advanced_MealPlanner$randomMealGenerator,
	_ckoster22$elm_genetic$Advanced_MealPlanner$randomMealGenerator);
var _ckoster22$elm_genetic$Advanced_MealPlanner$randomMealPlannerGenerator = A2(
	_elm_lang$core$Random$map,
	function (_p70) {
		var _p71 = _p70;
		return A7(_ckoster22$elm_genetic$Advanced_Models_MealPlannerModel$MealPlan, _p71._1._0, _p71._1._1, _p71._1._2, _p71._1._3, _p71._1._4, _p71._1._5, _p71._0);
	},
	A2(
		_elm_lang$core$Random$pair,
		_ckoster22$elm_genetic$Advanced_MealPlanner$randomDayGenerator,
		A2(
			_elm_lang$core$Random$map,
			function (_p72) {
				var _p73 = _p72;
				return {ctor: '_Tuple6', _0: _p73._1._0, _1: _p73._1._1, _2: _p73._1._2, _3: _p73._1._3, _4: _p73._1._4, _5: _p73._0};
			},
			A2(
				_elm_lang$core$Random$pair,
				_ckoster22$elm_genetic$Advanced_MealPlanner$randomDayGenerator,
				A2(
					_elm_lang$core$Random$map,
					function (_p74) {
						var _p75 = _p74;
						return {ctor: '_Tuple5', _0: _p75._1._0, _1: _p75._1._1, _2: _p75._1._2, _3: _p75._1._3, _4: _p75._0};
					},
					A2(
						_elm_lang$core$Random$pair,
						_ckoster22$elm_genetic$Advanced_MealPlanner$randomDayGenerator,
						A2(
							_elm_lang$core$Random$map,
							function (_p76) {
								var _p77 = _p76;
								return {ctor: '_Tuple4', _0: _p77._1._0, _1: _p77._1._1, _2: _p77._1._2, _3: _p77._0};
							},
							A2(
								_elm_lang$core$Random$pair,
								_ckoster22$elm_genetic$Advanced_MealPlanner$randomDayGenerator,
								A2(
									_elm_lang$core$Random$map,
									function (_p78) {
										var _p79 = _p78;
										return {ctor: '_Tuple3', _0: _p79._1._0, _1: _p79._1._1, _2: _p79._0};
									},
									A2(
										_elm_lang$core$Random$pair,
										_ckoster22$elm_genetic$Advanced_MealPlanner$randomDayGenerator,
										A2(_elm_lang$core$Random$pair, _ckoster22$elm_genetic$Advanced_MealPlanner$randomDayGenerator, _ckoster22$elm_genetic$Advanced_MealPlanner$randomDayGenerator)))))))))));
var _ckoster22$elm_genetic$Advanced_MealPlanner$update = F2(
	function (msg, model) {
		var _p80 = msg;
		var _p81 = _ckoster22$elm_genetic$Genetic$evolveSolution(
			{
				randomDnaGenerator: _ckoster22$elm_genetic$Advanced_MealPlanner$randomMealPlannerGenerator,
				evaluateOrganism: _ckoster22$elm_genetic$Advanced_MealPlanner$evaluateOrganism,
				crossoverDnas: _ckoster22$elm_genetic$Advanced_MealPlanner$crossoverMealplans,
				mutateDna: _ckoster22$elm_genetic$Advanced_MealPlanner$mutateMealplan,
				isDoneEvolving: _ckoster22$elm_genetic$Advanced_MealPlanner$isDoneEvolving,
				initialSeed: _elm_lang$core$Random$initialSeed(model.initialSeed),
				method: _ckoster22$elm_genetic$Genetic$MinimizePenalty
			});
		return A2(
			_elm_lang$core$Platform_Cmd_ops['!'],
			model,
			{ctor: '[]'});
	});
var _ckoster22$elm_genetic$Advanced_MealPlanner$Model = function (a) {
	return {initialSeed: a};
};
var _ckoster22$elm_genetic$Advanced_MealPlanner$Begin = {ctor: 'Begin'};
var _ckoster22$elm_genetic$Advanced_MealPlanner$init = function (json) {
	var startThingsMsg = A2(
		_elm_lang$core$Task$perform,
		function (_p82) {
			return _ckoster22$elm_genetic$Advanced_MealPlanner$Begin;
		},
		_elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing));
	var initialSeed = function () {
		var _p83 = A2(
			_elm_lang$core$Json_Decode$decodeValue,
			A2(_elm_lang$core$Json_Decode$field, 'currentTimeInMillis', _elm_lang$core$Json_Decode$int),
			json);
		if (_p83.ctor === 'Ok') {
			return _p83._0;
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'Advanced.MealPlanner',
				{
					start: {line: 33, column: 13},
					end: {line: 38, column: 84}
				},
				_p83)(
				A2(_elm_lang$core$Basics_ops['++'], 'Unable to decode program arguments: ', _p83._0));
		}
	}();
	return A2(
		_elm_lang$core$Platform_Cmd_ops['!'],
		{initialSeed: initialSeed},
		{
			ctor: '::',
			_0: startThingsMsg,
			_1: {ctor: '[]'}
		});
};
var _ckoster22$elm_genetic$Advanced_MealPlanner$main = _elm_lang$core$Platform$programWithFlags(
	{
		init: _ckoster22$elm_genetic$Advanced_MealPlanner$init,
		update: _ckoster22$elm_genetic$Advanced_MealPlanner$update,
		subscriptions: function (_p85) {
			return _elm_lang$core$Platform_Sub$none;
		}
	})(_elm_lang$core$Json_Decode$value);

var Elm = {};
Elm['Advanced'] = Elm['Advanced'] || {};
Elm['Advanced']['MealPlanner'] = Elm['Advanced']['MealPlanner'] || {};
if (typeof _ckoster22$elm_genetic$Advanced_MealPlanner$main !== 'undefined') {
    _ckoster22$elm_genetic$Advanced_MealPlanner$main(Elm['Advanced']['MealPlanner'], 'Advanced.MealPlanner', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

