// 发送消息到content
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // 推送cookie，先判断时间是否大于一段时间，并且cookie为空时不推送
        if (request.target === "background_cookie" && request.type === "call") {
            var current_time = parseInt(new Date().valueOf() / 1000);
            var platform = extConfig.mapPlatform[request.data.platform_id];
            chrome.cookies.getAll({
                url: extConfig.mapCookieUrl[request.data.platform_id],
            }, function (res) {
                if (res.length) {
                    var cookie = [];
                    for (var i in res) {
                        cookie.push(res[i].name + "=" + res[i].value);
                    }
                    request.data.cookie = cookie.join("; ");
                    chrome.storage.local.get("push_cookie_time", function (time) {
                        if (time.push_cookie_time) {
                            if (time.push_cookie_time[platform]) {
                                if (current_time - time.push_cookie_time[platform] > extConfig.pushCookieTimeSleep) {
                                    $.ajax({
                                        method: "POST",
                                        url: extConfig.apiPushCookie,
                                        headers: {
                                            'Content-type': 'application/json'
                                        },
                                        data: JSON.stringify(request.data),
                                        async: true,
                                        success: function () {
                                            time.push_cookie_time[platform] = parseInt(new Date().valueOf() / 1000);
                                            chrome.storage.local.set(time,
                                                function () {
                                                }
                                            );
                                        },
                                        error: function (res) {
                                        }
                                    });
                                } else {
                                    // 不推cookie
                                }
                            } else {
                                $.ajax({
                                    method: "POST",
                                    url: extConfig.apiPushCookie,
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    data: JSON.stringify(request.data),
                                    async: true,
                                    success: function (res) {
                                        time.push_cookie_time[platform] = current_time;
                                        chrome.storage.local.set(time,
                                            function () {
                                            }
                                        );
                                    },
                                    error: function (res) {
                                    }
                                });
                            }
                        } else {
                            time.push_cookie_time = {};
                            $.ajax({
                                method: "POST",
                                url: extConfig.apiPushCookie,
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                data: JSON.stringify(request.data),
                                async: true,
                                success: function (res) {
                                    time.push_cookie_time[platform] = current_time;
                                    chrome.storage.local.set(time,
                                        function () {
                                        }
                                    );
                                },
                                error: function (res) {
                                }
                            });
                        }
                    });
                }
            });
        }
        else if (request.target === "background_tabs" && request.type === "call") {
            chrome.tabs.query({
                currentWindow: true
            }, function (tabArray) {
                var tab = find_tab(tabArray, request.data);
                if (tab === undefined) {
                    chrome.tabs.create({
                        url: request.data,
                    }, function (tabInfo) {
                    });

                } else {
                    chrome.tabs.highlight({
                        tabs: tab.index,
                    });
                    chrome.tabs.update({
                        url: request.data,
                    }, function (tabInfo) {
                    });
                }
            });
        }
    }
);
// 监听指定网址的网络请求
chrome.webRequest.onCompleted.addListener(
    function (detail) {
        if (detail.url.indexOf('https://www.zhipin.com/chat/geek/chatinfo?uid=') !== -1) {
            sendMessageToContentScript({"signal": "show"}, function () {
            });
        } 
    }, {
        urls: ["https://www.zhipin.com/chat/*"]
    }, ["responseHeaders"]
);


