- update notice

公司内部的系统，代码托管在gitlab，想直接在gitlab上做更新，不行，自己搭了一个服务器可以，页面读取yml发现和gitlab的不同，不是纯文本(raw&blob)。

https://raw.githubusercontent.com/xiaohesong/electron-auto-update/master/dist/latest.yml

比如这个链接就可以。

[gitlab private repo does't work](https://github.com/electron-userland/electron-builder/issues/3076)

这个已经修复，我目前的版本是:

```json
"electron-updater": "3.0.2",
"electron": "^2.0.3",
"electron-builder": "20.23.1",
```

- react code splitting

这个不可以工作，是因为[browserHistory different hashHistory](https://github.com/electron-userland/electron-builder/issues/2167)
