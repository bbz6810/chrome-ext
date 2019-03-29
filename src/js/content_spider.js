// $.getScript(chrome.extension.getURL("./js/inject/zhilian_login.js"), function () {
// });

// // 监听inject来的消息
// window.addEventListener("message", function (e) {
//     chrome.storage.sync.set({zhilian_account_info: e.data.zhilian_account_info}, function f() {
//     });
//
// }, false);

// 监听发送到content的事件
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.target === "content_crawlClick" && request.type === "call") {
        if (document.URL.indexOf("zhaopin") !== -1) {
            parseZhilianResumeDetail(request.action, {});
        } else if (document.URL.indexOf("51job") !== -1) {
            parseJob51ResumeDetail(request.action, {});
        } else if (document.URL.indexOf("/resumedetail") !== -1) {
            parseP58ResumeDetail(request.action, {});
        } else if (document.URL.indexOf("showresumedetail") !== -1) {
            parseLiepinResumeDetail(request.action, {});
        } else if (document.URL.indexOf("zhipin") !== -1) {
            parseBossResumeDetail(request.action, {})
        } else {

        }
    } else if (request.target === "content_inDBClick" && request.type === "call") {
        if (document.URL.indexOf("zhaopin") !== -1) {
            parseZhilianResumeDetail(request.action, request.data);
        } else if (document.URL.indexOf("51job") !== -1) {
            parseJob51ResumeDetail(request.action, request.data);
        } else if (document.URL.indexOf("/resumedetail") !== -1) {
            parseP58ResumeDetail(request.action, request.data);
        } else if (document.URL.indexOf("showresumedetail") !== -1) {
            parseLiepinResumeDetail(request.action, request.data);
        } else if (document.URL.indexOf("zhipin") !== -1) {
            parseBossResumeDetail(request.action, request.data);
        }
    } else if (request.target === "content_alertTips" && request.type === "call") {
        alert(request.data);
    }
});


var hamburgerIsClosed = false,
    hamburgerTrigger = null;

window.onload = function () {
    load_detail()
};

chrome.runtime.onMessage.addListener(function (request) {
    if (request.signal === 'show') {
        parseBossResumeDetail("crawl", {});
    }
});

function load_detail() {
    if ($('#sunlands-sidebar-wrapper').length > 0) {
        return
    }
    templeteHtml.$iframe.attr("src", chrome.extension.getURL("detail.html"));
    templeteHtml.$wrapper.find("#sunlands-sidebar-wrapper").append(templeteHtml.$iframe);
    $("body").append(templeteHtml.$wrapper);
    hamburgerTrigger = $('#hamBtn');
    hamburgerTrigger.off('click');
    hamburgerTrigger.click(function () {
        hamburger_cross();
    });
    $('[data-toggle="offcanvas"]').click(function () {
        $('#sunlands-sidebar-container').toggleClass('toggled');
    });
    chrome.storage.local.get(["hamburgerIsClosed"], function (res) {
        console.log("hide", res.hamburgerIsClosed);
        if (!res.hamburgerIsClosed) {
            console.log("hamburgerIsClosed", res.hamburgerIsClosed);
            $('[data-toggle="offcanvas"]').click();
        }
    });
}

function hamburger_cross() {
    chrome.storage.local.set({
        "hamburgerIsClosed": hamburgerIsClosed
    });
    if (hamburgerIsClosed === true) {
        $('.overlay').hide();
        hamburgerTrigger.removeClass('is-open');
        hamburgerTrigger.addClass('is-closed');
        hamburgerIsClosed = false;
    } else {
        $('.overlay').show();
        hamburgerTrigger.removeClass('is-closed');
        hamburgerTrigger.addClass('is-open');
        hamburgerIsClosed = true;
    }
}

function contentSendMessage(send_data) {
    chrome.runtime.sendMessage(send_data, function (response) {});
}

var templeteHtml = {
    $wrapper: $('<div id="sunlands-sidebar-container"> ' +
        '    <nav class="navbar navbar-fixed-top" id="sunlands-sidebar-wrapper" role="navigation">' +
        '    </nav> ' +
        '    <div id="page-content-wrapper">' +
        '        <button type="button" class="hamburger is-closed" data-toggle="offcanvas" id="hamBtn">' +
        '            <span class="hamb-open"></span>' +
        '            <span class="hamb-close"></span>' +
        '        </button> ' +
        '    </div> ' +
        '</div>'),
    $iframe: $('<iframe src="" id="iframe_mix" style="width: 306px; height: 570px; border: 0px; clip: auto; display: block !important;">' +
        '</iframe>')
};
