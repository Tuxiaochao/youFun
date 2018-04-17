function renderHistory(list) {
    var listBox = $(".historyList ul");
    var liArr = [];
    list.sort((a, b) => a.year - b.year);
    list.forEach((item, index) => {
        if (item.img) {
            liArr.push(`
            <li>
                <div class="imgBox">
                    <img src="${item.img}" >
                    <span class="title">${item.year + '-' + item.month + '-' + item.day}</span>
                </div>
                <div class="summary">${item.title}</div>
            </li>
        `);
        }
    });

    setTimeout(function() {
        listBox.html(liArr.join(""));
    }, 0);
}