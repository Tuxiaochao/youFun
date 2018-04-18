var useLocalData = true;
$(document).ready(function() {
    
    var page = 0;
    directPage(page);
    $(".tab").find("li").click(function() {
        // 清除老的active li的样式
        var oldLi = $(".tab li").eq(page);
        oldLi.find("img").attr("src", oldLi.find("img").attr("src").replace(/_active.png/g, ".png"));
        oldLi.removeClass("active")

        page = $(this).index();
        directPage(page);
        // 添加新的active li的样式
        $(this).addClass("active");
        var activeImg = $(this).find("img");
        activeImg.attr("src", activeImg.attr("src").replace(/.png/g, "_active.png"));
    });

    function directPage(page) {
        var title = $(".head p");
        switch(page) {
            case 0: 
                getChannels();
                title.html("精选文章");
                break;
            case 1:
                getNews();
                title.html("热点新闻");
                break;
            case 2:
                getPicture();
                title.html("精选美图");
                break;
            case 3:;
                getHistory();
                title.html("往日今期");
                break;
        }
    }

    function getChannels() {
        var content = $(".content");
        var url = useLocalData ? "json/channel.json" : "http://jisuwxwzjx.market.alicloudapi.com/weixinarticle/channel";
        $.ajax({
            url: url,
            type: "GET",
            data: {},
            dataType: "json",
            cache: true,
            success: function(result,status,xhr) {
                renderNav(result.result);
            },
            error: function(xhr,status,error) {

            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "APPCODE f02fb33b2e774207ae69298c1acb1045");
                content.load("pages/articles/articles.html");
            }  
        });
    }

    function getNews() {}
    function getPicture() {
        var content = $(".content");
        var url = useLocalData ? "json/pictureType.json" : "http://ali-pic.showapi.com/852-1";
        $.ajax({
            url: url,
            type: "GET",
            data: {},
            dataType: "json",
            cache: true,
            success: function(result,status,xhr) {
                renderPictures(result.showapi_res_body.list);
            },
            error: function(xhr,status,error) {

            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "APPCODE f02fb33b2e774207ae69298c1acb1045");
                content.load("pages/pictures/pictures.html");
            }  
        });
    }

    function getHistory() {
        var content = $(".content");
        var url = useLocalData ? "json/history.json" : "http://ali-todayhistory.showapi.com/today-of-history";
        $.ajax({
            url: url,
            type: "GET",
            data: {},
            dataType: "json",
            cache: true,
            success: function(result,status,xhr) {
                renderHistory(result.showapi_res_body.list);
            },
            error: function(xhr,status,error) {

            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "APPCODE f02fb33b2e774207ae69298c1acb1045");
                content.load("pages/history/history.html");
            }  
        });
    }
});