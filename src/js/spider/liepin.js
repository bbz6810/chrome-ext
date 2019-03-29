function parseLiepinResumeDetail(action, new_data) {
    var retv_dict = {};
    retv_dict.platId = "10003";
    retv_dict.downloadFlag = "1";
    retv_dict.downloadType = 1;
    retv_dict.downloadStatus = 0;
    retv_dict.downloadExpired = new Date().valueOf();
    retv_dict.jobCode = ""; // 得有
    retv_dict.resumePath = "";
    retv_dict.resumeId = $("h6.float-left>small:nth-child(2)").text();
    retv_dict.downloadFlag = "1";
    retv_dict.payOutFlag = "2";
    retv_dict.inWay = document.URL.indexOf("RES_INTENTION_SERVICE") !== -1 ? "190001" : "190002";
    retv_dict.askTime = "";
    retv_dict.updateDate = $("h6.float-right>small").text().replace(/\s*/g, "").slice(0, -2).replace(/-/g, "/");
    retv_dict.isBrandUniversity = "";
    retv_dict.isBrandCompany = "";
    retv_dict.extraData = "";
    retv_dict.seekerId = $("h6.float-left>small:nth-child(2)").text(); // 得有
    retv_dict.jobId = ""; //得有
    retv_dict.OperationDateTime = new Date().valueOf();
    var username_text = $("div.individual-info>ul>li:nth-child(1)>span:nth-child(2)").text();
    var username = username_text.split("·")[0].replace(/\s*/g, "");
    retv_dict.userName = username;
    retv_dict.resumeName = username;
    retv_dict.filename = username + ".html";
    retv_dict.sex = username_text.split("·")[1].replace(/\s*/g, "");
    var edu_text = $("div.individual-info>ul>li:nth-child(3)>span:nth-child(2)").text();
    retv_dict.degree = edu_text.split("·")[2].replace(/\s*/g, "");
    retv_dict.expectJob = $("table.table>tbody>tr:nth-child(5)>td>p:nth-child(2)>span:nth-child(2)").text();
    retv_dict.phone = $("div.individual-info>ul>li:nth-child(4)>span:nth-child(2)>em:nth-child(1)").text();
    retv_dict.email = $("div.individual-info>ul>li:nth-child(4)>span:nth-child(2)>em:nth-child(3)").text();
    retv_dict.currentState = $("div.individual-info>ul>li:nth-child(2)>label>span").text();
    retv_dict.expectSalary = $("table.table>tbody>tr:nth-child(2)>td>p:nth-child(2)>span:nth-child(2)").text();
    retv_dict.age = username_text.split("·")[2].replace(/\s*/g, "");
    retv_dict.expectJobProperty = "";
    retv_dict.jobTitle = "";
    retv_dict.ehrPostId = "";
    retv_dict.workLocaltion = $("table.table>tbody>tr:nth-child(4)>td>p:nth-child(2)>span:nth-child(2)").text();
    retv_dict.isMarry = "";
    var current_status = $("span.current-status").text();
    retv_dict.workLength = current_status.split("·")[2].replace(/\s*/g, "");
    retv_dict.expectAddress = retv_dict.workLocaltion;
    retv_dict.politicalStatus = "";
    retv_dict.expectIndustry = $("table.table>tbody>tr:nth-child(3)>td>p:nth-child(2)>span:nth-child(2)").text();
    retv_dict.address = $("table.table>tbody>tr:nth-child(4)>td>p:nth-child(1)>span:nth-child(2)").text();
    retv_dict.headerImg = $("img.specialFace")[0].src;
    retv_dict.selfEvaluation = $("div.attach-info-wrap>div:nth-child(1)>p:nth-child(2)").text();

    var languages = "ul.language-cont>li:nth-child(1)>label";
    var language_list = [];
    for (var i = 0; i < $(languages).length; i++) {
        language_list.push($(languages + ":nth-child(" + parseInt(i + 1) + ")").text());
    }
    retv_dict.languageList = language_list;
    retv_dict.certificateList = [];

    var projects = "section.project-experience>div:nth-child(2)>div";
    var project_list = [];
    for (i = 0; i < $(projects).length; i++) {
        var tmp_project = {
            projectDate: $(projects + ":nth-child(" + parseInt(i + 1) + ")>p:nth-child(1)>span:nth-child(2)").text().split("(")[0],
            projectName: $(projects + ":nth-child(" + parseInt(i + 1) + ")>p:nth-child(1)>span:nth-child(1)").text().split("(")[0],
            developEnvironment: "",
            developTool: "",
            dutyDesc: [$(projects + ":nth-child(" + parseInt(i + 1) + ")>div:nth-child(5)>ul>li>span").text()],
            developDesc: $(projects + ":nth-child(" + parseInt(i + 1) + ")>div:nth-child(6)>p").text(),
        };
        project_list.push(tmp_project);
    }
    retv_dict.projectList = project_list;

    var works = "section.work-experience>div:nth-child(2)>div";
    var work_list = [];
    for (i = 0; i < $(works).length; i++) {
        var tmp_year_length = $(works + ":nth-child(" + parseInt(i + 1) + ")>div:nth-child(1)>div:nth-child(1)>p:nth-child(2)").text();
        var tmp_work = {
            year: tmp_year_length.split("(")[0],
            length: tmp_year_length.match(/\((.*?)\)/)[1],
            company: $(works + ":nth-child(" + parseInt(i + 1) + ")>div:nth-child(1)>div:nth-child(1)>p:nth-child(1)>span").text(),
            position: $(works + ":nth-child(" + parseInt(i + 1) + ")>div:nth-child(1)>div:nth-child(3)>p").text(),
            salary: $(works + ":nth-child(" + parseInt(i + 1) + ")>div:nth-child(2)>ul>li:nth-child(1)>span:nth-child(2)").text(),
            industry: "",
            companyAsset: "",
            desc: [$(works + ":nth-child(" + parseInt(i + 1) + ")>div:nth-child(3)>dl>dd>span").text()],
        };
        work_list.push(tmp_work);
    }
    retv_dict.workExpList = work_list;

    var edus = "ul.education-cont>li";
    var edu_list = [];
    for (i = 0; i < $(edus).length; i++) {
        var school_major = $("ul.education-cont>li:nth-child(" + parseInt(i + 1) + ")>dl>dd>p:nth-child(1)>span").text().replace(/\s*/g, "");
        var tmp_edu = {
            educationTime: $(edus + ":nth-child(" + parseInt(i + 1) + ")>dl>dd>p:nth-child(1)>time").text(),
            major: school_major.split("·")[1],
            eduDegree: school_major.split("·")[2],
            degree: school_major.split("·")[2],
            university: school_major.split("·")[0],
        };
        edu_list.push(tmp_edu);
    }
    retv_dict.educationList = edu_list;

    sendData(retv_dict, action, new_data);
}