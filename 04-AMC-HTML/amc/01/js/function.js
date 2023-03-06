/**
 * @author lb
 */
//格式化时间
Date.prototype.Format = function(fmt){ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
/** 数字金额大写转换(可以处理整数,小数,负数) */
function upDigit(n)
{
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
    var head = n < 0? '负': '';
    n = Math.abs(n);

    var s = '';

    for (var i = 0; i < fraction.length; i++)
    {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);

    for (var i = 0; i < unit[0].length && n > 0; i++)
    {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++)
        {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
$.extend({
    isEmpty:function(str){
        if(str===undefined || str==null){
            return true;
        }
        str= $.trim(str);
        if(str==""){
            return true;
        }
        return false;
    },
    isEmail:function(email){
        if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
            return true;
        }else{
            return false;
        }
    },
    //获得url参数
    GET:function(param){
        var url=document.URL;
        var paramList=url.split("?")[1];
        if(paramList){
            var arr=paramList.split("&");
            for(var i=0;i<arr.length;i++){
                var arr2=arr[i].split("=");
                if(arr2[0]==param){
                    return arr2[1];
                }
            }
        }
        return false;
    },
    isLeapYear:function(year){  //判断闰年
        if(!isNaN(parseInt(year))){
            if((year%4==0 && year%100!=0)||(year%100==0 && year%400==0)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    },
    /*
     * 生成范围随机数
     * min：最小范围
     * max：最大范围，如省略为生成0～min之间随机数
     */
    getRandom:function(min,max){
        var _max=max || min;
        var _min=max?min:0;
        return parseInt(Math.random()*(_max-_min+1)+_min);
    }
});
/*
 *   日历
 *  speed:速度，默认200ms
 *  currentDate：加载时间 默认当前时间
 *  weekStart：每周第一个显示的星期
 *  padding:内容离边框距离
 */
$.fn.myCalendar = function(options) {
    var defaults = {
        speed:200,
        currentDate:new Date(),
        weekStart:"日",
        padding:0,
        jsonUrl:"",
        call:false,
        before:false,
        finish:false
    }
    var options = $.extend(defaults, options);
    this.each(function() {
        var _this = $(this);
        var _thisDate=new Date();
        var _width=_this.width()-options.padding*2;
        var _height=_this.height()-options.padding;
        var _tdWidth=_width/7;
        var weekStr="一二三四五六日";
        var week=[];
        for(var i=0;i<7;i++){
            week.push(weekStr.charAt((i+weekStr.indexOf(options.weekStart))%7));
        }
        var _current=options.currentDate;
        var _oDate=0;
        var _currentYear=_current.getFullYear();
        var _currentMonth=_current.getMonth()+1;
        var _table=$('<table></table>').appendTo(_this);
        _table.css({"width":_width,"height":_height,"margin":options.padding+"px auto 0"});
        var _thead=$('<thead></thead>').appendTo(_table);
        var _tr1=$('<tr class="years"></tr>').appendTo(_thead);
        var butPrev=$('<th class="butPrev">&lt;</th>').appendTo(_tr1);
        var _yearMonth=$('<th class="yearMonth" colspan="5"></th>').appendTo(_tr1);
        var butNext=$('<th class="butPrev">&gt;</th>').appendTo(_tr1);
        var butYear=$('<span class="year"></span>').appendTo(_yearMonth);
        _yearMonth.append("-");
        var butMonth=$('<span class="month"></span>').appendTo(_yearMonth);
        var _tr2=$('<tr class="week"></tr>').appendTo(_thead);
        for(var i=0;i<7;i++){
            _tr2.append('<th width='+_tdWidth+'>'+week[i]+'</th>');
        }
        var _tbody=$('<tbody></tbody>').appendTo(_table);
        dayInit(_currentYear,_currentMonth);

        butPrev.click(function(){
            var m=_currentMonth-1;
            if(_thisDate.getMonth()>=m){
                if(_currentYear>_thisDate.getFullYear() || options.before){
                    dayInit(_currentYear,_currentMonth-1);
                }
            }else{
                dayInit(_currentYear,_currentMonth-1);
            }

        });
        butNext.click(function(){
            dayInit(_currentYear,_currentMonth+1);
        });
        //初始化日期
        function dayInit(y,m){
            $.post(options.jsonUrl,{year:y,month:m},function(data){
                var _list=data.list;    //已预约数据
                var dayArr=[];
                for(var i=0;i<_list.length;i++){
                    dayArr.push(parseInt(_list[i].day));
                }
                _current.setYear(y);
                _current.setMonth(m-1);
                _current.setDate(1);
                var _cDate=_current.getTime();
                var tempTable=_table.clone();
                _this.append(tempTable);
                if(_cDate>_oDate){
                    tempTable.css({"left":0}).animate({"left":-_width},400);
                    _table.css({"left":_width}).animate({"left":0},400);
                }else if(_cDate<_oDate){
                    tempTable.css({"left":0}).animate({"left":_width},400);
                    _table.css({"left":-_width}).animate({"left":0},400);
                }
                _oDate=_cDate;
                _tbody.html("");
                _currentYear= _current.getFullYear();
                _currentMonth= _current.getMonth()+1;
                butYear.html(_currentYear);
                butMonth.html((_currentMonth<10?'0'+_currentMonth:_currentMonth));
                var daySum;
                if($.inArray(_currentMonth,[1,3,5,7,8,10,12])>-1){
                    daySum=31;
                }else if(_currentMonth==2){
                    if($.isLeapYear(_currentYear)){
                        daySum=29;
                    }else{
                        daySum=28;
                    }
                }else{
                    daySum=30;
                }

                var w= _current.getDay();
                var cDay=1;
                var wsi=w-1>=0?w-1:6;
                var ws=$.inArray(weekStr.charAt(wsi),week);
                for(var i=0;i<6;i++){
                    var _tr=$('<tr></tr>').appendTo(_tbody);
                    for(var j=0;j<7;j++){
                        if((i==0 && ws>j) || cDay>daySum){
                            _tr.append('<th>&nbsp;</th>')
                        }else{
                            var _tempTd;
                            var _index= $.inArray(cDay,dayArr);
                            if(_index==-1){
                                _tempTd=$('<td data-day='+cDay+'>'+cDay+'</td>').appendTo(_tr);
                            }else{
                                var obj=_list[_index];
                                var dayStr='';
                                dayStr+='<h5>'+cDay+'</h5>';
                                dayStr+='<p>'+obj.title+'</p>';
                                dayStr+='<p>'+obj.time+'</p>';
                                dayStr+='<div class="info">';
                                dayStr+='<p><strong>课程类别：</strong><a href="'+obj.url+'">'+obj.title+'</a> </p>';
                                dayStr+='<p><strong>课堂时间：</strong>'+obj.date+' '+obj.time+'</p>';
                                dayStr+='<p><strong>课堂内容：</strong>'+obj.info+'</p>';
                                dayStr+='</div>';
                                _tempTd=$('<td data-day="'+cDay+'" class="occupy">'+dayStr+'</td>').appendTo(_tr);
                            }
                            cDay++;
                        }
                    }
                }
                _tbody.find("th").bind("click",function(){
                })
                _tbody.find("td").click(function(){
                    var _td=$(this);
                    if($.isFunction(options.call)){
                        var callDate=new Date();
                        callDate.setYear(_currentYear);
                        callDate.setMonth(_currentMonth-1);
                        callDate.setDate(_td.data("day"))
                        options.call(callDate,_td);
                    }

                });
                setTimeout(function(){
                    tempTable.remove();
                },300);
            },"json");
        }
        setTimeout(function(){
            if($.isFunction(options.finish)){
                options.finish();
            }
        },600);
    });
};
/**
 * 提示信息
 * @param options
 *      msg:信息内容
 *      closeTime:显示时间 默认2000,-1为不消失
 *      speed:淡入淡出速度，默认400
 *      p: position对象相对位置(有dom时起作用),T:顶部(默认)，D：底部，L：左，R：右
 *      excursion:相对位置偏移，默认：10px
 *      bj:是否有背景，true:是,false:否(默认)
 *      bjClick:点击背景是否关闭msg，true:是,false:否(默认)
 *      opacity:背景透明度，0-1，默认(0.7)
 *      uniqueness:是否唯一，true:是,false:否(默认)
 *      call:显示后回调函数
 *      closed:关闭后回调函数
 */
(function(){
    $.fn.msg = function(options){
        var defaults = {
            msg:'',
            closeTime:2000,
            speed:300,
            p:'T',
            excursion:10,
            bj:false,
            bjClick:false,
            opacity:0.7,
            uniqueness:true,
            call:false,
            closed:false
        }
        var options = $.extend(defaults, options);
        $.fn.msg.closeAll=function(){
            $(".tempMsg,.tempMsgBj").remove();
        }
        this.each(function(){
            if(options.uniqueness){
                $.fn.msg.closeAll();
            }
            var _this=$(this);
            var _left=0;    //弹出坐标x
            var _top=0;     //弹出坐标y
            var _msg=$('<div class="tempMsg"></div>').appendTo("body");
            var _bj=false;
            if(options.bj){
                _bj=$('<div class="tempMsgBj"></div>').appendTo("body");
            }
            _msg.append(options.msg);
            var _width = _msg.outerWidth();
            var _height = _msg.outerHeight();
            var _window=$(window);
            if(_this.is('body') || _this.is(_window) || _this.is(document)){
                _left = (_window.width()-_width)/2+_window.scrollLeft();
                _top = (_window.height()-_height)/2+_window.scrollTop();
            }else{
                switch (options.p){
                    case "R":
                        _top = _this.offset().top+(_this.height()-_height)/2;
                        _left = _this.offset().left + _this.outerWidth(true)+options.excursion;
                        break;
                    case "L":
                        _top = _this.offset().top+(_this.height()-_height)/2;
                        _left = _this.offset().left - _width - options.excursion;
                        break;
                    case "D":
                        _left = _this.offset().left + (_this.outerWidth(true)-_width)/2;
                        _top = _this.offset().top+_this.outerHeight(true)+options.excursion;
                        break;
                    default :
                        _left = _this.offset().left + (_this.outerWidth(true)-_width)/2;
                        _top = _this.offset().top-_height-options.excursion;
                }
            }
            _msg.css({"left":_left,"top":_top});
            if(options.bj){
                _bj.fadeTo(options.speed,options.opacity);
                if(options.bjClick){
                    _bj.bind("click",function(){
                        $.fn.msg.close(_msg,_bj);
                    })
                }
                if($.isFunction(options.bjClick)){
                    _bj.bind("click",function(){
                        options.bjClick();
                    });
                }else if(options.bjClick){
                    _bj.bind("click",function(){
                        $.fn.msg.close(_msg,_bj);
                    })
                }
            }
            _msg.fadeIn(options.speed,function(){
                if($.isFunction(options.call)){
                    options.call(_msg,_bj);
                }
                if(options.closeTime>-1){
                    setTimeout(function(){$.fn.msg.close(_msg,_bj)},options.closeTime);
                }
            });
        });
        $.fn.msg.close=function(msg,bj){
            if(msg){
                if(bj){
                    bj.fadeTo(options.speed,0,function(){
                        bj.remove();
                    });
                }
                msg.fadeOut(options.speed,function(){
                    msg.remove();
                    if($.isFunction(options.closed)){
                        options.closed();
                    }
                });
            }else{

            }

        }
    };
    $.extend({
        msg:function(options){
            $(window).msg(options);
        }
    })
    $.msg.close=function(msg,bj){
        $.fn.msg.close(msg,bj);
    }
    $.msg.closeAll=function(){
        $.fn.msg.closeAll();
    }
})(jQuery);
/**
 * @param options 确认框
 * title:标题
 * content：内容(html标签)
 * speed:速度
 * className:弹出额外className
 * bj:显示背景
 * bjClassName:背景额外className
 * opacity:背景透明度
 * bjClick：点击背景事件(默认关闭),true/false/function()
 * ok:点击成功按钮事件(默认关闭)
 * closed:点击关闭按钮事件（默认关闭）
 * cance:点击取消按钮事件（默认关闭）
 * okName:确认按钮名称
 * cancelName:取消按钮名称
 * closeShow: 右上关闭按钮显示
 * closeName:关闭按钮名称
 * uniqueness：是否唯一，true（默认），false
 * call:显示后回调函数
 */
(function(){
    $.fn.confirm = function(options){
        var defaults = {
            title:false,
            icon:true,
            iconClass:false,
            content:"",
            speed:200,
            className:false,
            bj:true,
            bjClassName:false,
            opacity:0.7,
            bjClick:false,
            ok:function(){$.confirm.close();},
            closed:function(){$.confirm.close();},
            cancel:function(){$.confirm.close();},
            okName:"确定",
            cancelName:"取消",
            closeShow:true,
            closeName:"",
            uniqueness:true,
            call:false
        }
        var options = $.extend(defaults, options);
        this.each(function(){
            if(options.uniqueness){
                $(".tempConfirmShade").remove();
                $(".tempConfirm").remove();
            }
            var _this=$(this);
            var bj,pop,buttonBox;
            var title=false;
            var closeButton=false;
            var cancelButton=false;
            var okButton=false;
            if(options.bj){
                bj =$('<div class="tempConfirmShade"></div>').appendTo("body");
                if(options.bjClassName){
                    bj.addClass(options.bjClassName);
                }

            }
            pop=$('<div class="tempConfirm"></div>').appendTo("body");
            if(options.icon){
                var icon=$('<div class="tempConfirmIcon"></div>').appendTo(pop);
                if(options.iconClass){
                    icon.addClass(options.iconClass);
                }
            }
            if(options.closeShow){
                closeButton=$('<a class="tempConfirmCloes" href="javascript:void(0)">'+options.closeName+'</a>').appendTo(pop);
            }
            if(options.title!==false){
                title=$('<div class="tempConfirmTitle">'+options.title+'</div>').appendTo(pop);
            }

            pop.append('<div class="tempConfirmContents">'+options.content+'</div>');
            if(options.okName || options.cancelName){
                buttonBox=$('<div class="tempConfirmButtonBox"></div>').appendTo(pop);
                if(options.buttonClass){
                    buttonBox.addClass(options.buttonClass);
                }

                if(options.cancelName){
                    cancelButton=$('<a href="javascript:void(0)">'+options.cancelName+'</a>').appendTo(buttonBox);
                }
                if(options.okName){
                    okButton=$('<a href="javascript:void(0)">'+options.okName+'</a>').appendTo(buttonBox);
                }
                if(options.okName==false || options.cancelName==false){
                    buttonBox.addClass("butOne");
                }
            }

            if(options.bj){
                bj.fadeTo(options.speed,options.opacity,function(){
                    pop.css({"top":($(window).height()-pop.outerHeight(true))/2,"left":($(window).width()-pop.outerWidth(true))/2}).fadeIn(options.speed,function(){
                        if($.isFunction(options.bjClick)){
                            bj.click(function(){
                                options.bjClick();
                            });
                        }else if(options.bjClick){
                            bj.click(function(){
                                $(document).confirm.close();
                            });
                        }
                        if($.isFunction(options.call)){
                            options.call();
                        }
                    });

                });
            }else{
                pop.css({"top":($(window).height()-pop.outerHeight(true))/2,"left":($(window).width()-pop.outerWidth(true))/2}).fadeIn(options.speed,function(){
                    if($.isFunction(options.call)){
                        options.call();
                    }
                });
            }
            if(closeButton){
                closeButton.on("click",function(){
                    options.closed();
                });
            }
            if(okButton){
                okButton.on("click",function(){
                    options.ok();
                });
            }
            if(cancelButton){
                cancelButton.on("click",function(){
                    options.cancel();
                });
            }
            $.fn.confirm.close=function(fn){
                if(bj){
                    bj.fadeOut(options.speed);
                }
                pop.fadeOut(options.speed,function(){
                    if($.isFunction(fn)){
                        fn();
                    }
                    if(bj){
                        bj.remove();
                    }
                    pop.remove();
                });
            }
            $.fn.confirm.refresh=function(fn){
                pop.animate({"top":($(window).height()-pop.outerHeight(true))/2,"left":($(window).width()-pop.outerWidth(true))/2},options.speed,function(){
                    if($.isFunction(fn)){
                        fn();
                    }
                });
            }
        });
    }
    $.extend({
        confirm:function(options){
            $(window).confirm(options);
        }
    })
    $.confirm.close=function(fn){
        $.fn.confirm.close(fn);
    }
    $.confirm.refresh=function(fn){
        $.fn.confirm.refresh(fn);
    }
})(jQuery);
