setInterval(function () {
    var send_data = {
        source: "content_cookie",
        target: "background_cookie",
        type: "call",
        action: "push_cookie",
        data: {
            platform_id: "",
            cookie: "",
            account: "",
            password: "",
            ext: {},
        }
    };
    // 智联
    if (document.URL.indexOf("https://rd5.zhaopin.com") === 0 && document.URL.indexOf("?") === -1) {
        send_data.data.platform_id = "10001";
        chrome.runtime.sendMessage(send_data, function (response) {
        });
    }
    // 前程
    if (document.URL.indexOf("https://ehire.51job.com") === 0 && $("a#MainMenuNew1_HrUName").text() !== "") {
        send_data.data.platform_id = "10005";
        chrome.runtime.sendMessage(send_data, function (response) {
        });
    }
    // 58
    if (document.URL.indexOf("https://employer.58.com") === 0) {
        send_data.data.platform_id = "10002";
        chrome.runtime.sendMessage(send_data, function (response) {
        });
    }
    // 猎聘
    if (document.URL.indexOf("https://lpt.liepin.com") === 0) {
        send_data.data.platform_id = "10003";
        chrome.runtime.sendMessage(send_data, function (response) {
        });
    }
    // boss
    if (document.URL.indexOf("https://www.zhipin.com/chat") === 0) {
        send_data.data.platform_id = "10004";
        chrome.runtime.sendMessage(send_data, function (response) {
        });
    }

}, 1000 * 10);


function _send_cookie_message(send_data) {
    var account_info = extConfig.mapAccountInfo[send_data.data.platform_id];
    chrome.storage.local.get(account_info, function (res) {
        if (res[account_info].username) {
            send_data.data.account = res[account_info].username;
            chrome.runtime.sendMessage(send_data, function (response) {
            });
        }
    });
}