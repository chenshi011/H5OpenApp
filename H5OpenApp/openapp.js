//实际上就是新建一个iframe的生成器
var  createIframe=(function(){
    var iframe;
    return function(){
        if(iframe){
            return iframe;
        }else{
            iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            return iframe;
        }
    }
})()；



var openApp = function(localUrl){
    //var localUrl="hxqdoctor://"+encodeURI(JSON.stringify(valuee));
    var openIframe = createIframe();
    var u = navigator.userAgent;
    var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var isAndroid= u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
    if(isIos){
        if(isIOS9()){
            //判断是否为ios9以上的版本,跟其他判断一样navigator.userAgent判断,ios会有带版本号
            /* localUrl=createScheme({type:1,id:"sdsdewe2122"},true);//代码还可以优化一下*/
            window.location.href = localUrl;//实际上不少产品会选择一开始将链接写入到用户需要点击的a标签里
            return;
        }
        //判断是否是ios,具体的判断函数自行百度
        window.location.href = localUrl;
        var loadDateTime = Date.now();
        setTimeout(function () {
            var timeOutDateTime = Date.now();
            if (timeOutDateTime - loadDateTime < 1000) {
                window.location.href = "http://app.chinaums.com/index.html";
            }
        }, 25);
    }else if(isAndroid){
        //判断是否是android，具体的判断函数自行百度
        if (isChrome) {
            //chrome浏览器用iframe打不开得直接去打开，算一个坑
            window.location.href = localUrl;
        } else {
            //抛出你的scheme
            openIframe.src = localUrl;
        }
        setTimeout(function () {
            window.location.href ="http://app.chinaums.com/index.html";          /* http://t.cn/RcxMVvL*/
        }, 500);
    }else{
        //主要是给winphone的用户准备的,实际都没测过，现在winphone不好找啊
        openIframe.src = localUrl;
        setTimeout(function () {
            window.location.href = "http://app.chinaums.com/index.html";
        }, 500);
    }
};


/*判断是否是ios9以上*/
function isIOS9() {
    //获取固件版本
    var getOsv = function () {
        var reg = /OS ((\d+_?){2,3})\s/;
        if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
            var osv = reg.exec(navigator.userAgent);
            if (osv.length > 0) {
                return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
            }
        }
        return '';
    };
    var osv = getOsv();
    var osvArr = osv.split('.');
    //初始化显示ios9引导
    if (osvArr && osvArr.length > 0) {
        if (parseInt(osvArr[0]) >= 9) {
            return true
        }
    }
    return false
}


function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

$(function () {
    if(isWeiXin()){
        $('.mask').show();
        $('html,body').css("overflow","hidden");
    }else{
        $('.mask').hide();
    }
    $('.open_app button').click(function () {
        var localUrl = $('.localUrl').val();
        if(localUrl) {
            openApp(localUrl);     //点击某个按钮触发上面的openApp方法
        }
        
    });
})