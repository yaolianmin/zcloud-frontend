/*********************共享密钥，生成密钥Start***************************/

var ascii = "01234567890123456789012345678901" +
			" !\'#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
			"[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
			
var state = new Array(4), count = new Array(0, 0), buffer = new Array(64), transformBuffer = new Array(16), digestBits = new Array(16),
	S11 = 7, S12 = 12, S13 = 17, S14 = 22, S21 = 5, S22 = 9, S23 = 14, S24 = 20, S31 = 4, S32 = 11, S33 = 16, S34 = 23,
	S41 = 6, S42 = 10, S43 = 15, S44 = 21;
	
function integer(n)
{
	return n % (0xffffffff+1);
}
			
function hexb(n)
{
	var hexa_h = "0123456789ABCDEF", hexa_c = "", hexa_m = n;
	for (var hexa_i = 0; hexa_i < 2; hexa_i++)
	{
		hexa_c = hexa_h.charAt(Math.abs(hexa_m) % 16) + hexa_c;
		hexa_m = Math.floor(hexa_m / 16);
	}
	return hexa_c;
}

function hexa(n)
{
	var hexa_h = "0123456789abcdef", hexa_c = "", hexa_m = n;
	for (var hexa_i = 0; hexa_i < 8; hexa_i++)
	{
		hexa_c = hexa_h.charAt(Math.abs(hexa_m) % 16) + hexa_c;
		hexa_m = Math.floor(hexa_m / 16);
	}
	return hexa_c;
}

function shr(a, b)
{
	a = integer(a);
	b = integer(b);
	if (a - 0x80000000 >= 0)
	{
		a = a % 0x80000000;
		a >>= b;
		a += 0x40000000 >> (b-1);
	}
	else
		a >>= b;
	return a;
}

function shl1(a)
{
	a = a % 0x80000000;
	if (a & 0x40000000 == 0x40000000)
	{
		a -= 0x40000000;
		a *= 2;
		a += 0x80000000;
	}
	else
		a *= 2;
	return a;
}

function shl(a, b)
{
	a = integer(a);
	b = integer(b);
	for (var i = 0; i < b; i++)
		a = shl1(a);
	return a;
}

function and(a, b)
{
	a = integer(a);
	b = integer(b);
	var t1 = a-0x80000000, t2 = b-0x80000000;
	if (t1 >= 0)
		if (t2 >= 0)
			return (t1 & t2) + 0x80000000;
		else
			return t1 & b;
	else
		if (t2 >= 0)
			return a & t2;
		else
			return a & b;
}

function or(a, b)
{
	a = integer(a);
	b = integer(b);
	var t1 = a - 0x80000000, t2 = b - 0x80000000;
	if (t1 >= 0)
		if (t2 >= 0)
			return (t1 | t2) + 0x80000000;
		else
			return (t1 | b) + 0x80000000;
	else
		if (t2 >= 0)
			return (a | t2) + 0x80000000;
		else
			return a | b;
}

function xor(a, b)
{
	a = integer(a);
	b = integer(b);
	var t1 = a - 0x80000000, t2 = b - 0x80000000;
	if (t1 >= 0)
		if (t2 >= 0)
			return t1 ^ t2;
		else
			return (t1 ^ b) + 0x80000000;
	else
		if (t2 >= 0)
			return (a ^ t2) + 0x80000000;
		else
			return a ^ b;
}

function not(a)
{
	a = integer(a);
	return 0xffffffff - a;
}

function F(x, y, z)
{
	return or(and(x, y), and(not(x), z));
}

function G(x, y, z)
{
	return or(and(x, z), and(y, not(z)));
}

function H(x, y, z)
{
	return xor(xor(x, y), z);
}

function I(x, y, z)
{
	return xor(y ,or(x , not(z)));
}

function rotateLeft(a, n)
{
	return or(shl(a, n), shr(a, 32-n));
}

function FF(a, b, c, d, x, s, ac)
{
	a += F(b, c, d) + x + ac;
	a = rotateLeft(a, s);
	a += b;
	return a;
}

function GG(a, b, c, d, x, s, ac)
{
	a += G(b, c, d) +x + ac;
	a = rotateLeft(a, s);
	a += b;
	return a;
}

