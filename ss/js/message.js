// 获取元素
const textarea = document.querySelector('textarea');
const but = document.querySelector('button');
const promopt = document.querySelector('.promopt');
const inp = document.querySelector('input');
const messageList = document.querySelector('#messageList');
const count = document.querySelector('.el-span')

// 创建数组留言板的数据内容
var messages = [
    { name: '爱闹的乖猪猪', text: '留言，蹲一个', time: '2023-01-15 18:09' },
    { name: '多肉葡萄', text: '加油', time: '2022-12-11 20:42' },
    { name: '木木花火', text: '加油', time: '2022-11-21 09:23' },
    { name: '小鲨鱼', text: '加油', time: '2022-10-03 14:01' },
    { name: '不知名网友鹿', text: '加油', time: '2022-09-18 16:30' }];

// 先将已有数据渲染出来
messages.forEach(item => {
    console.log(item);
    messageList.insertAdjacentHTML('beforeend', `
    <div class="hh">
      <span><strong>${item.name}</strong></span>
      <span>${item.time}</span>
      <p>${item.text}</p>
    </div>`)
})

// 创建评论时间函数
function messageTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var d = date.getDate();
    d = d < 10 ? '0' + d : d;
    var h = date.getHours();
    h = h < 10 ? '0' + h : h;
    var m = date.getMinutes();
    m = m < 10 ? '0' + m : m;
    timer = year + '-' + month + '-' + d + ' ' + h + ':' + m;
    // console.log(timer);
    return timer
}

// 注册按钮点击事件
function addMessage() {
    if (textarea.value === '') {
        promopt.innerHTML = '不要忘记了输入你的留言哦'
        return false
    } if (inp.value === '') {
        promopt.innerHTML = '昵称呢乖乖，让我认识认识你'
        return false
    } else {
        // 数据初始化
        messageList.innerHTML = '';
        messages.unshift({
            name: inp.value,
            text: textarea.value,
            // 调用时间函数
            time: messageTime()
        })
        // 再次进行遍历渲染数据
        messages.forEach(item => {
            // 向指定元素（messageList）的位置（beforeend）插入HTML代码
            messageList.insertAdjacentHTML('beforeend', `
            <div class="hh">
            <span><strong>${item.name}</strong></span>
            <span>${item.time}</span>
            <p>${item.text}</p>
            </div>`)
        })
        // 清空输入框数据
        textarea.value = '';
        inp.value = '';
        promopt.innerHTML = '';
        count.innerHTML = '0/200字'
    }
}
// 检测输入框文本长度
textarea.addEventListener('input', function () {
    count.innerHTML = textarea.value.length + '/200字'
})
textarea.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        console.log(textarea.value.trim());
    }
})

// var obj = {};
// function addMessage() {
//     if (textarea.value === '') {
//         console.log('你是空的');
//         promopt.innerHTML = '不要忘记了输入你的留言哦'
//         return false
//     } if (inp.value === '') {
//         promopt.innerHTML = '不要忘记了输入你的昵称哦'
//         return false
//     } else {
//         promopt.innerHTML = '';
//         obj.name = inp.value;
//         obj.text = textarea.value;
//         // messages.push(textarea.value);
//         messages.push(obj);
//         obj = {};
//         textarea.value = '';
//         inp.value = '';
//         console.log(messages);
//         // renderMessages();
//     }
// }

// function renderMessages() {
//     var messageBoard = document.getElementById('messageBoard');
//     messageBoard.innerHTML = '';
//     for (var i = 0; i < messages.length; i++) {
//         var name = document.createElement("p");
//         var text = document.createElement("p");
//         name.textContent = messages[i].name;
//         text.textContent = messages[i].text;
//         console.log(messages[i]);
//         messageBoard.appendChild(name)
//         messageBoard.appendChild(text)
//     }
// }

