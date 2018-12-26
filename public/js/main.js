$(function() {
    // 登录
    $("#login").on("click", function() {});
    // 注册
    $("#register").on("click", function() {
        var $username = $("#username2").val();
        var $pwd = $("#pwd2").val();
        $.ajax({
            url: "/api/user/register",
            type: "post",
            data: {
                username: $username,
                password: $pwd
            },
            dataType: "application/json",
            success: function(res) {
                console.log(res);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});
