import Util from './util/util'


//要上传的空间
var bucket = 'Bucket_Name';

//上传到七牛后保存的文件名
var key = 'my-nodejs-logo.png';
var param = {};
param.scope = bucket+":"+key;
param.callbackUrl = 'http://your.domain.com/callback';
param.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
console.log(Util.getToken(param));
