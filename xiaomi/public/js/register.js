$(function() {
    // 选择国家按钮点击下拉事件
    $(".btn-country,.select-country,.country-menu li").click(
        function(e) {


            if ($(".country-menu").css("display") == "none") {
                $(".country-menu").css("display", "block");

            } else {
                $(".country-menu").css("display", "none");

            }
            e.stopPropagation();


        });
    // 选择手机区号点击下拉事件
    $(".btn-phone,.select-phone,.phone-menu li").click(
        (function() {
            var vis = false;

            return function(e) {
                if (vis == false) {
                    if ($(e.target).hasClass("select-phone")) {
                        return false;
                    } else {
                        $(".phone-menu").css("display", "block");
                        vis = true;
                    }

                } else {
                    $(".phone-menu").css("display", "none");
                    vis = false;
                }
                e.stopPropagation();

            }


        })()
    );

    // 下拉菜单中的列表点击事件
    $(".country-menu li").click(
        function(e) {
            $(".select-country").text($(this).find("span:first-child").text());
            $(".btn-phone").text($(this).find("span:last-child").text());
        }
    );
    // 下拉菜单中的列表点击事件
    $(".phone-menu li").click(
        function(e) {
            $(".btn-phone").text($(e.target).find("span:last-child").text());
        }
    );
    // 手机输入框失去焦点时验证信息
    $(".select-phone").blur(validatePhone);

    // 点击下拉菜单外部区域（document）隐藏下拉菜单
    $(document).click(function(e) {
        var targetClass = $(e.target).attr("class");
        // console.log(targetClass);
        if (targetClass == "select-menu-input" || targetClass == "select-menu-dt" || targetClass == "select-menu-div") {
            return false;
        } else {
            $(".select-menu").css("display", "none");
        }
    });
});
// 提交注册信息
$(function() {

    $("#register-btn").click(
        function() {

            if (validatePhone()) {
                var phoneAre = $(".btn-phone").text();
                var phoneNumber = $(".select-phone").val();
                var selectphone = $(".phone .select-phone");
                var msg = $(".phone .msg");
                //1.创建xhr异步对象
                var xhr = new XMLHttpRequest();
                //4.接收响应，创建监听
                xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var r = xhr.responseText;
                            if (r == "1") {
                                location.href = "verifycode.html" + "?phone=" + phoneAre + " " + phoneNumber;
                                // location.href="verifycode.html";
                            } else if (r == "2") {
                                setMsg(false, null, selectphone, msg, "该手机号码已经注册");
                            } else {
                                alert("未知错误");
                                return false;
                            }
                        }
                    }
                    //2.打开连接，创建请求
                    //get("/login_restful/:uname&:upwd"
                xhr.open("get", `/mi/v1/register_restful/${phoneNumber}`, true);
                //3.发送请求
                xhr.send();
            } else {
                return false;
            };

        });

});
// 手机规则验证函数
function validatePhone() {
    var phoneAre = $(".btn-phone").text();
    var phoneNumber = $(".select-phone").val();
    var selectphone = $(".phone .select-phone");
    var msg = $(".phone .msg");
    var reg = /^1[3-9]\d{9}$/;
    if (!phoneNumber) {
        setMsg(false, null, selectphone, msg, "请输入手机号码");
        return false;
    } else if (!reg.test(phoneNumber)) {
        setMsg(false, null, selectphone, msg, "手机号码格式错误");
        return false;
    } else {
        setMsg(true, selectphone, null, msg, " ");
        return true;
    }
}