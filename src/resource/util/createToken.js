import Hmacsha1 from 'hmacsha1'
import Base64 from 'base64-url'
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
  let encodedFlags = Base64.encode(JSON.stringify(flags));
  let encoded = Hmacsha1(Config.SECRET_KEY, encodedFlags);
  // base64ToUrlSafe
  encoded = encoded.replace(/\//g, '_').replace(/\+/g, '-');
  let encodedSign = encoded.replace(/\//g, '_').replace(/\+/g, '-');
  return Config.ACCESS_KEY + ':' + encodedSign + ':' + encodedFlags;
};


