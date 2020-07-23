
// 改函数负责输入错误的提示框样式的切换
// _errtype--输入是否有误(bool值)--
// removeBorderEle --需要移除橙色边框的元素对象（用jq先封装好再传进来）--
// addBorderEle --需要添加橙色边框的元素对象（用jq先封装好再传进来）--
// msg  --input下面条默认隐藏的提示信息div（用jq先封装好再传进来）--
// text --提示的文本内容(string)--
function setMsg(_errtype,removeBorderEle,addBorderEle,msgEle,text){

    if(!msgEle || !text){
        
        return false;
    }
    
    if(_errtype){
        if(!removeBorderEle){return false;console.log("必须传入需要删除边框的元素对象")};
        removeBorderEle.removeClass("err-border");
        if(addBorderEle){
            addBorderEle.removeClass("err-border");
        }        
        msgEle.find("span").text(" ");
        msgEle.css("display","none");

    }else{
        if(removeBorderEle){
            removeBorderEle.removeClass("err-border");
        }
        msgEle.find("span").text(text);
        msgEle.css("display","block");
        addBorderEle.addClass("err-border");

    }
}