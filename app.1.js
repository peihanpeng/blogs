var express = require('express');
var swig = require('swig');

var app = express();
var port = process.env.PORT || 8081

//设置swig页面不缓存
// swig.setDefaults({
//   cache: false
// })
app.set('view cache', false);

app.set('views','./views');
app.set('view engine','html');
app.engine('html', swig.renderFile);


app.listen(port);

console.log('server is started at http://localhost:'+port);

//index page
app.get('/',function(req, res){
    res.render('index',{
        title:'首页 ',
        content: 'hello swig'
    })
})