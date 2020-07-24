$(function(){
    // $(".topbar-download").hover(
    //     function(){
    //         $(this).addClass("active");
    //     },
    //     function(){
    //         $(this).removeClass("active");
    //     }
    // )
    // $(".topbar-cart a").hover(
    //     function(){
    //         $(".topbar-cart").addClass("active");
    //     },
    //     function(){
    //         $(".topbar-cart").removeClass("active");
    //     }
    // )
    // $(".logo").hover(
    //     function(){
    //         $(this).addClass("active");
    //     },
    //     function(){
    //         $(this).removeClass("active");
    //     }
    // )
    $(".search-text").focus(
        function(){
            $(this).addClass("border-info");
            $(".search-btn").addClass("border-info");
            $(".keyword-list").addClass("active");
        }
    )
    $(".search-text").blur(
        function(){
            $(this).removeClass("border-info");
            $(".search-btn").removeClass("border-info");
            $(".keyword-list").removeClass("active");
        }
    )
    // $(".nav-item").hover(
    //     function(){
    //         $(".site-header").addClass("active");
    //         $(".search-text").trigger("blur");
    //     },
    //     function(){
    //         $(".site-header").removeClass("active");
            
    //     }
    // )
    // $("ul.list-category>li").hover(
    //     function(){
    //         $(this).addClass("active");
    //         var liLength=$(".home-hero .list-category>li.active .children-list>li").size();
    
    //         // 设置列表的宽度随着列数变化
    //         var liWidth="992px";
    //         // console.log(liWidth);
    //         $(".home-hero .list-category>li.active .children-list").css({"width":liWidth});
            
    //     },
    //     function(){
    //         $(this).removeClass("active");
            
    //     }
    // )
    $(".xm-plain-box .box-hd .tab-list li").mouseenter(
        function(){
            $(this).addClass("active").siblings().removeClass("active");
            var target=$(this).index();
            $(this).parents(".xm-plain-box").find("ul.brick-list").eq(target).removeClass("hide").siblings().addClass("hide");
        }
    )
    $(".header-nav .nav-item").hover(
        function(){
            $(this).addClass("active").siblings().removeClass("active");
            $(".header-nav .item-children").addClass("active");
            // console.log($(this).index());
            var index=$(this).index();
            // $(".header-nav .children-list").eq()
            // console.log($(".header-nav .children-list").eq(index));
            $(".header-nav .children-list").eq(index-1).css({"z-index":1});
            $(".header-nav .children-list").eq(index-1).siblings().css({"z-index":0});
            $(".search-text").trigger("blur");

        },
        function(e){
            // $(this).removeClass("active");
            var index=$(this).index();
            $(".header-nav .item-children").removeClass("active");
            // $(".header-nav .children-list").index($(this).index()).css({"z-index":"1"});
            // $(".header-nav .children-list").eq(index-1).css({"z-index":0});
        }
    )
        $(".header-nav .item-children").hover(
        function(){
            var index=$(".header-nav .nav-item.active").index();
            // console.log(eq)
            $(".header-nav .item-children").addClass("active");
            $(".header-nav .children-list").eq(index-1).css({"z-index":1});
            $(".header-nav .children-list").eq(index-1).siblings().css({"z-index":0});

        },
        function(){
            var index=$(".header-nav .nav-item.active").index();
            $(".header-nav .item-children").removeClass("active");
            // $(".header-nav .children-list").eq(index-1).css({"z-index":0});
            
        }
    )


        var vm=new Vue({
            el: '#app',
            data: {
                    result: {},
                    result2:{}
                },
            methods: {
                listWidth(cid){
                    var n=0;
                    for(var i=0;i<this.result2.length;i++){
                        if(this.result2[i].clid==cid){
                            n++
                        }
                    }
                    console.log(n);
                    return Math.ceil(n/6)*248+"px";
                    
                }
            },
            
            mounted() {
                var xhr1 = new XMLHttpRequest();
                var r;
                var that=this;
                //4.接收响应，创建监听
                xhr1.onreadystatechange = function() {
                if (xhr1.readyState == 4 && xhr1.status == 200) {
                    r = xhr1.responseText;
                    // console.log(r);
                    that.result=JSON.parse(r);
                    // console.log(that.result);
                }
             }
                    //2.打开连接，创建请求
                    //传入用户名和密码查询是否一致正确
                xhr1.open("get", `/mi/v1/category_restful`, true);
                //3.发送请求
                xhr1.send();

                var xhr2 = new XMLHttpRequest();
                var r2;
                //4.接收响应，创建监听
                xhr2.onreadystatechange = function() {
                if (xhr2.readyState == 4 && xhr2.status == 200) {
                    r2 = xhr2.responseText;
                    // console.log(r);
                    that.result2=JSON.parse(r2);
                    console.log(that.result2);
                }
             }
                    //2.打开连接，创建请求
                    //传入用户名和密码查询是否一致正确
                xhr2.open("get", `/mi/v1/category_list`, true);
                //3.发送请求
                xhr2.send();
            }
            
        })


})