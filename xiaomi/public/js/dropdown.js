$(
    function(){

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


    }
)