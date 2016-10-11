import Hmacsha1 from 'hmacsha1'
import Base64 from 'base64-url'
import Config from '../config/config'

const util = {
  /**
   * 获取七牛token
   * @param  {Object} params 可选参数
   * @param  {Number} expires=0 有效时间
   * @returns encodedFlags
   */
  getToken:(params, expires = 0) => {
    var flags = {
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
    var encodedFlags = Base64.encode(JSON.stringify(flags));
    var encoded = Hmacsha1(Config.SECRET_KEY, encodedFlags);
    // base64ToUrlSafe
    encoded = encoded.replace(/\//g, '_').replace(/\+/g, '-');
    var encodedSign = encoded.replace(/\//g, '_').replace(/\+/g, '-');
    var uploadToken = Config.ACCESS_KEY + ':' + encodedSign + ':' + encodedFlags;
    return uploadToken;
  }
};

export default util;
