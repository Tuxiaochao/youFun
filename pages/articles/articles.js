function renderNav(channelArr) {
    var navs = $(".articles .navs");
    var channels = '';
    channelArr.forEach((item, index) => {
        channels += '<span id="channel_' + item.channelid + '">' + item.channel + '</span>';
    });
    setTimeout(function() {
        navs.html(channels);

        // 点击频道请求该频道的文章
        $(".articles .navs").find('span').click(function() {
            getArticle($(this).attr("id").split("_")[1]);
        });
        
        getArticle(channelArr[0].channelid);
    }, 0);
}

function getArticle(channelid) {
    $(".articles .navs").find('span').removeClass("currentChannel");
    $(".articles .navs").find('span[id="channel_'+ channelid +'"]').addClass("currentChannel");

    //get articleList
    var url = useLocalData ? "json/articlelist.json" : "http://jisuwxwzjx.market.alicloudapi.com/weixinarticle/get";
    $.ajax({
        url: url,
        // url: "json/articlelist.json",
        type: "GET",
        data: {
            "channelid": channelid,
            "num": "10",
            "start": "0"
        },
        dataType: "json",
        cache: true,
        success: function(result,status,xhr) {
            renderArticleList(result.result.list);
        },
        error: function(xhr,status,error) {

        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "APPCODE f02fb33b2e774207ae69298c1acb1045");
        }  
    });
}

function renderArticleList(list) {
    var listBox = $(".articleList ul");
    var liArr = [];
    list.forEach((item, index) => {
        liArr.push(`
            <li>
                <a href="${item.url}">
                    <div class="imgBox">
                        <img src="${item.pic}" >
                        <span class="title">${item.title}</span>
                    </div>
                    <div class="summary">${item.weixinsummary}</div>
                </a>
            </li>
        `);
    });

    setTimeout(function() {
        listBox.html(liArr.join(""));
    }, 0);
}