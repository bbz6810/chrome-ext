function fetch_js_var() {
    return {
        zhilian_account_info: {
            username: window.$user.loginPoint.orgName || $("div.rd55-header__base>div>div>span:nth-child(1)").text(),
        }
    }
}

function send_to_content(send_data) {
    window.postMessage(send_data, '*');
}

send_to_content(fetch_js_var());