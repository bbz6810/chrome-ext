$(function () {
    $("button.ivu-btn").on("click", function () {
        var param = {
            email: $("div.ivu-form-item-required>div>div>input").val(),
            password: $("form.ivu-form>div:nth-child(2)>div>div>input").val(),
        };
        $.post("http://zhaopin.nb01.info/api/v1/user/login",
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
            }
        );
    });
});
