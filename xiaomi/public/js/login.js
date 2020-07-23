// 用户名登录，手机登录，二维码登录---三个tab之间的切换时间
$(function() {
    $("#phone_login").click(
        function() {
            $(".form1").css({ "display": "none" });
            $(".form2").css({ "display": "block" });
            // console.log("done");
        }
    );
    $("#uname_login").click(
        function() {
            $(".form2").css({ "display": "none" });
            $(".form1").css({ "display": "block" });
            // console.log("done");
        }
    );
    $(".login_tab1").click(
        function(e) {
            $(".login_qr").css({ "display": "none" });
            $(".form1").css({ "display": "block" });
            $(".login_tab2").removeClass("active")
            $(e.target).addClass("active");
            // console.log("done");
        }
    );
    $(".login_tab2").click(
        function(e) {
            $(".form2").css({ "display": "none" });
            $(".form1").css({ "display": "none" });
            $(".login_qr").css({ "display": "block" });
            $(".login_tab1").removeClass("active");
            $(e.target).addClass("active");
            // console.log("done");
        }
    );



});
// 用户名登录和手机登录的事件绑定
$(function() {
    $("#uname-login-btn").click(login);
    $("#phone-login-btn").click(phoneLogin);
});

// 登录事件函数
function login() {
    var $uname = loginUname.value;
    var $upwd = loginUpwd.value;
    var $input_wrapper1 = $(".form1 .input_wrapper1");
    var $input_wrapper2 = $(".form1 .input_wrapper2");
    var $msg = $(".form1 .msg");

    if (!$uname) {
        console.log("done");
        setMsg(false, $input_wrapper2, $input_wrapper1, $msg, "请输入帐号");
        return false;
    } else if (!$upwd) {
        setMsg(false, $input_wrapper1, $input_wrapper2, $msg, "请输入密码");
        return false;
    } else {
        setMsg(true, $input_wrapper2, $input_wrapper1, $msg, " ");
        var xhr = new XMLHttpRequest();
        //4.接收响应，创建监听
        xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var r = xhr.responseText;
                    if (r == "1") {
                        // 用户名和密码正确，跳转主页
                        document.cookie = `username=${loginUname.value}`
                        console.log(typeof document.cookie);
                        location.href = "index.html";
                    } else {
                        setMsg(false, $input_wrapper2, $input_wrapper1, $msg, "用户名或密码不正确");
                        return false;
                    }
                }
            }
            //2.打开连接，创建请求
            //传入用户名和密码查询是否一致正确
        xhr.open("get", `/mi/v1/login_restful/${$uname}&${$upwd}`, true);
        //3.发送请求
        xhr.send();
    }

}
// 手机登录事件函数
function phoneLogin() {
    var $phone = $(".form2 .input_wrapper1 input").val();
    var $verifyCode = $(".form2 .input_wrapper2 input").val();
    var $input_wrapper1 = $(".form2 .input_wrapper1");
    var $input_wrapper2 = $(".form2 .input_wrapper2");
    var $msg = $(".form2 .msg");
    var reg = /^1[3-9]\d{9}$/;
    if (!$phone) {
        setMsg(false, $input_wrapper2, $input_wrapper1, $msg, "请输入手机号");
    } else if (!reg.test($phone)) {
        setMsg(false, $input_wrapper2, $input_wrapper1, $msg, "手机号格式不正确");
    } else if (!$verifyCode) {
        setMsg(false, $input_wrapper1, $input_wrapper2, $msg, "请输入验证码");
    } else {
        setMsg(true, $input_wrapper1, $input_wrapper2, $msg, " ");
        var xhr = new XMLHttpRequest();
        //4.接收响应，创建监听
        xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var r = xhr.responseText;
                    if (r == "0") {
                        // 返回0,则说明手机号不存在数据库，说明该手机号还没注册
                        alert("手机号未注册");
                    } else {
                        var arr = JSON.parse(r);
                        console.log(arr);
                        if (arr[0].verifycode == $verifyCode) {
                            document.cookie = `username=${$phone}`;
                            location.href = "index.html";
                        } else {
                            setMsg(false, $input_wrapper1, $input_wrapper2, $msg, "短信验证码不正确");
                            return false;
                        }
                    }

                }
            }
            //2.打开连接，创建请求
            //传入手机查询对应的验证码
        xhr.open("get", `/mi/v1/get_verifycode/${$phone}`, true);
        //3.发送请求
        xhr.send();
    }
}