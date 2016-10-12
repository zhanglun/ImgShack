import Hmacsha1 from 'hmacsha1'
import Config from '../config/config'

/**
 * 生成七牛 上传token
 * @param  {Object} params 可选参数
 * @param  {Number} expires=0 有效时间
 * @returns String
 */
export const createToken = (params, expires = 0) => {
  let flags = {
    callbackBody: undefined,
    callbackBodyType: undefined,
    callbackFetchKey: undefined,
    callbackHost: undefined,
    callbackUrl: undefined,
    deadline: undefined,
    detectMime: undefined,
    fsizeLimit: undefined,
    insertOnly: undefined,
    mimeLimit: undefined,
    persistentPipeline: undefined,
    saveKey: undefined,
    scope: undefined
  };
  flags = Object.assign(flags, params);
  flags['deadline'] = expires + Math.floor(Date.now() / 1000);
  let encodedFlags = base64_encode(JSON.stringify(flags));
  let encoded = Hmacsha1(Config.SECRET_KEY, encodedFlags);
  // base64ToUrlSafe
  let encodedSign = encoded.replace(/\//g, '_').replace(/\+/g, '-');
  return Config.ACCESS_KEY + ':' + encodedSign + ':' + encodedFlags;
};

function base64_encode(data) {
  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data = utf8_encode(data + '');

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  switch (data.length % 3) {
    case 1:
      enc = enc.slice(0, -2) + '==';
      break;
    case 2:
      enc = enc.slice(0, -1) + '=';
      break;
  }

  return enc;
};

 function utf8_encode(argString) {
  if (argString === null || typeof argString === 'undefined') {
    return '';
  }

  var string = (argString + ''); // .replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  var utftext = '',
    start, end, stringl = 0;

  start = end = 0;
  stringl = string.length;
  for (var n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n);
    var enc = null;

    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(
        (c1 >> 6) | 192, (c1 & 63) | 128
      );
    } else if (c1 & 0xF800 ^ 0xD800 > 0) {
      enc = String.fromCharCode(
        (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      );
    } else { // surrogate pairs
      if (c1 & 0xFC00 ^ 0xD800 > 0) {
        throw new RangeError('Unmatched trail surrogate at ' + n);
      }
      var c2 = string.charCodeAt(++n);
      if (c2 & 0xFC00 ^ 0xDC00 > 0) {
        throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
      }
      c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
      enc = String.fromCharCode(
        (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      );
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.slice(start, end);
      }
      utftext += enc;
      start = end = n + 1;
    }
  }

  if (end > start) {
    utftext += string.slice(start, stringl);
  }

  return utftext;
};

