var express = require('express');
var router = express.Router();
var User = require('../models/User.js')
// 统一返回格式
var responseData;

router.use(function(req, res, next) {
    responseData = {
        code: 0,
        msg: ''
    }
    next();
});


/**
 * 用户注册
 *  注册逻辑
 *  1. 用户名不能为空
 *  2. 密码不能为空
 *  
 *  1. 用户是否已经被注册了
 *      数据库查询
 */
router.post('/user/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    // 用户名是否为空
    if (username == '') {
        responseData.code = 1;
        responseData.msg = '用户名不能为空';
        res.json(responseData);
        return;
    }
    // 密码不能为空
    if (password == '') {
        responseData.code = 1;
        responseData.msg = '密码不能为空';
        res.json(responseData);
        return;
    }

    // 用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户名同名的数据，表示该用户已经被注册。
    User.findOne({
        username: username
    }).then(function(res) {
        if (res) {
            // 表示数据库中有该记录
            responseData.code = 4;
            responseData.msg = '用户名已经被注册了！';
            res.json(responseData);
            return;
        }
        // 保存用户注册的信息到数据库
        var user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then(function(newRes) {
        console.log(newRes);
        responseData.msg = '注册成功';
        res.json(responseData);
    })

});

module.exports = router;