function renderPictures(list) {
    var ele = $(".swiper-container .swiper-wrapper");
    var slideArr = [];
    list.forEach((item, index) => {
        if (item.list.length > 8) {
            list.push({
                "name": item.name,
                "list": item.list.slice(8, item.list.length)
            });
            item.list.length = 8;
        }
    })
    list.forEach((item, index) => {
        var typeArr = [];
        item.list.forEach((obj, i) => {
            typeArr.push(`
                <button class="btn type" id="${obj.id}">${obj.name}</button>
            `);
        });
        slideArr.push(`
            <div class="swiper-slide">
                <p>${item.name}</p>
                <div class="typeBox">${typeArr.join("")}</div>
            </div>
        `);
    });
    ele.html(slideArr.join(""));
    setTimeout(function() {
        var btn = $(".swiper-container .swiper-wrapper button");
        btn.click(function() {
            var id = $(this).attr("id");
            btn.removeClass("active");
            $(this).addClass("active");
            getPictures(id);
        });
        btn.eq(0).addClass("active");
        getPictures(btn.eq(0).attr("id"));
        runSwiper();
    }, 0);
}

function getPictures(id) {
        var url = useLocalData ? "json/pictures.json" : "http://ali-pic.showapi.com/852-2";
        $.ajax({
            url: url,
            type: "GET",
            data: {
                "page": 10,
                "type": id
            },
            dataType: "json",
            cache: true,
            success: function(result,status,xhr) {
                renderPicsBox(result.showapi_res_body.pagebean.contentlist);
            },
            error: function(xhr,status,error) {

            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "APPCODE f02fb33b2e774207ae69298c1acb1045");
            }  
        });
}

function renderPicsBox(list) {
    var ele = $(".pictures .picture-box .list");
    var lis = [];
    list.forEach((item, index) => {
        var imgs = [];
        item.list.forEach((obj, index) => {
            imgs.push(`
                <img src="${obj.big}">
            `);
        });
        lis.push(`
            <li>
                <div class="title"><strong>${item.typeName}</strong> || ${item.title}</div>
                <div class="imgs">${imgs.join("")}</div>
            </li>
        `);
    });
    ele.html(lis.join(""));
}

function runSwiper() {
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        loop: true,
        grabCursor: true,
        watchOverflow: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      }); 
}