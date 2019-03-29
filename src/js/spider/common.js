function sendData(retv_dict, action, new_data) {
    chrome.storage.local.get(extConfig.mapAccountInfo[retv_dict.platId], function (res) {
        if (res[extConfig.mapAccountInfo[retv_dict.platId]]) {
            retv_dict.account = res[extConfig.mapAccountInfo[retv_dict.platId]].username;
        } else {
            retv_dict.account = "";
        }
        if (action === "crawl") {
            contentSendMessage(
                {
                    source: "content_crawlClick",
                    target: "content_crawlClick",
                    type: "back",
                    action: "crawl",
                    data: retv_dict,
                }, function () {
                }
            );
        } else if (action === "inDB") {
            replace_old_data(retv_dict, new_data);
            Format[extConfig.mapPlatform[retv_dict.platId]](retv_dict);
            chrome.storage.local.get(["access_token", "token_type"], function (res) {
                var headers = {
                    'Content-type': 'application/json',
                    "token-type": res.token_type,
                    "Authorization": res.access_token,
                };
                $.ajax({
                    method: "POST",
                    url: extConfig.apiDeliver,
                    headers: headers,
                    data: JSON.stringify(retv_dict),
                    async: true,
                    success: function (res) {
                        if (res.code === 200) {
                            var message = confirm("采集" + res.message + "！\n直接到招聘系统处理？");
                            if (message) {
                                chrome.runtime.sendMessage({
                                    source: "content_spiderCommon",
                                    target: "background_tabs",
                                    type: "call",
                                    action: "move",
                                    data: res.result.redirect,
                                }, function (response) {
                                });
                            }
                        } else {
                            alert(res.message);
                        }
                    },
                    error: function () {
                        alert("入库失败，请检查网络...");
                    }
                });
            });
        }
    });
}
