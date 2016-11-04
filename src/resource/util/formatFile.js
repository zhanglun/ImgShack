import moment from 'moment';
import { createThumbnailLink } from './qiniuUtil';

/**
 * 格式化文件大小
 * @param bytes
 * @returns {string}
 */
function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + ' Bytes';
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(3) + ' KB';
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(3) + ' MB';
  } else {
    return (bytes / 1073741824).toFixed(3) + ' GB';
  }
}

export const formatFile = (files) => {
  if (!files) {
    return false;
  }
  let list = [].concat(files);
  return list.map((file) => {
    file.size = formatFileSize(file.size);
    file.upload_at = moment(file.upload_at).format('YYYY-MM-DD HH:mm:ss');
    file.thumbnail = createThumbnailLink(file.url, 160, 160);
    return file;
  });
};
