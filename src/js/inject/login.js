console.log("login inject");
$(function () {
    // 前程无忧
    $("a#Login_btnLoginCN").on("click", function () {
        var company_name = $("input#txtMemberNameCN").val();
        var username = $("input#txtUserNameCN").val();
        console.log(username);
        chrome.storage.local.set(
            {
                job51_account_info: {
                    company_name: company_name,
                    username: username,
                }
            }, function (res) {
                console.log(res);
            }
        );
    });
    // 智联
    $("input#loginbutton").on("click", function () {
        var username = $("input#loginName").val();
        chrome.storage.local.set(
            {
                zhilian_account_info: {
                    username: username,
                    // passwd: passwd,
                }
            }, function (res) {
                console.log(res);
            }
        );
    });
    // 58
    $("input#btnSubmitUser").on("click", function () {
        var username = $("input#usernameUser").val();
        chrome.storage.local.set(
            {
                p58_account_info: {
                    username: username,
                }
            }, function (res) {
                console.log(res);
            }
        )
    });
    // 猎聘
    $("form.login-form>div:nth-child(7)>button").on("click", function () {
        var username = $("input.user-name").val();
        chrome.storage.local.set(
            {
                liepin_account_info: {
                    username: username,
                }
            }
        );
    });
    // boss
    if (document.URL.indexOf("https://www.zhipin.com/chat/") === 0) {
        var username = $("#main > div.side-wrap > div > div.figure > span").text();
        chrome.storage.local.set(
            {
                boss_account_info: {
                    username: username
                }
            }, function (res) {
                console.log(res);
            }
        )
    }

});
