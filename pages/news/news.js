function renderNews(list) {
    var getTime = function(date) {
        var now = new Date().getTime();
        var old = new Date(date).getTime();
        var min = (parseInt(now) - parseInt(old)) / 1000 / 60; //分
        if (min / (60*24) >= 1) {
            return Math.floor(min / (60*24)) + '天前';
        } else if (min / 60 >= 1) {
            return Math.floor(min / 60) + '小时前';
        } else {
            return Math.floor(min) + '分钟前';
        }
    }

    var ulBox = $(".news .news-content ul");
    var lis = [];
    
    list.forEach((item, index) => {
        if (item.thumbnail_pic_s02) {
            lis.push(`
            <li><a href="${item.url}">
                <div class="new-title">${item.title}</div>
                <div class="new-pics">
                    <img src="${item.thumbnail_pic_s}">
                    <img src="${item.thumbnail_pic_s02}">
                    ${item.thumbnail_pic_s03 ? '<img src="' + item.thumbnail_pic_s03 + '">' : ''}
                </div>
                <div class="new-info">${item.author_name + '  ' + getTime(item.date)}</div>
            </a></li>
            `);
        } else {
            lis.push(`
                <li><a class="new-style" href="${item.url}">
                <p class="title">${item.title}</p>
                <p class="new-info">${item.author_name + '  ' + getTime(item.date)}</p>
                <img src="${item.thumbnail_pic_s}">
                </a></li>
            `);
        }
    });

    setTimeout(function() {
        ulBox.html(lis.join(""));
    }, 0);
}