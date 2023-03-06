
var errorMessage=["请选择年份！","请选择月份！","请选择日!"];var WeekData=[];var CONST_WEEK=40;var flag=false;$(document).ready(function(){window.customForm=document.ycqCore;YYYYMMDDstart();var $yyear=$('#yyear').val("");var $yyue=$('#yyue').val("");var $yri=$('#yri').val("");var $yunZhou=$('#yunZhou').val("");var $yuTian=$('#yuTian').val("");var $remainDay=$('#remainDay').val("");var $nowTab='.yuer';function getWeekData(number)
{if(!!WeekData[number])
{return WeekData[number];}
else
{$.ajax({type:'get',dataType:'html',async:false,url:'/tools/data/yunchanqi/'+ number+'.html',success:function(htmlFrag){WeekData[number]=htmlFrag;}});return WeekData[number];}}
var allTab=$('.ycqtab').click(function(event){allTab.removeClass('selected');$(this).addClass('selected');var $child=$('.weekContent>div').hide();if(event.target.id=='tab1')
{$nowTab='.yuer';}
if(event.target.id=='tab2')
{$nowTab='.shengti';}
if(event.target.id=='tab3')
{$nowTab='.yunqi';}
$($nowTab).show();});var $boxycq_ul=$('.boxycq_ul');var $preWeek=$('#preWeek').click(function(){var number=$(this).attr("index")*1;$boxycq_ul.html(getWeekData(number)).find($nowTab).show();if(flag)
{$yunZhou.html(number-1);}
if(number>1)
{$(this).attr("index",number-1);}
if(number<CONST_WEEK)
{$nextWeek.attr("index",number+1);}});var $nextWeek=$('#nextWeek').click(function(){var number=$(this).attr("index")*1;$boxycq_ul.html(getWeekData(number)).find($nowTab).show();if(flag)
{$yunZhou.html(number-1);}
if(number<CONST_WEEK)
{$(this).attr("index",number+1);}
else
{alert("您已点到最后一周了，如需要请重新测试!");}
if(number>1)
{$preWeek.attr("index",number-1);}});$preWeek.attr("index",1).click();$('#tijiao').click(function(){flag=true;$yyear.val("");$yyue.val("");$yri.val("");$yunZhou.val("");$yuTian.val("");$remainDay.val("");var tail=[customForm.YYYY.value,customForm.MM.value,customForm.DD.value];var length=tail.length;for(var i=0;i<tail.length;i++)
{if(!tail[i])
{alert(errorMessage[i]);return false;}}
tail=(new Date(tail.join('/'))).getTime();var avZhouqi=customForm.averageZhouQi.value*1;var ycq=new Date(tail+(avZhouqi+252)*86400000);var now=(new Date()).getTime();var cha=Math.floor((now-tail)/86400000);//今天和末次月经差的天数
if(cha<0)
{alert("您的末次月经超过当前时间了！");return false;}
var yunZhou=Math.floor(cha/7);var yutian=parseInt(cha%7)+1;var remainDay=Math.floor((ycq.getTime()-now)/86400000)+1;//还剩多少天
if(remainDay<0)
{alert("您的预产期已经超过了！");$boxycq_ul.empty();$preWeek.attr("index",1).click();return false;}
$yyear.html(ycq.getFullYear());$yyue.html(ycq.getMonth()+1);$yri.html(ycq.getDate());$yunZhou.html(yunZhou);$yuTian.html(yutian);$remainDay.html(remainDay);$preWeek.attr("index",yunZhou+1).click();});});