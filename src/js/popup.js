// 前后端发送消息体格式
// {
//     "action": "",
//     "data": ""
// }


function send_message_to_content_script(message, callback) {
    chrome.tabs.query({
            active: true,
            currentWindow: true
        },
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
                if (callback) callback(response)
            })
        }
    )
}


$(document).ready(function () {

    initPopup();
    function initPopup() {
        chrome.storage.local.get(["access_token", "token_type", "latest_user", "latest_pwd"], function (result) {
            $.ajax({
                method: "GET",
                url: extConfig.apiUserInfo,
                headers: {
                    "token-type": result.token_type,
                    "Authorization": result.access_token
                },
                success: function (res) {
                    if (res.code === 200) {
                        chrome.storage.local.set({
                            "user": res.result.loginUser
                        });
                        $("#userName").text(res.result.loginUser.loginUserName);
                        $("#bind").hide();
                        $("#logout").show();

                    } else {
                        $("#loginName").val(result.latest_user);
                        $("#loginPwd").val(result.latest_pwd);
                        $("#bind").show();
                        $("#logout").hide();
                    }
                },
                error: function () {
                    alert("error");
                }
            });
        });
    }

    $("#btn_bind").click(function () {
        var param = {
            email: $("#loginName").val(),
            password: $("#loginPwd").val(),
        };
        $.post(extConfig.apiUserLogin,
            param,
            function (res) {
                if (res.code === 200) {
                    chrome.storage.local.set({
                        "token_type": res.data.token_type,
                        "access_token": res.data.access_token,
                        "latest_user": param.email,
                        "latest_pwd": param.password
                    })
                } else if (res.code === 1001) {
                    alert(res.result["504"].join())
                }
                initPopup();
            })
    });

    $("#btn_logout").click(function () {
        chrome.storage.local.set({
            "user": "",
            "access_token": "",
            "token_type": ""
        }, function () {
            initPopup();
        })
    });
});


//var bg = chrome.extension.getBackgroundPage()
//bg.test_popup()
//alert(bg.document.body.innerHTML)


function call_send_message(message_data) {
    send_message_to_content_script(message_data, function (response) {
        // console.log(response);
        // console.log("我收到了来自content_script的回复：" + JSON.parse(response));
        // alert(response || "该页面不是可采集的页面！");
    })
}


// 监听popup页面消失的方法
// let port = chrome.runtime.connect();
