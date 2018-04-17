$(document).ready(function() {
    var page = 0;
    directPage(page);
    $(".tab").find("li").click(function() {
        page = $(this).index();
        directPage(page);
        var lis = $(this).parent().find("li");
        lis.each((index, element) => {
            var img = $(element).find("img");
            if (index == page) {
                if (!$(element).attr("class") || $(element).attr("class").indexOf("active") <= -1) {
                    $(element).addClass("active");
                    img.attr("src", img.attr("src").replace(/.png/g, "_active.png"));
                }
            } else {
                $(element).removeClass("active");
                img.attr("src", img.attr("src").replace(/_active.png/g, ".png"))
            }
        });
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
            case 3:
                getHistory();
                title.html("往日今期");
                break;
        }
    }

    function getChannels() {
        var content = $(".content");
        $.ajax({
            // url: "http://jisuwxwzjx.market.alicloudapi.com/weixinarticle/channel",
            url: "json/channel.json",
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
                // xhr.setRequestHeader("Authorization", "APPCODE f02fb33b2e774207ae69298c1acb1045");
                content.load("pages/articles/articles.html");
            }  
        });
    }

    function getNews() {}
    function getPicture() {}
    function getHistory() {}
});