function HH(a, b, c, d, x, s, ac)
{
	a += H(b, c, d) + x + ac;
	a = rotateLeft(a, s);
	a += b;
	return a;
}

function II(a, b, c, d, x, s, ac)
{
	a += I(b, c, d) + x + ac;
	a = rotateLeft(a, s);
	a += b;
	return a;
}

function transform(buf, offset)
{
	var a = 0, b = 0, c = 0, d = 0, x = transformBuffer;
	a = state[0];
	b = state[1];
	c = state[2];
	d = state[3];
	for (var i = 0; i < 16; i++)
	{
		x[i] = and(buf[i*4+offset], 0xff);
		for (var j = 1; j < 4; j++)
			x[i] += shl(and(buf[i*4+j+offset], 0xff), j*8);
	}
	
	a = FF(a, b, c, d, x[ 0], S11, 0xd76aa478);
	d = FF(d, a, b, c, x[ 1], S12, 0xe8c7b756);
	c = FF(c, d, a, b, x[ 2], S13, 0x242070db);
	b = FF(b, c, d, a, x[ 3], S14, 0xc1bdceee);
	a = FF(a, b, c, d, x[ 4], S11, 0xf57c0faf);
	d = FF(d, a, b, c, x[ 5], S12, 0x4787c62a);
	c = FF(c, d, a, b, x[ 6], S13, 0xa8304613);
	b = FF(b, c, d, a, x[ 7], S14, 0xfd469501);
	a = FF(a, b, c, d, x[ 8], S11, 0x698098d8);
	d = FF(d, a, b, c, x[ 9], S12, 0x8b44f7af);
	c = FF(c, d, a, b, x[10], S13, 0xffff5bb1);
	b = FF(b, c, d, a, x[11], S14, 0x895cd7be);
	a = FF(a, b, c, d, x[12], S11, 0x6b901122);
	d = FF(d, a, b, c, x[13], S12, 0xfd987193);
	c = FF(c, d, a, b, x[14], S13, 0xa679438e);
	b = FF(b, c, d, a, x[15], S14, 0x49b40821);
	a = GG(a, b, c, d, x[ 1], S21, 0xf61e2562);
	d = GG(d, a, b, c, x[ 6], S22, 0xc040b340);
	c = GG(c, d, a, b, x[11], S23, 0x265e5a51);
	b = GG(b, c, d, a, x[ 0], S24, 0xe9b6c7aa);
	a = GG(a, b, c, d, x[ 5], S21, 0xd62f105d);
	d = GG(d, a, b, c, x[10], S22, 0x02441453);
	c = GG(c, d, a, b, x[15], S23, 0xd8a1e681);
	b = GG(b, c, d, a, x[ 4], S24, 0xe7d3fbc8);
	a = GG(a, b, c, d, x[ 9], S21, 0x21e1cde6);
	d = GG(d, a, b, c, x[14], S22, 0xc33707d6);
	c = GG(c, d, a, b, x[ 3], S23, 0xf4d50d87);
	b = GG(b, c, d, a, x[ 8], S24, 0x455a14ed);
	a = GG(a, b, c, d, x[13], S21, 0xa9e3e905);
	d = GG(d, a, b, c, x[ 2], S22, 0xfcefa3f8);
	c = GG(c, d, a, b, x[ 7], S23, 0x676f02d9);
	b = GG(b, c, d, a, x[12], S24, 0x8d2a4c8a);
	a = HH(a, b, c, d, x[ 5], S31, 0xfffa3942);
	d = HH(d, a, b, c, x[ 8], S32, 0x8771f681);
	c = HH(c, d, a, b, x[11], S33, 0x6d9d6122);
	b = HH(b, c, d, a, x[14], S34, 0xfde5380c);
	a = HH(a, b, c, d, x[ 1], S31, 0xa4beea44);
	d = HH(d, a, b, c, x[ 4], S32, 0x4bdecfa9);
	c = HH(c, d, a, b, x[ 7], S33, 0xf6bb4b60);
	b = HH(b, c, d, a, x[10], S34, 0xbebfbc70);
	a = HH(a, b, c, d, x[13], S31, 0x289b7ec6);
	d = HH(d, a, b, c, x[ 0], S32, 0xeaa127fa);
	c = HH(c, d, a, b, x[ 3], S33, 0xd4ef3085);
	b = HH(b, c, d, a, x[ 6], S34, 0x04881d05);
	a = HH(a, b, c, d, x[ 9], S31, 0xd9d4d039);
	d = HH(d, a, b, c, x[12], S32, 0xe6db99e5);
	c = HH(c, d, a, b, x[15], S33, 0x1fa27cf8);
	b = HH(b, c, d, a, x[ 2], S34, 0xc4ac5665);
	a = II(a, b, c, d, x[ 0], S41, 0xf4292244);
	d = II(d, a, b, c, x[ 7], S42, 0x432aff97);
	c = II(c, d, a, b, x[14], S43, 0xab9423a7);
	b = II(b, c, d, a, x[ 5], S44, 0xfc93a039);
	a = II(a, b, c, d, x[12], S41, 0x655b59c3);
	d = II(d, a, b, c, x[ 3], S42, 0x8f0ccc92);
	c = II(c, d, a, b, x[10], S43, 0xffeff47d);
	b = II(b, c, d, a, x[ 1], S44, 0x85845dd1);
	a = II(a, b, c, d, x[ 8], S41, 0x6fa87e4f);
	d = II(d, a, b, c, x[15], S42, 0xfe2ce6e0);
	c = II(c, d, a, b, x[ 6], S43, 0xa3014314);
	b = II(b, c, d, a, x[13], S44, 0x4e0811a1);
	a = II(a, b, c, d, x[ 4], S41, 0xf7537e82);
	d = II(d, a, b, c, x[11], S42, 0xbd3af235);
	c = II(c, d, a, b, x[ 2], S43, 0x2ad7d2bb);
	b = II(b, c, d, a, x[ 9], S44, 0xeb86d391);
	state[0] += a;
	state[1] += b;
	state[2] += c;
	state[3] += d;
}

