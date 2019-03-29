function parseBossResumeDetail(action, new_data) {
    let retv_dict = {};
    retv_dict.platId = "10004";
    retv_dict.downloadFlag = "1";
    retv_dict.downloadType = 1;
    retv_dict.downloadStatus = 0;
    retv_dict.downloadExpired = new Date().valueOf();
    retv_dict.jobCode = ""; // 得有
    retv_dict.resumePath = "";
    retv_dict.resumeId = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.detail-bottom > div.btns > em").attr('data-eid');
    retv_dict.downloadFlag = "1";
    retv_dict.payOutFlag = "2";
    retv_dict.inWay = '190001';
    // 转换
    retv_dict.currentState = $('#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div.resume-item.item-base > div.item-right > div:nth-child(1) > div > span:nth-child(7)').text();
    retv_dict.askTime = "";
    var date = new Date();
    retv_dict.updateDate = date.getFullYear() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getDate();
    retv_dict.isBrandUniversity = "";
    retv_dict.isBrandCompany = "";
    retv_dict.extraData = "";
    retv_dict.seekerId = retv_dict.resumeId;
    retv_dict.jobId = ""; //得有
    retv_dict.OperationDateTime = new Date().valueOf();
    retv_dict.userName = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div.resume-item.item-base > div.item-right > div:nth-child(1) > h2 > div").text();
    retv_dict.resumeName = retv_dict.userName;
    retv_dict.filename = retv_dict.userName + ".html";
    retv_dict.sex = "";
    // 需要转换
    retv_dict.degree = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div.resume-item.item-base > div.item-right > div:nth-child(1) > div > span:nth-child(5)").text();
    retv_dict.expectJob = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div:nth-child(2) > div > div > span:nth-child(1)").text();
    retv_dict.phone = "";
    retv_dict.email = "";
    // 7k-9k
    retv_dict.expectSalary = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div:nth-child(2) > div > div > span:nth-child(5)").text();

    retv_dict.age = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div.resume-item.item-base > div.item-right > div:nth-child(1) > div > span:nth-child(1)").text();
    retv_dict.expectJobProperty = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div:nth-child(2) > div > div > span:nth-child(3)").text().replace(/\s/g, '');
    retv_dict.jobTitle = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.detail-bottom > div.text > span.text-blue.link-job").text();
    retv_dict.ehrPostId = "";
    retv_dict.workLocaltion = "";
    retv_dict.isMarry = "";
    retv_dict.workLength = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div.resume-item.item-base > div.item-right > div:nth-child(1) > div > span:nth-child(3)").text();
    retv_dict.expectAddress = "";
    retv_dict.politicalStatus = "";
    retv_dict.expectIndustry = retv_dict.expectJobProperty;
    retv_dict.address = "";
    retv_dict.headerImg = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div.resume-item.item-base > div.figure > img").attr("src");
    retv_dict.selfEvaluation = $("#container > div.chat-container.page-container > div.sec-content > div.detail-box > div.chat-wrap > div.chat-tab-content.resume-container.show-box > div.resume-content-load > div > div > div.resume-item.item-base > div.item-right > div.text").text().replace(/\s/g, '');
    retv_dict.certificateList = [];
    retv_dict.languageList = [];
    let list_tmp = $(".resume-item");
    let project_list = [], work_list = [], edu_list = [];
    function list_struct(list_tmp, project_list, work_list, edu_list) {
        list_tmp.each(function () {
            if ($(this).find('h3').text().indexOf("项目经验") !== -1) {
                let history_list = $(this).find(".item-right > .history-list .history-item");
                history_list.each(function () {
                    let return_result = {developEnvironment: '', developTool: '', dutyDesc: '', developDesc: ''};
                    return_result.projectDate = $(this).find('span:eq(0)').text().replace(/\./g, '/');
                    return_result.projectName = $(this).find('h4').text().replace(/\s/g, '');
                    return_result.developEnvironment = '';
                    return_result.developTool = '';
                    return_result.dutyDesc = [$(this).find('.item-text > .text').text()];
                    return_result.developDesc = '';
                    project_list.push(return_result);
                })
            }
            else if ($(this).find('h3').text().indexOf("工作经历") !== -1) {
                let history_list = $(this).find(".item-right > .history-list .history-item");
                history_list.each(function () {
                    let work_tmp = {};
                    work_tmp.year = $(this).find('span:eq(0)').text().replace(/\./g, '/');
                    work_tmp.length = '';
                    work_tmp.company = $(this).find('h4').text().replace(/\s/g, '');
                    work_tmp.position = '';
                    work_tmp.salary = '';
                    work_tmp.industry = '';
                    work_tmp.companyAsset = '';
                    work_tmp.desc = [$(this).find('.item-text > .text').text()];
                    work_list.push(work_tmp)
                })
            }
            else if ($(this).find('h3').text().indexOf("教育经历") !== -1) {
                let history_list = $(this).find(".item-right > .history-list .history-item");
                history_list.each(function () {
                    let edu_tmp = {};
                    edu_tmp.educationTime = $(this).find('span:eq(0)').text().replace(/\./g, '/');
                    let major_tmp = $(this).find('h4').html().replace(/\s/g, '');
                    edu_tmp.major = major_tmp.match(/<\/em>(.*?)<emclass="vline">/)[1];
                    edu_tmp.eduDegree = major_tmp.slice(-2);
                    edu_tmp.degree = __format_degree(major_tmp.slice(-2));
                    edu_tmp.university = $(this).find('h4 > b').text().replace('/.s/g', '');
                    edu_list.push(edu_tmp)
                });
            }
        });
        return [project_list, work_list, edu_list];
    }
    let list_result = list_struct(list_tmp, project_list, work_list, edu_list);
    retv_dict.projectList = list_result[0];
    retv_dict.workExpList = list_result[1];
    retv_dict.educationList = list_result[2];
    sendData(retv_dict, action, new_data);

}
