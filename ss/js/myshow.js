// 加载先设置主页的dom
const photoWall = document.querySelector('.photo-wall')
// forEach完成数组的遍历
photosInfo.forEach(item => {
    // 打印photosInfo里的每一个元素值
    // console.log(item);
    // 创建一个新函数creatHomePhotoDom，并传入该元素的cephalogram_url、size、name和introduction作为参数
    creatHomePhotoDom(item.cephalogram_url, item.size, item.name, item.introduction)
});
const content = document.querySelector('.content')
const photoDetail = document.querySelector('.photo-detail')
const photoItem = document.querySelectorAll('.photo-item')
const home = document.querySelector('.home')
let isHome = false
let scrollTop


// 设置主页照片的展示dom字符串
function creatHomePhotoDom(url, size, name, introduction) {
    const photoItem = `
            <div class="photo-item ${size} width-cell">
                <div class="thumb-hover">
                </div>
                <img src="${url}">
                <div class="tips">
                    <span class="name">
                        ${name}
                    </span>
                    <span class="introduction">
                        ${introduction}
                    </span>
                </div>
            </div>
            `
    photoWall.innerHTML += photoItem;
}


// 创建详情照片
function creatDetailPhotoDom(url, children_introduction) {
    return `
    <div class="photo-detail-item">
                <img ${children_introduction ? `class="width-15 width-11 d-width-cell"` : ``} src="${url}">
                ${children_introduction ?
            `<div class="introduction width-11 d-width-cell">
                        <p>${children_introduction}</p>
                    </div>` : ``}
            </div>`
}


// 进入照片详情首张开头图片相关dom 
function intoPhotoItem(item) {
    let photoDetailStr = ''
    const topPhotoDetail = `
            <div class="top-photo">
                <img src="${item.cephalogram_url}">
            </div>`
    item.children.forEach(detail_item => {
        photoDetailStr += creatDetailPhotoDom(detail_item.children_url, detail_item.children_introduction)
    })
    photoDetail.innerHTML = topPhotoDetail + photoDetailStr
}

// 创建加载loading-dom
function addLoding() {
    const loadingDom = document.createElement('div');
    const loadingImg = document.createElement('img');
    loadingDom.className = 'loading';
    loadingImg.src = '../image/logo.png';
    loadingDom.appendChild(loadingImg);
    content.appendChild(loadingDom);
    return loadingDom
}

// 进入照片详情
function intoDetail(index) {
    // 获取滚动条位置
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // 照片详情的内容设置
    intoPhotoItem(photosInfo[index])
    const loading = addLoding()
    loading.style.display = 'block';
    loading.style.animation = 'loading-init 1s cubic-bezier(1, 0.06, .2, .97) forwards';
    photoWall.style.animation = 'item-out 1s cubic-bezier(1,.06,.2,.6)';
    // 滚动条回到最顶端
    setTimeout(function () {
        window.scrollTo({
            top: 0,
        }
        );
        loading.style.animation = 'loading-out 1s cubic-bezier(1,0.06,.2,.97)';
        photoWall.style.display = 'none';
        photoDetail.style.display = 'flex';
        photoDetail.style.animation = 'item-init 1s cubic-bezier(1,0.06,.2,.97) forwards';
        // 监听事件，当发生了animationend，执行function函数
        loading.addEventListener('animationend', function () {
            // 从content中移除loading元素
            content.removeChild(loading)
        }, false)
    }, 1000)
    isHome = true
}
function goHome() {
    if (isHome) {
        const loading = addLoding();
        loading.style.display = 'block';
        loading.style.animation = 'loading-init 1s cubic-bezier(1, 0.06, .2, .97) forwards'
        photoDetail.style.animation = 'item-out 1s cubic-bezier(1, 0.06, .2, .97)'
        setTimeout(function () {
            photoWall.style.display = 'flex'
            loading.style.animation = 'loading-out 1s cubic-bezier(1,0.06,.2,.97)'
            photoDetail.style.display = 'none'
            photoWall.style.animation = 'item-init 1s cubic-bezier(1,0.06,.2,.97) forwards'
            // 滚动条回到原来位置
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
            loading.addEventListener('animationed', function () {
                content.removeChild(loading);
            }, false)
        }, 1000)
        isHome = false
    }
}
// 给每个照片添加点击事件，点击了就调用intoDetail函数
photoItem.forEach((item, index) => {
    item.addEventListener('click', function () {
        intoDetail(index)
    })
})
// home点击事件
home.addEventListener('click', function () {
    goHome()
})