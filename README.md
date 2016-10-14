# ImgShack

图片上传工具


### 开发规范

* HTML，CSS，js，vue文件缩进两个空格
* CSS命名规范参照BEM

```css
.block {}
.block__element {}
.block--modifier {}
```

* js用ES6，写好注释

### TODO

####  v1.0.0

主要功能：上传，上传记录，设置

##### 上传

[] 拖拽，点击按钮或者粘贴剪切板截图上传图片
[] 上传成功返回图片外链链接，提供复制外链链接按钮
[] 上传进度条
[] 上传成功后，在上传界面显示本次上传的临时记录，保存上传记录
[] 上传相关提示（成功，失败，失败原因）

##### 上传记录

[] 显示所有上传图片记录。文件原名，缩略图，外链链接，文件大小，上传时间，复制外链按钮
[] 上传记录简单的统计信息（总共多少文件）

##### 设置

[] 设置构建token所需参数（acces_key等）
[] 设置外链按钮复制的格式（markdown或者url）
[] 设置数据保存在本地
[] 写好设置引导说明



### License [CC0 (Public Domain)](LICENSE.md)


