# barkymusic

### 环境要求 需要 NodeJS 8.12+ 环境

### 下载

```
$ git https://github.com/LurzyQyQ/barkymusic_player_vue.git

$ npm install
```

### 运行
```
$ npm run serve
```

### API文档

https://github.com/Binaryify/NeteaseCloudMusicApi

## 功能
1. 登录
2. 退出登录
3. 用户信息, 歌单，收藏，数量   
4. 用户歌单   
5. 用户等级  
6. 用户头像  
7. mv播放  
8. mv详情   
9. mv评论  
10. mv收藏  
11. mv点赞  
12. mv进度条  
13. 主页推荐歌单  
14. 歌单详情  
15. 歌曲播放  
16. 歌单播放顺序   
17. 歌单随机播放  
18. 歌单顺序播放  
19. 单曲循环播放  
20. 删除歌单
21. 歌曲歌词  
22. 歌曲进度条  
23. 选择上一首歌曲  
24. 选择下一首歌曲  
25. 搜索功能  
26. 综合搜索  
27. 单曲搜索   

## 使用到的技术点

1. vue-router路由  
2. vue-cli脚手架
3. vue路由守卫
4. vuex
5. axios进行网络请求    
6. vant Loading (加载提示)  
7. vant Swipe轮播图   
8. 组件间通信（添加商品至购物车时，购物车数量要改变）  

## 项目打包

$ npm run build即可完成打包

### 打包时要考虑的问题

dist文件夹太大？
``` 
1. 代码压缩：  
使用webpack中的uglifyjs-webpack-plugin插件(1.6M->852kb)  
vant按需引入（852kb－>459kb)    
```
```
2. 提取css插件，设置名称
使用插件extract-text-webpack-plugin提取css插件，设置名称new ExtractTextPlugin("[contenthash].css"),  
```
```
3. build.js文件拆分：提取第三方包  
通过插件CommonsChunkPlugin处理入口  
// 再加一个入口  
vendors:['vue','vue-router','axios','vue-preview'],  
//出口 
filename:'[chunkhash].js'  
plugins配置：  
// 提取公共模块  
new webpack.optimize.CommonsChunkPlugin({    
    // 清单，用来记录使用者和第三方的关系  
    names:['vendors','manifest']   
}),
```
```
4. 路由懒加载，用的时候才去加载（节省流量）  
```
