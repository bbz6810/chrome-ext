// 向页面注入JS
function injectCustomJs(jsPath) {
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}


// 注入页面内的js
// $.getScript(chrome.extension.getURL("./js/tools/common.js"), function () {
//     console.log(22222)
// });


// 用新数据替换旧数据
function replace_old_data(old_data, new_data) {
    for (var key in old_data) {
        if (new_data.hasOwnProperty(key)) {
            old_data[key] = new_data[key];
        }
    }
}


function parse_domain(url) {
    return url.split("//")[1].split("/")[0];
}

function find_tab(tabArray, new_tab_url) {
    for (var tab in tabArray) {
        if (tabArray[tab].url.indexOf(parse_domain(new_tab_url)) !== -1) {
            return tabArray[tab];
        }
    }
}
