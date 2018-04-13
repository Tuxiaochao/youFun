function renderNav(channelArr) {
    var nav = $(".articles .nav");
    var channels = '';
    channelArr.forEach((item, index) => {
        console.log("articles", item);
        channels += '<span id="channel_' + item.channelid + '">' + item.channel + '</span>';
    });
    setTimeout(function() {
        nav.html(channels);
    }, 0);
}