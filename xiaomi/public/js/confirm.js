// 密码验证函数
function validatepassword() {
    var uname = $(".confirm-input0 input").val();
    var pwd = $(".confirm-input1 input").val();
    var pwdrepeat = $(".confirm-input2 input").val();
    var confirminput0 = $(".confirm-input0 input");
    var confirminput1 = $(".confirm-input1 input");
    var confirminput2 = $(".confirm-input2 input");
    var msg = $(".confirm-form .msg");
    var reg = /\w{6,16}/;
    var reg1 = /\w{3,8}/;
    $(".confirm-form .msg").find("span").css("color", "#ff6700")
    if (!pwd) {
        setMsg(false, confirminput2, confirminput1, msg, "请输入密码");
        console.log(11);

        return false;
    } else if (!reg.test(pwd)) {
        setMsg(false, confirminput2, confirminput1, msg, "密码格式错误")
        console.log(22);

        return false;
    } else if (pwdrepeat != pwd) {
        setMsg(false, confirminput1, confirminput2, msg, "请输入相同的确认密码");
        return false;
    } else {
        setMsg(true, confirminput2, confirminput1, msg, " ");
        console.log(33);

        return true;
    }

    if (!uname) {
        setMsg(false, confirminput0, msg, "请输入用户名");
        console.log(1);

        return false;
    } else if (!reg1.test(uname)) {
        setMsg(false, confirminput0, msg, "用户名格式错误")
        console.log(2);

        return false;
    } else {
        setMsg(true, confirminput0, msg, " ");
        console.log(3);

        return true;
    }
}
$(function() {
    // 先获取url相关参数
    var phonehref = location.href.split("?")[1];
    if (!phonehref) {
        alert("请先注册");
        location.href = "register.html";
    }
    var phone = phonehref.split("=")[1];
    phone = decodeURIComponent(phone);
    var verifycode = phonehref.split("=")[2];
    var phoneNumber = phone.split(" ")[1].split("&")[0];
    if (!phoneNumber) {
        alert("请先注册");
        location.href = "register.html";
    }
    $(".confirm-tip1").find("span:last-child").text(phoneNumber);
    // 鼠标点击输入框时提示密码规则
    $(".confirm-input0 input").focus(
        function() {
            $(".confirm-form .msg").find("span").text("用户名长度3~8位，数字，字母，下划线组成").css("color", "#666");
            $(".confirm-form .msg").css("display", "block");
        }
    );
    $(".confirm-input1 input").focus(
        function() {
            $(".confirm-form .msg").find("span").text("密码长度6~16位，数字，字母，下划线组成").css("color", "#666");
            $(".confirm-form .msg").css("display", "block");
        }
    );
    // 开始输入时不再显示提示信息

    $('.confirm-input0,.confirm-input1 input,.confirm-input2 input').bind('input propertychange', function() {
        $(".confirm-form .msg").css("display", "none");
        $(".confirm-input10 input").removeClass("err-border");
        $(".confirm-input1 input").removeClass("err-border");
        $(".confirm-input2 input").removeClass("err-border");
    });

    //   提交密码信息
    $(".confirm-btn button").click(
        function() {
            if (validatepassword()) {

                var upwd = $(".confirm-input1 input").val();
                var uname = $(".confirm-input0 input").val();
                //1.创建xhr异步对象
                var xhr = new XMLHttpRequest();
                //4.接收响应，创建监听
                xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var r = xhr.responseText;
                            if (r == "1") {
                                location.href = "index.html";
                            } else {
                                alert("出错");
                                return false;
                            }
                        }
                    }
                    //2.打开连接，创建请求
                xhr.open("get", `/mi/v1/confirm_restful/${uname}&${phoneNumber}&${upwd}&${upwd}`, true);
                //3.发送请求
                xhr.send();
            } else {
                return false;
            }
        }
    )


});