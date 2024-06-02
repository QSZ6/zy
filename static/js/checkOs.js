/*
* 检验当前系统
* */
var typeOs = function () {
    var platform = navigator.platform;
    console.log(platform.indexOf("Linux"));
    if (platform.indexOf("Linux")>=0){
        return "linux";
    }
}

var spHolder= function(senentces,options) {
    superplaceholder({
        el: document.querySelector('#search'),
        sentences: senentces,
        options: options
    });
}
if (typeOs()==='linux'){
    var options={
        // delay between letters (in milliseconds)
        letterDelay: 0, // milliseconds
        // delay between sentences (in milliseconds)
        sentenceDelay: 0,
        // should start on input focus. Set false to autostart
        startOnFocus: false,
        loop: false,
        cursor: ''
    };
    var senentces =['搜点啥呢...填好了要点下面按钮👇~别让它晾着~ 喜欢的话欢迎收藏和添加首页~'];

    spHolder(senentces,options);

}else {
    var options={
        // delay between letters (in milliseconds)
        letterDelay: 100, // milliseconds
        // delay between sentences (in milliseconds)
        sentenceDelay: 1000,
        // should start on input focus. Set false to autostart
        startOnFocus: false,
        // loop through passed sentences
        loop: true,
        // Initially shuffle the passed sentences
        shuffle: false,
        // Show cursor or not. Shows by default
        showCursor: false,
        // String to show as cursor
        cursor: ''
    };
    var senentces =['这里可以输入搜索...填好了可以点击 下面按钮的 谷歌、必应、百度 或按回车~', '喜欢的话欢迎收藏和添加首页~','制作人：QSZ'];

    spHolder(senentces,options);

}

