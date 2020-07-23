//为jquery的原型对象添加一个自定义插件函数myAccordion()，希望将来用户一调用这个myAccordion()插件函数，class和事件绑定就自动加入到插件元素上。
jQuery.fn.myAccordion=function(){
  //this->将来调用这个插件函数的.前的jquery对象，也就是整个插件的父元素对象。
  //起个别名
  var $parent=this;
  //自动做2件事: 
  //1. 为元素自动添加class
  //1.1 给父元素自己加class accordion
  $parent.addClass("accordion")
  //1.2 给父元素下所有奇数位置的直接子元素加class title
  .children(":nth-child(odd)") //css中下标从1开始
  .addClass("title") //return 奇数位置的子元素
  //1.3 给所以奇数位置的子元素的下一个兄弟加class content fade
  .next().addClass("content fade") //return 所有奇数位置的子元素的下一个兄弟都返回回来
  //1.4 给所有奇数位置的子元素的下一个兄弟中第一个div加class in
  //first()可获得当前查询结果中第一个位置的元素，且自动包装为jq对象。.first()=>$($(查找结果)[0])
  .first().addClass("in");
  //2. 为元素自动绑定事件处理函数
  //直接将页面中已经实现的事件绑定代码剪切到插件函数中，由插件函数负责自动执行事件绑定操作
  $(".accordion").on("click",".title",e=>
    $(e.target).next(".content").toggleClass("in")
      .siblings(".content").removeClass("in")
  );
}

//将来myAccordion()函数会这样调用：
//$("#my-accordion").myAccordion()
//                       this //所以this不用$()包裹
//                         |
//$(整个插件的父元素) ←-点前--
//已经是$(...)了！

