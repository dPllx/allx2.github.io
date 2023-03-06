var customForm;function YYYYMMDDstart()
{MonHead=[31,28,31,30,31,30,31,31,30,31,30,31];var y=new Date().getFullYear();for(var i=(y-1);i<(y+20);i++)
customForm.YYYY.options.add(new Option(i+"年",i));for(var i=1;i<13;i++)
customForm.MM.options.add(new Option(i+"月",i));customForm.YYYY.value=y;customForm.MM.value=new Date().getMonth()+ 1;var n=MonHead[new Date().getMonth()];if(new Date().getMonth()==1&&IsPinYear(customForm.YYYY.value))n++;writeDay(n);customForm.DD.value=new Date().getDate();}
function YYYYDD(str)
{var MMvalue=customForm.MM.options[customForm.MM.selectedIndex].value;if(MMvalue==""){var e=customForm.DD;optionsClear(e);return;}
var n=MonHead[MMvalue- 1];if(MMvalue==2&&IsPinYear(str))n++;writeDay(n)}
function MMDD(str)
{var YYYYvalue=customForm.YYYY.options[customForm.YYYY.selectedIndex].value;if(YYYYvalue==""){var e=customForm.DD;optionsClear(e);return;}
var n=MonHead[str- 1];if(str==2&&IsPinYear(YYYYvalue))n++;writeDay(n)}
function writeDay(n)
{var e=customForm.DD;optionsClear(e);for(var i=1;i<(n+1);i++)
e.options.add(new Option(i+"日",i));}
function IsPinYear(year)
{return(0==year%4&&(year%100!=0||year%400==0));}
function optionsClear(e)
{for(var i=e.options.length;i>0;i--)
e.remove(i);}