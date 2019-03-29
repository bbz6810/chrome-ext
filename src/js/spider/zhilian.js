// 解析智联详情页
function parseZhilianResumeDetail(action, new_data) {
    let retv_dict = {};
    retv_dict.platId = "10001";
    retv_dict.downloadFlag = "1";
    retv_dict.downloadType = 1;
    retv_dict.downloadStatus = 0;
    retv_dict.downloadExpired = new Date().valueOf();
    retv_dict.jobCode = ""; // 得有
    retv_dict.resumePath = "";
    retv_dict.resumeId = $("span.resume-content--letter-spacing").text().slice(3, -1);
    retv_dict.downloadFlag = "1";
    retv_dict.payOutFlag = "2";
    try {
        var resume_status = document.URL.match(/openFrom=(\d+)/)[1];
        retv_dict.inWay = resume_status === "5" ? "190001" : "190002";
    }
    catch (e) {
        retv_dict.inWay = "190001";
    }
    retv_dict.askTime = "";
    var year = new Date().getFullYear();
    var tmp = $("div.resume-content__header>span>span:nth-child(2)").text().match(/更新时间：(.*?)日/)[1].replace(/\s*/g, "");
    retv_dict.updateDate = year + "/" + tmp.replace("月", "/");
    retv_dict.isBrandUniversity = "";
    retv_dict.isBrandCompany = "";
    retv_dict.extraData = "";
    retv_dict.seekerId = $("span.resume-content--letter-spacing").text().slice(3, -1); // 得有
    retv_dict.jobId = ""; //得有
    retv_dict.OperationDateTime = new Date().valueOf();
    let username = $(".resume-content__candidate-name").text();
    retv_dict.userName = username;
    retv_dict.resumeName = username;
    retv_dict.filename = username + ".html";
    retv_dict.sex = $("p.resume-content__labels>span:nth-child(1)").text();
    retv_dict.degree = $("p.resume-content__labels>span:nth-child(4)").text();
    retv_dict.expectJob = $("div.is-career-objective>div>dl>dd:nth-child(10)").text();
    retv_dict.phone = $("p.resume-content__mobile-phone>span").text();
    retv_dict.email = $("p.resume-content__email>span").text();
    retv_dict.currentState = $("div.is-career-objective>div>dl>dd:nth-child(6)").text();
    retv_dict.expectSalary = $("div.is-career-objective>div>dl>dd:nth-child(4)").text();
    retv_dict.age = $("p.resume-content__labels>span:nth-child(2)\n").text().split(/ /)[0];
    retv_dict.expectJobProperty = $("div.is-career-objective>div>dl>dd:nth-child(8)").text();
    retv_dict.jobTitle = $("dl.resume-content--fix-size>dd").text();
    retv_dict.ehrPostId = "";
    retv_dict.workLocaltion = $("div.is-career-objective>div>dl>dd:nth-child(2)").text();
    retv_dict.isMarry = $("p.resume-content__labels>span:nth-child(5)").text();
    retv_dict.workLength = $("p.resume-content__labels>span:nth-child(3)").text();
    retv_dict.expectAddress = retv_dict.workLocaltion;
    retv_dict.politicalStatus = "";
    retv_dict.expectIndustry = $("div.is-career-objective>div>dl>dd:nth-child(12)").text();
    retv_dict.address = $("div.resume-content__candidate-basic>p:nth-child(3)>span:nth-child(1)>span:nth-child(2)").text();
    retv_dict.headerImg = "http:" + $("div.k-portrait")[0].style.backgroundImage.match(/url\("(.*?)"\)/)[1];
    retv_dict.selfEvaluation = $("div.resume-content__section--paragraph").text();
    let language = $("div#resumeDetail>div:nth-child(11)>ul>li");
    let language_list = [];
    for (let i = 0; i < language.length; i++) {
        language_list.push(language[i].innerText.replace("\n", ""));
    }
    retv_dict.languageList = language_list;
    let certs = $("div#resumeDetail>div:nth-child(8)>ul>li");
    let cert_list = [];
    for (let i = 0; i < certs.length; i++) {
        let tmp_dict = {};
        tmp_dict.time = certs[i].innerText.split("\n")[2];
        tmp_dict.certificateName = certs[i].innerText.split("\n")[0];
        cert_list.push(tmp_dict)
    }
    retv_dict.certificateList = cert_list;

    function project_build(result) {
        let return_result = {developEnvironment: '', developTool: '', dutyDesc: '', developDesc: ''};
        for (let r = 0; r < result.length; r++) {
            switch ($(result[r][0]).text()) {
                case "软件环境":
                    return_result.developEnvironment = result[r][1];
                    break;
                case "开发工具":
                    return_result.developTool = result[r][1];
                    break;
                case "责任描述":
                    return_result.dutyDesc = result[r][1];
                    break;
                case "项目描述":
                    return_result.developDesc = result[r][1];
                    break;
            }
        }
        return return_result;
    }

    let project = "div#resumeDetail>div:nth-child(4)>ul>li";
    let project_list = [];
    for (let i = 0; i < $(project).length; i++) {
        let tmp_dict = {};
        let dom_list = [
            [":nth-child(" + (i + 1) + ")>dl>dt:nth-child(1)", ":nth-child(" + (i + 1) + ")>dl>dd:nth-child(2)"],
            [":nth-child(" + (i + 1) + ")>dl>dt:nth-child(3)", ":nth-child(" + (i + 1) + ")>dl>dd:nth-child(4)"],
            [":nth-child(" + (i + 1) + ")>dl>dt:nth-child(5)", ":nth-child(" + (i + 1) + ")>dl>dd:nth-child(6)"],
            [":nth-child(" + (i + 1) + ")>dl>dt:nth-child(7)", ":nth-child(" + (i + 1) + ")>dl>dd:nth-child(8)"],
            [":nth-child(" + (i + 1) + ")>dl>dt:nth-child(9)", ":nth-child(" + (i + 1) + ")>dl>dd:nth-child(10)"],
        ];
        let dom_result = [];
        tmp_dict.projectDate = $(project + ":nth-child(" + (i + 1) + ")>p>span:nth-child(1)").text().replace(/\s*/g, "");
        tmp_dict.projectName = $(project + ":nth-child(" + (i + 1) + ")>p>span:nth-child(2)").text();
        for (let j = 0; j < dom_list.length; j++) {
            dom_result.push(
                [
                    project + dom_list[j][0],
                    project + dom_list[j][1]
                ]
            )
        }
        let tmp_project = project_build(dom_result);
        tmp_dict.developEnvironment = $(tmp_project.developEnvironment).text();
        tmp_dict.developTool = $(tmp_project.developTool).text();
        tmp_dict.dutyDesc = [$(tmp_project.dutyDesc).text()];
        tmp_dict.developDesc = $(tmp_project.developDesc).text();
        project_list.push(tmp_dict);
    }
    retv_dict.projectList = project_list;

    let work_lists = [];
    let work_list = "div#resumeDetail>div:nth-child(3)>ul>li";
    for (let i = 0; i < $(work_list).length; i++) {
        let tmp_dict = {};
        tmp_dict.year = $(work_list + ":nth-child(" + (i + 1) + ")>p:nth-child(1)>span:nth-child(1)").text().replace(/\s*/g, "").replace(/\./g, "/");
        tmp_dict.length = $(work_list + ":nth-child(" + (i + 1) + ")>p:nth-child(1)>span:nth-child(3)").text();
        tmp_dict.company = $(work_list + ":nth-child(" + (i + 1) + ")>p:nth-child(1)>span:nth-child(2)").text();
        tmp_dict.position = $(work_list + ":nth-child(" + (i + 1) + ")>p:nth-child(2)>span:nth-child(1)").text();
        tmp_dict.salary = $(work_list + ":nth-child(" + (i + 1) + ")>p:nth-child(2)>span:nth-child(2)").text();
        tmp_dict.industry = $(work_list + ":nth-child(" + (i + 1) + ")>p:nth-child(3)>span:nth-child(1)").text();
        tmp_dict.companyAsset = "";
        tmp_dict.desc = [$(work_list + ":nth-child(" + (i + 1) + ")>dl>dd").text()];
        work_lists.push(tmp_dict);
    }
    retv_dict.workExpList = work_lists;

    let edu_list = [];
    let edus = "ul.timeline--collapse>li";
    for (let i = 0; i < $(edus).length; i++) {
        let tmp_dict = {};
        tmp_dict.educationTime = ($(edus + ":nth-child(" + (i + 1) + ")>p>span:nth-child(1)>span:nth-child(1)").text() + "-" + $(edus + ":nth-child(" + (i + 1) + ")>p>span:nth-child(1)>span:nth-child(3)").text()).replace(/\./g, "/");
        tmp_dict.major = $(edus + ":nth-child(" + (i + 1) + ")>p>span:nth-child(3)").text();
        tmp_dict.eduDegree = $(edus + ":nth-child(" + (i + 1) + ")>p>span:nth-child(4)").text();
        tmp_dict.degree = $(edus + ":nth-child(" + (i + 1) + ")>p>span:nth-child(4)").text();
        tmp_dict.university = $(edus + ":nth-child(" + (i + 1) + ")>p>span:nth-child(2)").text();
        edu_list.push(tmp_dict);
    }
    retv_dict.educationList = edu_list;
    sendData(retv_dict, action, new_data);
}
