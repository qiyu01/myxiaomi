$(function() {
    // 先获取url相关参数
    var phonehref = location.href.split("?")[1];
    if (!phonehref) {
        alert("请先注册");
        location.href = "register.html";
    }
    // console.dir(phonehref);
    var phone = phonehref.split("=")[1];
    phone = decodeURIComponent(phone);

    // console.log(phone);
    var phoneAre = phone.split(" ")[0];
    var phoneNumber = phone.split(" ")[1];
    // console.log(phoneNumber);
    if (!phoneNumber) {
        alert("请先注册");
        location.href = "register.html";
    }
    $(".verify-tip1").find("span:last-child").text(phone);

    $("#verify-btn").click(
        function() {
            var verifycode = $("#verify-code").val();
            var addBorderEle = $("#verify-code");
            var msg = $(".msg");

            if (!verifycode) {
                setMsg(false, null, addBorderEle, msg, "请输入验证码");
                return false;
            } else if (!/\d{4}/.test(verifycode)) {
                setMsg(false, null, addBorderEle, msg, "验证码格式错误");
                return false;

            } else {
                var xhr = new XMLHttpRequest();
                //4.接收响应，创建监听
                xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var r = xhr.responseText;
                            if (r == "0") {
                                alert("手机号未注册");
                            } else {
                                var arr = JSON.parse(r);
                                //  console.log(arr);
                                // 验证码跟数据库返回的验证码一致则跳转设置密码页面                   
                                if (arr[0].verifycode == verifycode) {
                                    location.href = "confirm.html" + "?phone=" + phoneAre + " " + phoneNumber + "&verifycode=" + verifycode;
                                } else {
                                    setMsg(false, null, addBorderEle, msg, "短信验证码不正确");
                                    return false;
                                }
                            }

                        }
                    }
                    //2.打开连接，创建请求
                    // 传入手机号码查询对应的验证码
                xhr.open("get", `/mi/v1/register_verifycode/${phoneNumber}`, true);
                //3.发送请求
                xhr.send();

            }
        }
    )
});