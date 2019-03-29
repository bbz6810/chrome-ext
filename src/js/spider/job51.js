function parseJob51ResumeDetail(action, new_data) {
    var retv_dict = {};
    retv_dict.platId = "10005";
    retv_dict.downloadFlag = "1";
    retv_dict.downloadType = 1;
    retv_dict.downloadStatus = 0;
    retv_dict.downloadExpired = new Date().valueOf();
    retv_dict.jobCode = ""; // 得有
    retv_dict.resumePath = "";
    retv_dict.resumeId = $("#hidSeqID").val();
    retv_dict.downloadFlag = "1";
    retv_dict.payOutFlag = "2";
    var tmp_jobtitle = $("div#divHead>table>tbody>tr:nth-child(1)>td:nth-child(1)").text();
    retv_dict.inWay = tmp_jobtitle.indexOf("投递时间") !== -1 ? "190001" : "190002";
    retv_dict.askTime = "";
    retv_dict.ehrPostId = "";

    if (tmp_jobtitle.indexOf("应聘职位") !== -1) {
        retv_dict.jobTitle = $("div#divHead>table>tbody>tr:nth-child(1)>td:nth-child(1)>span:nth-child(1)").text();
    } else {
        retv_dict.jobTitle = "";
    }
    var update_date = $("span#lblResumeUpdateTime>b").text() || $("span#lblResumeUpdateTime").text();
    retv_dict.updateDate = update_date.replace(/-/g, "/");
    retv_dict.isBrandUniversity = "";
    retv_dict.isBrandCompany = "";
    retv_dict.extraData = "";
    retv_dict.seekerId = $("table.box1>tbody>tr>td:nth-child(1)>span").text().replace(/\s*/g, "").match(/ID:(.*)/)[1];
    retv_dict.jobId = ""; //得有
    retv_dict.OperationDateTime = new Date().valueOf();

    function build_map() {
        var ret = {};
        var key_list = ["求职意向", "工作经验", "教育经历", "技能特长", "项目经验"];
        var selector = [
            ["tr#divInfo>td>table:nth-child(2)>tbody>tr:nth-child(1)>td", "tr#divInfo>td>table:nth-child(2)>tbody>tr:nth-child(2)>td"],
            ["tr#divInfo>td>table:nth-child(3)>tbody>tr:nth-child(1)>td", "tr#divInfo>td>table:nth-child(3)>tbody>tr:nth-child(2)>td"],
            ["tr#divInfo>td>table:nth-child(4)>tbody>tr:nth-child(1)>td", "tr#divInfo>td>table:nth-child(4)>tbody>tr:nth-child(2)>td"],
            ["tr#divInfo>td>table:nth-child(5)>tbody>tr:nth-child(1)>td", "tr#divInfo>td>table:nth-child(5)>tbody>tr:nth-child(2)>td"],
            ["tr#divInfo>td>table:nth-child(6)>tbody>tr:nth-child(1)>td", "tr#divInfo>td>table:nth-child(6)>tbody>tr:nth-child(2)>td"],
            ["tr#divInfo>td>table:nth-child(7)>tbody>tr:nth-child(1)>td", "tr#divInfo>td>table:nth-child(7)>tbody>tr:nth-child(2)>td"],
            ["tr#divInfo>td>table:nth-child(8)>tbody>tr:nth-child(1)>td", "tr#divInfo>td>table:nth-child(8)>tbody>tr:nth-child(2)>td"],
        ];
        for (i = 0; i < selector.length; i++) {
            switch (key_list.indexOf($(selector[i][0]).text().replace(/(\s*)/g, "").slice(0, 4))) {
                case 0:
                    ret.job_exp = selector[i][1];
                    break;
                case 1:
                    ret.work_exp = selector[i][1];
                    break;
                case 2:
                    ret.edu_exp = selector[i][1];
                    break;
                case 3:
                    ret.lan_cert = selector[i][1];
                    break;
                case 4:
                    ret.project = selector[i][1];
                    break;
            }
        }
        return ret;
    }

    var big_dict = build_map();

    function build_job_exp() {
        var job_exp = big_dict.job_exp + ">table>tbody>tr>td";
        var job_tmp = big_dict.job_exp + ">table>tbody>tr:nth-child(0)>td";
        for (i = 0; i <= parseInt($(job_exp).length / 2); i++) {
            var job_real = job_tmp.replace("child(0)", "child(" + (i + 1) + ")");
            var name = $(job_real + ":nth-child(1)>table>tbody>tr>td:nth-child(1)").text().slice(0, -1);
            var value1 = $(job_real + ":nth-child(1)>table>tbody>tr>td:nth-child(2)").text();
            var value2 = $(job_real + ":nth-child(2)>table>tbody>tr>td:nth-child(2)").text();
            switch (name) {
                case "期望薪资":
                    retv_dict.expectSalary = value1;
                    break;
                case "地点":
                    retv_dict.workLocaltion = value1;
                    break;
                case "职能/职位":
                    retv_dict.expectJob = value1;
                    break;
                case "行业":
                    retv_dict.expectIndustry = value1;
                    break;
                case "工作类型":
                    retv_dict.expectJobProperty = value1;
                    break;
                case "自我评价":
                    retv_dict.selfEvaluation = value1;
            }
            name = $(job_real + ":nth-child(2)>table>tbody>tr>td:nth-child(1)").text().slice(0, -1);
            switch (name) {
                case "期望薪资":
                    retv_dict.expectSalary = value2;
                    break;
                case "地点":
                    retv_dict.workLocaltion = value2;
                    break;
                case "职能/职位":
                    retv_dict.expectJob = value2;
                    break;
                case "行业":
                    retv_dict.expectIndustry = value2;
                    break;
                case "工作类型":
                    retv_dict.expectJobProperty = value2;
                    break;
                case "自我评价":
                    retv_dict.selfEvaluation = value2;
            }
        }
    }

    build_job_exp();

    var username = $("td#tdseekname").text().replace(/\s*/g, "");
    if (username.indexOf("ID") !== -1) {
        username = username.match(/ID:(\d+)/)[1];
    } else {
        username = username.split("流程状态")[0]
    }
    retv_dict.userName = username;
    retv_dict.resumeName = username;
    retv_dict.filename = username + ".html";
    var baseinfo = $("table.infr>tbody>tr:nth-child(3)>td")[0].innerText;
    retv_dict.sex = baseinfo.split("|")[0].replace(/\s*/g, "");
    retv_dict.age = baseinfo.split("|")[1].split("岁")[0];
    retv_dict.address = baseinfo.split("|")[2].match(/现居住 (.*)/)[1];
    retv_dict.workLength = baseinfo.split("|")[3];
    retv_dict.degree = $("td.con>table>tbody>tr>td:nth-child(2)>table>tbody>tr:nth-child(4)>td:nth-child(2)").text().replace(/\s*/g, "");
    retv_dict.phone = $("table.infr>tbody>tr:nth-child(2)>td>table>tbody>tr>td:nth-child(2)").text() || $("table.infr>tbody>tr:nth-child(2)>td:nth-child(2)").text().replace(/(^\s*)|(\s*$)/g, "");
    retv_dict.email = ($("span.blue").text() || $("td.m_com").text()).replace(/\s*/g, "");
    retv_dict.currentState = $("table.infr>tbody>tr:nth-child(2)>td>table>tbody>tr>td:nth-child(1)").text() || $("table.infr>tbody>tr:nth-child(2)>td:nth-child(1)").text().replace(/\s*/g, "");
    retv_dict.isMarry = $("tr#divInfo>td>table:nth-child(1)>tbody>tr:nth-child(2)>td>table>tbody>tr:nth-child(2)>td:nth-child(2)>table>tbody>tr>td:nth-child(2)").text();
    retv_dict.expectAddress = retv_dict.workLocaltion;
    retv_dict.politicalStatus = "";
    if ($("table.box1>tbody>tr>td:nth-child(1)>a>img").length) {
        retv_dict.headerImg = $("table.box1>tbody>tr>td:nth-child(1)>a>img")[0].src
    } else {
        retv_dict.headerImg = $("img.head")[0].src
    }
    for (i = 0; i < parseInt($(big_dict.lan_cert + ">table>tbody>tr").length / 2); i++) {
        if ($(big_dict.lan_cert + ">table>tbody>tr")[i * 2].innerText === "技能/语言") {
            var language = big_dict.lan_cert + ">table>tbody>tr:nth-child(" + ((i + 1) * 2) + ")>td>table>tbody>tr>td>table>tbody>tr>td";
        } else if ($(big_dict.lan_cert + ">table>tbody>tr")[i * 2].innerText === "证书") {
            var certs = $(big_dict.lan_cert + ">table>tbody>tr:nth-child(" + ((i + 1) * 2) + ")>td>table>tbody>tr");
        }
    }

    var cert_list = [];
    if (certs) {
        for (var i = 0; i < certs.length; i++) {
            cert_list.push({
                time: $(certs[i]).find("td>table>tbody>tr>td:nth-child(1)").text(),
                certificateName: $(certs[i]).find("td>table>tbody>tr>td:nth-child(2)").text().replace(/\s*/g, ""),
            });
        }
    }
    retv_dict.certificateList = cert_list;

    var language_list = [];
    if (language) {
        for (i = 0; i < $(language).length; i++) {
            language_list.push($(language)[i].innerText.replace(/\s*/g, ""))
        }
    }
    retv_dict.languageList = language_list;

    var project = big_dict.project + ">table>tbody>tr>td";
    var project_tmp = big_dict.project + ">table>tbody>tr:nth-child(0)>td";
    var project_list = [];
    for (i = 0; i < $(project).length; i++) {
        var project_real = project_tmp.replace("child(0)", "child(" + (i + 1) + ")");
        project_list.push(
            {
                projectDate: $(project_real + ">table>tbody>tr:nth-child(1)>td:nth-child(1)").text(),
                projectName: $(project_real + ">table>tbody>tr:nth-child(1)>td:nth-child(2)").text(),
                developEnvironment: "",
                developTool: "",
                dutyDesc: [$(project_real + ">table>tbody>tr:nth-child(4)>td>table>tbody>tr>td:nth-child(2)").text()],
                developDesc: $(project_real + ">table>tbody>tr:nth-child(3)>td>table>tbody>tr>td:nth-child(2)").text(),
            }
        );
    }
    retv_dict.projectList = project_list;

    var works = big_dict.work_exp + ">table>tbody>tr>td";
    var works_tmp = big_dict.work_exp + ">table>tbody>tr:nth-child(0)>td";
    var work_list = [];
    for (i = 0; i < $(works).length; i++) {
        var works_real = works_tmp.replace("child(0)", "child(" + (i + 1) + ")");
        var tmp = $(works_real + ">table>tbody>tr:nth-child(2)>td:nth-child(2)").text().split("|");
        work_list.push(
            {
                year: $(works_real + ">table>tbody>tr:nth-child(1)>td:nth-child(1)").text(),
                length: $(works_real + ">table>tbody>tr:nth-child(1)>td:nth-child(2)>span:nth-child(2)").text().replace(/(\s*)/g, ""),
                company: $(works_real + ">table>tbody>tr:nth-child(1)>td:nth-child(2)>span:nth-child(1)").text(),
                position: $(works_real + ">table>tbody>tr:nth-child(3)>td:nth-child(2)>strong").text(),
                salary: '',
                industry: tmp[0],
                companyAsset: tmp.length === 3 ? tmp[1] : "",
                desc: [$(works_real + ">table>tbody>tr:nth-child(4)>td>table>tbody>tr>td:nth-child(2)").text()],
            }
        );
    }
    retv_dict.workExpList = work_list;

    var edus = big_dict.edu_exp + ">table>tbody>tr>td";
    var edus_tmp = big_dict.edu_exp + ">table>tbody>tr:nth-child(0)>td";
    var edu_list = [];
    for (i = 0; i < $(edus).length; i++) {
        var edus_real = edus_tmp.replace("child(0)", "child(" + (i + 1) + ")");
        tmp = $(edus_real + ">table>tbody>tr:nth-child(2)>td").text().split("|");
        edu_list.push(
            {
                educationTime: $(edus_real + ">table>tbody>tr:nth-child(1)>td:nth-child(1)").text() || $(edus[i]).find(""),
                major: tmp[1],
                eduDegree: tmp[0],
                degree: tmp[0],
                university: $(edus_real + ">table>tbody>tr:nth-child(1)>td:nth-child(2)>strong").text(),
            }
        );
    }
    retv_dict.educationList = edu_list;

    sendData(retv_dict, action, new_data);
}