function init()
{
	count[0] = count[1] = 0;
	state[0] = 0x67452301;
	state[1] = 0xefcdab89;
	state[2] = 0x98badcfe;
	state[3] = 0x10325476;
	for (var i = 0; i < digestBits.length; i++)
		digestBits[i] = 0;
}

function update(b)
{
	var index, i;
	index = and(shr(count[0], 3), 0x3f);
	if (count[0] < 0xffffffff-7)
		count[0] += 8;
	else
	{
		count[1]++;
		count[0] -= 0xffffffff+1;
		count[0] += 8;
	}
	buffer[index] = and(b, 0xff);
	if (index >= 63)
		transform(buffer, 0);
}

function finish()
{
	var bits = new Array(8), padding, i = 0, index = 0, padLen = 0;
	for (i = 0; i < 4; i++)
		bits[i] = and(shr(count[0], i*8), 0xff);
	for (i = 0; i < 4; i++)
		bits[i+4] = and(shr(count[1], i*8), 0xff);
	index = and(shr(count[0], 3), 0x3f);
	padLen = (index < 56) ? 56 - index : 120 - index;
	padding = new Array(64);
	padding[0] = 0x80;
	for (i = 0; i < padLen; i++)
		update(padding[i]);
	for (i = 0; i < 8; i++)
		update(bits[i]);
	for (i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			digestBits[i*4+j] = and(shr(state[i], j*8), 0xff);
}

function MD5(entree)
{
	var l, s, k, ka, kb, kc, kd, i;
	init();
	for (k = 0; k < entree.length; k++)
	{
		l = entree.charAt(k);
		update(ascii.lastIndexOf(l));
	}
	finish();
	ka = kb = kc = kd = 0;
	for (i = 0;	i < 4;	i++)	ka += shl(digestBits[15-i], i*8);
	for (i = 4;	i < 8;	i++)	kb += shl(digestBits[15-i], (i-4)*8);
	for (i = 8;	i < 12;	i++)	kc += shl(digestBits[15-i], (i-8)*8);
	for (i = 12;i < 16;	i++)	kd += shl(digestBits[15-i], (i-12)*8);
	s = hexa(kd) + hexa(kc) + hexa(kb) + hexa(ka);
	return s;
}

/*function doKeyValue(val, flag)
{
	var i;
	val.maxLength = flag ? document.getElementById("id_DataEncryption_to_Bridge_edit").value / 4 : 39;
	for (i = 0; i < val.value.length; i++)
		if (val.value.charAt(i) != '*')
			return;
	val.value = "";
}*/


function gen_11g_keys(vm,a,b)
{
	if( fun_validatePassphrase(b) == false )
		return 'error';

	//var v = document.getElementById("id_Passphrase_to_Bridge_edit").value;
	//var klen = document.getElementById("id_DataEncryption_to_Bridge_edit").value;
	var v = b;
	var klen = a;

	var seed = 0;
	var keybyte;
	var pp64;
	var pseed = new Array(4);
	var key = new Array(4);
	var i;
	var j; 
	var k;
	//console.log('########### v ############',v);
	//console.log('########### klen ############',klen);
	
	//document.getElementById("id_key1_input_to_Bridge_edit").value = "";
	//document.getElementById("id_key2_input_to_Bridge_edit").value = "";
	//document.getElementById("id_key3_input_to_Bridge_edit").value = "";
	//document.getElementById("id_key4_input_to_Bridge_edit").value = "";
	//if (0 == v.length || v.length > 64 || klen == 0)
	//	return;

	if (klen == 40)
	{
		for (i = 0; i < v.length; i++)
			pseed[i%4] ^= ascii.lastIndexOf(v.charAt(i));
		seed += pseed[0];
		seed += pseed[1] << 8;
		seed += pseed[2] << 16;
		seed += pseed[3] << 24;
		for (j = 0; j < 4; j++)
		{
			k = "";
			for(i=0; i<5; i++)
			{
				seed = (214013 * seed + 0x269EC3) & 0xFFFFFF;
				keybyte = hexb(seed >> 16);
				if (keybyte.length == 1)
					k += "0" + keybyte;
				else
					k += keybyte;
			}
			key[j] = k;
		}
	}
	else
	{
		k = "";
		pp64 = "";
		for (i = 0; i < 64; i++)
			pp64 += v.charAt(i%(v.length));
		k = MD5(pp64);
		key[0] = k.toUpperCase().substr(0, klen/4);
		key[1] = key[0];
		key[2] = key[0];
		key[3] = key[0];
	}
	//document.getElementById("id_key1_input_to_Bridge_edit").value = key[0];
	//document.getElementById("id_key2_input_to_Bridge_edit").value = key[1];
	//document.getElementById("id_key3_input_to_Bridge_edit").value = key[2];
	//document.getElementById("id_key4_input_to_Bridge_edit").value = key[3];
	//console.log('###### key0 ######',key[0]);
	//console.log('###### key1 ######',key[1]);
	//console.log('###### key2 ######',key[2]);
	//console.log('###### key3 ######',key[3]);
	var key_arr = {};
	vm.$set(key_arr, 'key1',key[0]);
	vm.$set(key_arr, 'key2',key[1]);
	vm.$set(key_arr, 'key3',key[2]);
	vm.$set(key_arr, 'key4',key[3]);
	return key_arr;
}
//Encryption End


//Validate Passphrase
function fun_validatePassphrase(b)
{
	//var val = document.getElementById("id_Passphrase_to_Bridge_edit").value;
	var val = b;

	var patrn_Passphrase = /^([a-zA-Z0-9]|[\~\!\@\#\$\%\^\&\*\(\)\_\+\`\-\=\[\]\|\{\}\;\:\,\.\/]){1,64}$/;
	//console.log('###### patrn_Passphrase.exec(val) #########',patrn_Passphrase.exec(val));
	if( !patrn_Passphrase.exec(val) )
	{
		//document.getElementById("id_Passphrase_err").style.display="";
		
		/*document.getElementById("id_key1_input_to_Bridge_edit").value="";
		document.getElementById("id_key2_input_to_Bridge_edit").value="";
		document.getElementById("id_key3_input_to_Bridge_edit").value="";
		document.getElementById("id_key4_input_to_Bridge_edit").value="";*/
		//console.log('###### false #########');
		return false;
	}
	else
	{
		//document.getElementById("id_Passphrase_err").style.display="none";
		//console.log('####### true #########');
		return true;
	}
	
}

/*********************共享密钥，生成密钥END***************************/


export default {
	gen_11g_keys
}