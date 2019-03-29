function parseP58ResumeDetail(action, data) {
    chrome.storage.local.get("p58_font_map", function (res) {
        if (!res.p58_font_map) {
            // 先获取后抓取
            $.ajax({
                method: "GET",
                url: extConfig.apiCacheFont,
                headers: {
                    'Content-type': 'application/json'
                },
                async: true,
                success: function (ress) {
                    chrome.storage.local.set({
                        p58_font_map: ress.data,
                    });
                    parse_p58_resume_detail(action, data, ress.data)
                },
                error: function (e) {
                    console.log("fetch p58 font error!");
                }
            });
        } else {
            parse_p58_resume_detail(action, data, res.p58_font_map)
        }
    });
}


function parse_p58_resume_detail(action, new_data, font_data) {
    var font = parseFont();
    var retv_dict = {};

    function fetch_real_word(words) {
        var ret = "";
        for (var i in words) {
            // 去除分离的空字符
            if (words[i] === "") {
                continue;
            }
            // 特殊处理58里的‘-’字符
            if (words[i].indexOf("-") !== -1) {
                var tmp = words[i].replace("-", "");
                ret += font_data[font[parseInt(tmp.slice(1), 16)]] + '-';
                continue;
            }
            if (words[i].indexOf("E") !== -1 && font[parseInt(words[i].slice(1), 16)]) {
                ret += font_data[font[parseInt(words[i].slice(1), 16)]];
            } else {
                ret += unescape("%" + words[i]);
            }
        }
        return ret;
    }

    retv_dict.platId = "10002";
    retv_dict.downloadFlag = "1";
    retv_dict.downloadType = 1;
    retv_dict.downloadStatus = 0;
    retv_dict.downloadExpired = new Date().valueOf();
    retv_dict.jobCode = ""; // 得有
    retv_dict.resumePath = "";
    retv_dict.resumeId = document.URL.match(/singles\/(.*?)\?/)[1];
    retv_dict.downloadFlag = "1";
    retv_dict.payOutFlag = "2";
    var resume_status = $("div.selfDeliver>span:nth-child(2)").text();
    retv_dict.inWay = resume_status === "主动投递" ? "190001" : "190002";
    retv_dict.askTime = $("div.selfDeliver>span:nth-child(6)").text().replace(/-/g, "/");
    var date = new Date();
    retv_dict.updateDate = date.getFullYear() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getDate();
    retv_dict.isBrandUniversity = "";
    retv_dict.isBrandCompany = "";
    retv_dict.extraData = "";
    retv_dict.seekerId = document.URL.match(/singles\/(.*?)\?/)[1]; // 列表页才能取到
    retv_dict.jobId = ""; //得有
    retv_dict.OperationDateTime = new Date().valueOf();
    var real_username = fetch_real_word(escape($("span#name").text()).split("%"));
    retv_dict.userName = real_username;
    retv_dict.resumeName = real_username;
    retv_dict.filename = real_username + ".html";
    retv_dict.sex = fetch_real_word(escape($("span.sex").text()).split("%"));
    retv_dict.degree = fetch_real_word(escape($("span.edu").text()).split("%"));
    retv_dict.expectJob = $("div#expectJob").text().replace(/\s*/g, "");
    retv_dict.phone = fetch_real_word(escape($("span.real-mobile").text()).split("%"));
    retv_dict.email = "";
    retv_dict.currentState = $("div#Job-status").text().replace(/\s*/g, "");
    retv_dict.expectSalary = fetch_real_word(escape($("div.expectInfo>p").text().replace(/\s*/g, "")).split("%")).replace("期望薪资：", "");
    retv_dict.age = fetch_real_word(escape($("span.age").text()).split("%"));
    retv_dict.expectJobProperty = "";
    retv_dict.jobTitle = $("div.selfDeliver>span:nth-child(4)").text();
    retv_dict.ehrPostId = "";
    retv_dict.workLocaltion = $("div#expectLocation").text().replace(/\s*/g, "");
    retv_dict.isMarry = "";
    retv_dict.workLength = fetch_real_word(escape($("div.base-detail>span:nth-child(8)").text()).split("%"));
    retv_dict.expectAddress = retv_dict.workLocaltion;
    retv_dict.politicalStatus = "";
    retv_dict.expectIndustry = "";
    retv_dict.address = $("div.base-detail>span:nth-child(10)").text();
    retv_dict.headerImg = $("div.basicInfo>div:nth-child(1)>img")[0].src;
    retv_dict.selfEvaluation = $("div.aboutMe>div:nth-child(2)").text().replace(/\s*/g, "");

    var edus = "div.education>div>div";
    var tmp_edus = "div.education>div:nth-child(2)>div";
    var edu_list = [];
    for (var i = 0; i < parseInt($(edus).length / 2); i++) {
        var t = tmp_edus.replace("child(2)", "child(" + (i + 2) + ")");
        var tmp_edu = {
            educationTime: $(t + ":nth-child(1)>span:nth-child(3)").text().slice(0, -2).replace("年", "/").replace("月", ""),
            major: $(t + ":nth-child(2)>span").text(),
            eduDegree: "",
            degree: "",
            university: $(t + ":nth-child(1)>span:nth-child(1)").text(),
        };
        edu_list.push(tmp_edu);
    }
    retv_dict.educationList = edu_list;

    var works = "div.work>div";
    var work_list = [];
    for (i = 0; i < $(works).length - 1; i++) {
        var year_length = $(works + ":nth-child(" + parseInt(2 + i) + ")" + ">div:nth-child(2)>p:nth-child(1)>span").text();
        var tmp_year = year_length.split("（")[0];
        var tmp_length = year_length.match(/\（(.*?)\）/)[1];
        var tmp_work = {
            year: tmp_year,
            length: tmp_length,
            company: $(works + ":nth-child(" + parseInt(2 + i) + ")" + ">div:nth-child(1)").text(),
            position: $(works + ":nth-child(" + parseInt(2 + i) + ")" + ">div:nth-child(2)>p:nth-child(3)>span").text(),
            salary: $(works + ":nth-child(" + parseInt(2 + i) + ")" + ">div:nth-child(2)>p:nth-child(2)>span").text(),
            industry: "",
            companyAsset: "",
            desc: [$(works + ":nth-child(" + parseInt(2 + i) + ")" + ">div:nth-child(2)>div>div:nth-child(2)").text().replace(/\s*/g, "")],
        };
        work_list.push(tmp_work);
    }
    retv_dict.workExpList = work_list;

    var projects = "div.project>div";
    var project_list = [];
    for (i = 0; i < $(projects).length - 1; i++) {
        var tmp_project = {
            projectDate: $(projects + ":nth-child(" + parseInt(2 + i) + ")" + ">div:nth-child(2)>p>span").text().replace(/年/g, "/").replace(/月/g, ""),
            projectName: $(projects + ":nth-child(" + parseInt(2 + i) + ")" + ">div:nth-child(1)").text(),
            developEnvironment: "",
            developTool: "",
            dutyDesc: [$(projects + ":nth-child(" + parseInt(2 + i) + ")" + ">div:nth-child(2)>div:nth-child(3)>div:nth-child(2)").text().replace(/\s*/g, "")],
            developDesc: $(projects + ":nth-child(" + parseInt(2 + i) + ")" + ">div:nth-child(2)>div:nth-child(2)>div:nth-child(2)").text().replace(/\s*/g, ""),
        };
        project_list.push(tmp_project);
    }
    retv_dict.projectList = project_list;

    var certs = "div.medal>div";
    var cert_list = [];
    for (i = 0; i < $(certs).length - 1; i++) {
        var tmp_cert = {
            time: $(certs + ":nth-child(" + parseInt(2 + i) + ")" + ">span:nth-child(2)").text().replace(/年/g, "/").replace(/月/g, ""),
            certificateName: $(certs + ":nth-child(" + parseInt(2 + i) + ")" + ">span:nth-child(1)").text(),
        };
        cert_list.push(tmp_cert);
    }
    retv_dict.certificateList = cert_list;

    var languages = "div.language>div";
    var language_list = [];
    for (i = 0; i < $(languages).length - 1; i++) {
        language_list.push($(languages + ":nth-child(" + parseInt(i + 2) + ")" + ">div").text().replace(/\s*/g, ""));
    }
    retv_dict.languageList = language_list;
    sendData(retv_dict, action, new_data);
}


// 解析页面字体
function parseFont() {
    var ret_dict = {};

    function catXY(xyList) {
        var ret = [];
        for (var i = 0; i < xyList.length; i++) {
            ret.push([xyList[i].x, xyList[i].y]);
        }
        return ret.join(",");
    }

    var url = $("style").text().match(/base64,(.*?)\)/)[1];
    var font = opentype.parse(_base64ToArrayBuffer(url));
    var len = font.glyphs.length;
    for (var i = 0; i < len; i++) {
        font.glyphs.get(i).getPath();
        if (font.glyphs.glyphs[i].unicode !== undefined) {
            ret_dict[font.glyphs.glyphs[i].unicode] = catXY(font.glyphs.glyphs[i].points);
        }
    }
    return ret_dict;
}


function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}