chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.tabs.getCurrent(function (tab) {
        var isCurrentTab = sender.tab && tab.url === sender.tab.url;
        // 初始化职位列表
        if (isCurrentTab && request.target === "content_crawlClick" && request.type === "back") {
            var result = request.data;
            $("#userName").val(result.userName);
            $("#sex").val(result.sex);
            $("#expectAddress").val(result.expectAddress);
            $("#age").val(result.age);
            $("#degree").val(result.degree);
            $("#phone").val(result.phone);
            $("#workLength").val(result.workLength);
            $("#email").val(result.email);
            $("#expectJob").val(result.expectJob);
            $("#currentState").val(result.currentState);
            $("#expectSalary").val(result.expectSalary);
            $("#expectJobProperty").val(result.expectJobProperty);
            $("#jobTitle").val(result.jobTitle);
            $("#workLocaltion").val(result.workLocaltion);
            $("#isMarry").val(result.isMarry);
            $("#expectIndustry").val(result.expectIndustry);
            $("#selfEvaluation").val(result.selfEvaluation);
            // $("#languageList").val(result.languageList);
            // $("#educationList").val(result.educationList);
            // $("#certificateList").val(result.certificateList);
            // $("#projectList").val(result.projectList);
            // $("#workExpList").val(result.workExpList);
        }
    })
});



$(function () {

    initPosition();

    // 采集
    $("#bnt_crawl").on("click", function (e) {
        let action_data = {
            source: "content_crawlClick",
            target: "content_crawlClick",
            type: "call",
            action: "crawl",
            data: "",
        };
        send_message_to_content_script(action_data)
    });

    // 入库
    $("#bnt_in_database").on("click", function () {
        let action_data = {
            source: "content_inDBClick",
            target: "content_inDBClick",
            type: "call",
            action: "inDB",
            data: {
                userName: $("#userName").val(),
                sex: $("#sex").val(),
                expectAddress: $("#expectAddress").val(),
                age: $("#age").val(),
                degree: $("#degree").val(),
                phone: $("#phone").val(),
                workLength: $("#workLength").val(),
                email: $("#email").val(),
                expectJob: $("#expectJob").val(),
                currentState: $("#currentState").val(),
                expectSalary: $("#expectSalary").val(),
                expectJobProperty: $("#expectJobProperty").val(),
                jobTitle: $("#jobTitle").val(),
                ehrPostId: $("#ehrPostId").val(),
                workLocaltion: $("#workLocaltion").val(),
                isMarry: $("#isMarry").val(),
                expectIndustry: $("#expectIndustry").val(),
                selfEvaluation: $("#selfEvaluation").val(),
                // educationList: $("#educationList").val(),
                // languageList: $("#languageList").val(),
                // certificateList: $("#certificateList").val(),
                // projectList: $("#projectList").val(),
                // workExpList: $("#workExpList").val(),
            },
        };
        if (!action_data.data.phone || action_data.data.phone.indexOf("*") !== -1) {
            send_message_to_content_script({
                source: "content_inDBClick",
                target: "content_alertTips",
                type: "call",
                action: "alert_tips",
                data: "请完善电话号码！",
            }, function () {
            });
        }else if (action_data.data.phone.match(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/) === null){
            send_message_to_content_script({
                source: "content_inDBClick",
                target: "content_alertTips",
                type: "call",
                action: "alert_tips",
                data: "请输入正确的电话号码！",
            }, function () {
            });
        }
        else if (action_data.data.ehrPostId === "0") {
            send_message_to_content_script({
                source: "content_inDBClick",
                target: "content_alertTips",
                type: "call",
                action: "alert_tips",
                data: "请选择应聘岗位！",
            }, function () {
            });
        } else if (action_data.data.userName.indexOf("*") !== -1) {
            send_message_to_content_script({
                source: "content_inDBClick",
                target: "content_alertTips",
                type: "call",
                action: "alert_tips",
                data: "请完善姓名！",
            }, function () {
            });
        } else {
            send_message_to_content_script(action_data, function (result) {
            });
        }
    });

    // 加载后自动抓取一波
    $("#bnt_crawl").click()
});




// 初始化职位列表发消息
function initPosition() {
    $.ajax({
        method: "GET",
        url: extConfig.apiEhrPostId,
        headers: {},
        success: function (res) {
            $("#ehrPostId").prepend("<option value='0'>请选择岗位</option>");
            var json_body = res;
            for (var i in json_body.result) {
                $("#ehrPostId").append("<option value=" + json_body.result[i].ehrPostId + ">" + json_body.result[i].ehrPostName + "</option>")
            }
            // 搜索下拉框
            $("#ehrPostId").select2();
        },
        error: function (res) {
            console.log("get error");
        }
    });
}

function send_message_to_content_script(message, callback) {
    chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.sendMessage(tab.id, message, function (response) {
            if (callback) {
                callback(response)
            }
        })
    })
}
