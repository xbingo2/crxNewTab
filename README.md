# NewTab Chrome插件

### 1、插件功能

#### 1.1、chrome插件-自定义新标签页

![image-20210730093942235](C:\Users\xubin\AppData\Roaming\Typora\typora-user-images\image-20210730093942235.png)

新标签页效果如上图所示，如果用户想修改，可自行替换项目中的new.html,重启chrome即可。

#### 1.2、网站右键和复制功能的限制

部分网页在复制或者使用浏览器默认右键菜单时做了限制，如http://www.360doc.com/ 在复制时会弹出登录框，要求先登录。

本插件通过注入js将网页中的"onselectstart", "oncopy", "onpaste", "onkeydown", "oncontextmenu", "onmousemove", "ondragstart", "onmousedown"事件全置为null。***如果在使用中出现复制或右键菜单不正常请暂时关闭插件。***

#### 1.3、csdn复制代码时去除添加的版权信息

csdn在复制代码时会添加上博主的版权信息，让开发不便。经过对其网页源码的查看，发现其使用了https://g.csdnimg.cn/copyright/1.0.4/copyright.js 这样的一个文件在复制时会添加版权信息。看其中的代码发现，只有在复制文本超过140个字符时才会添加。

本插件实现去除版权信息的原理是使用了chrome.webRequest.onBeforeRequest.addListener，即为为浏览器发送请求前添加监听，过滤掉请求类型为script，url包含copyright的请求。目前仅过滤了csdn，后续用户发现其他同样添加版权信息的网页可自行添加或联系本人。拦截代码在block.js文件中。

上述原理同样也可以用来过滤网页广告。不过目前网页广告种类多，个人能力有限，本想在插件中添加广告拦截功能，奈何实现难度高。请大家自行安装广告拦截插件adblock或adblock plus。安装插件请前往官网下载，插件的权限很高，基本上可以控制浏览器所有的功能，谨防恶意插件。广告拦截插件不仅可以去除广告，很大程度上也可以保证安全。

#### 1.4、漫画、影视更新提醒

现在仅支持https://www.80s.tw/（影视类下载网站，资源比较新）、http://www.mangabz.com/（漫画网站，主要为日本漫画更新较快）、http://www.alimanhua.com/（漫画网站，主要看镇魂街），都是本人自己使用的网站（相同类型的下载和漫画网站垃圾广告较多，最好在安装广告拦截插件之后访问）

本插件实现原理为定时发送请求（在这里请求使用的是js的fetch,fetch可以跨域，这里为什么会跨域呢？因为插件本质上为网站，其地址为chrome-extension://插件ID/background.html,这里域名和其他网站不一样就会出现跨域访问的问题）去获取配置的上述三个网站中想看的资源url，解析返回数据中最新的目录和localstorage中比较，如果有更新则会有桌面弹窗提醒，点击弹窗即可打开对象资源页面，最快获取更新内容。代码位置为background.js中。目前在每次打开chrome浏览器时会自动检测一次，定时任务会每个小时检查一下。配置想看的资源目前还不人性化，通过json配置，配置界面和如何打开如下图所示，配置页代码为options.html

![image-20210730101943492](C:\Users\xubin\AppData\Roaming\Typora\typora-user-images\image-20210730101943492.png)

![image-20210730102103058](C:\Users\xubin\AppData\Roaming\Typora\typora-user-images\image-20210730102103058.png)

配置目前使用的是json方式，配置如下

```json
{
    "mangabz":[
        {
            "name":"一拳超人",
            "type":"mangabz",
            "url":"http://www.mangabz.com/38bz"
        },
        {
            "name":"镇魂街",
            "type":"alimanhua",
            "url":"http://www.alimanhua.com/manhua/20/"
        },
        {
            "name":"画江湖之不良人4",
            "type":"80s",
            "url":"https://www.80s.tw/dm/27531/bd-1"
        }
    ]
}
```

目前配置存在chrome.storage中，chrome.storage的好处是会同步到chrome账户中。如果该插件哪天上架Chrome应用商店即可登录用户账号同步使用配置数据，无需再次添加。

### 2、使用方法

打开chrome的扩展程序店家加载已解压的拓展程序，选择插件文件夹即可，现在Chrome对插件的管理比较严格未上架的插件通过crx无法直接安装，本插件无毒无害请放心使用。

### 3、结语

用户如果有好的想法可以联系本人，将功能添加到该插件中，本插件的出现主要是看到某个插件可以自定义chrome的新标签页，觉得这个还挺不错的，是不是可以自己也弄一个。经过搜索发现一个chrome插件入门的好博文，分享给大家https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html，跟着做一般相信大家也可以写出插件。



