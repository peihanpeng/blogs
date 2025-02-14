/**
 * 应用程序的启动（入口）文件
 */

// 加载express模块
var express = require("express");
// 加载模板处理模块
var swig = require("swig");
// 创建app应用 => Nodejs Http.createService();
var app = express();
var mongoose = require('mongoose');
// 加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');

// 设置静态文件托管
// 当前用户访问的url以/publick开始，那么直接返回对应__dirname + '/public'下的文件。
app.use('/public', express.static(__dirname + '/public'));

// 配置应用模板
// 定义当前应用所使用的模板引擎
// 第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine("html", swig.renderFile);
// 设置文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set("views", "./views");
// 注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set("view engine", "html");
// 在开发过程中，需要取消模板缓存
swig.setDefaults({ cache: false });

// bodyParser设置
app.use(bodyParser.urlencoded({extended: true}));

/**
 * 根据不同的划分模块
 */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));



/**
 * 首页
 *  req request对象
 *  res response对象
 *  next 函数
 */
app.get("/", function(req, res, next) {
    // res.send('<h1>欢迎光临我的博客！</h1>')

    /**
     * 读取views目录下的指定文件，解析并返回给客户端
     * 第一个参数：表示模板的文件，相对于viewss目录 views/index.html
     * 第二个参数：传递给模板使用的数据
     */
    res.render('index');
});

// 监听http请求
mongoose.connect('mongodb://localhost:8099/blog', function(err) {
    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('数据库连接成功')
        app.listen(8081, function() {
            console.log('启动');
        });
    }
})

