var Format = {
    "zhilian": _format_zhilian,
    "job51": _format_job51,
    "liepin": _format_liepin,
    "p58": _format_p58,
    "boss": _format_boss,
};


function _format_zhilian(data) {
    var tmp, key;
    for (key in data) {
        if (key === "expectSalary") {
            tmp = data[key].match(/(\d+)-(\d+)/);
            delete data[key];
            if (tmp) {
                data.expectSalaryMin = tmp[1];
                data.expectSalaryMax = tmp[2];
            } else {
                data.expectSalaryMin = 0;
                data.expectSalaryMax = 99999;
            }
        } else if (key === "workLength") {
            tmp = data[key].split("年")[0];
            delete data[key];
            data.workLengthMin = 0;
            if (tmp !== null) {
                data.workLengthMax = parseInt(tmp);
            }else{
                data.workLengthMax = 0;

            }
        } else if (key === "currentState") {
            if (data[key].indexOf("处于离职状态") !== -1) {
                data[key] = "220004";
            } else if (data[key].indexOf("可以考虑") !== -1) {
                data[key] = "220002";
            } else if (data[key].indexOf("换个新环境") !== -1) {
                data[key] = "220003";
            } else if (data[key].indexOf("无跳槽打算") !== -1) {
                data[key] = "220001";
            }
        } else if (key === "degree") {
            data[key] = __format_degree(data[key]);
        } else if (key === "sex") {
            data[key] = __format_sex(data[key]);
        }
    }
    // return data;
}


function _format_job51(data) {
    var tmp, key;
    for (key in data) {
        if (key === "expectSalary") {
            tmp = data[key].match(/(\d+)-(\d+)/);
            delete data[key];
            if (tmp) {
                data.expectSalaryMin = tmp[1];
                data.expectSalaryMax = tmp[2];
            } else {
                data.expectSalaryMin = 0;
                data.expectSalaryMax = 99999;
            }
        } else if (key === "workLength") {
            tmp = data[key].split("年")[0];
            delete data[key];
            data.workLengthMin = 0;
            data.workLengthMax = parseInt(tmp);
        } else if (key === "currentState") {
            if (data[key].indexOf("目前正在找工作") !== -1) {
                data[key] = "220004";
            } else if (data[key].indexOf("观望有好机会会考虑") !== -1) {
                data[key] = "220002";
            } else if (data[key].indexOf("我目前不想换工作") !== -1) {
                data[key] = "220001";
            } else {
                data[key] = "220001";
            }
        } else if (key === "degree") {
            data[key] = __format_degree(data[key]);
        } else if (key === "sex") {
            data[key] = __format_sex(data[key]);
        }
    }
    // return data;
}


function _format_p58(data) {
    var tmp, key;
    for (key in data) {
        if (key === "age") {
            data[key] = data[key].match(/(\d+)/)[1];
        } else if (key === "currentState") {
            if (data[key].indexOf("求职中") !== -1) {
                data[key] = "220004";
            } else {
                data[key] = "220001";
            }
        } else if (key === "degree") {
            data[key] = __format_degree(data[key]);
        } else if (key === "expectSalary") {
            tmp = data[key].match(/(\d+)-(\d+)/);
            delete data[key];
            if (tmp) {
                data.expectSalaryMin = tmp[1];
                data.expectSalaryMax = tmp[2];
            } else {
                data.expectSalaryMin = 0;
                data.expectSalaryMax = 99999;
            }
        } else if (key === "sex") {
            data[key] = __format_sex(data[key]);
        } else if (key === "workLength") {
            tmp = data[key].match(/(\d+)-(\d+)年/);
            delete data[key];
            if (tmp) {
                data.workLengthMin = tmp[1];
                data.workLengthMax = tmp[2];
            } else {
                data.workLengthMin = 3;
                data.workLengthMax = 5;
            }
        }
    }
    // return data;
}


function _format_liepin(data) {
    var tmp, key;
    for (key in data) {
        if (key === "age") {
            data[key] = data[key].match(/(\d+)/)[1];
        } else if (key === "currentState") {
            if (data[key].indexOf("离职") !== -1) {
                data[key] = "220004";
            } else if (data[key].indexOf("看看新机会") !== -1) {
                data[key] = "220002";
            } else {
                data[key] = "220001";
            }
        } else if (key === "degree") {
            data[key] = __format_degree(data[key]);
        } else if (key === "expectSalary") {
            tmp = data[key].match(/(\d+)元/);
            delete data[key];
            if (tmp) {
                data.expectSalaryMin = tmp[1];
                data.expectSalaryMax = tmp[1];
            }
            else if (key === "workLength") {
                tmp = data[key];
                delete data[key];
                data.workLengthMin = 0;
                data.workLengthMax = parseInt(tmp);
            } else if (key === "sex") {
                data[key] = __format_sex(data[key]);
            }
            else if (key === "currentState") {
                if (data[key].indexOf("离职-随时到岗") !== -1) {
                    data[key] = "220004";
                } else if (data[key].indexOf("在职-考虑机会") !== -1) {
                    data[key] = "220002";
                } else if (data[key].indexOf("在职-月内到岗") !== -1) {
                    data[key] = "220003";
                } else if (data[key].indexOf("在职-暂不考虑") !== -1) {
                    data[key] = "220001";
                }
            }
        }
    }
}

function _format_boss(data) {
    for (var key in data) {
        if (key === "expectSalary") {
            var tmp = data[key].match(/(\d+)k-(\d+)k/);
            delete data[key];
            if (tmp) {
                data.expectSalaryMin = tmp[1] * 1000;
                data.expectSalaryMax = tmp[2] * 1000;

            } else {
                data.expectSalaryMin = 0;
                data.expectSalaryMax = 99999;
            }
        }
        else if (key === "workLength") {
            tmp = data[key].match(/(\d+)年/);
            delete data[key];
            if (tmp) {
                data.workLengthMin = tmp[1];
                data.workLengthMax = tmp[1];
            } else {
                data.workLengthMin = 3;
                data.workLengthMax = 5;
            }
        }
        else if (key === "sex") {
            data[key] = __format_sex(data[key]);
        }
        else if (key === "degree") {
            data[key] = __format_degree(data[key]);
        }
        else if (key === 'age') {
            data[key] = data[key].replace("岁", "");
        }
    }
}

function __format_degree(degree) {
    var ret;
    switch (degree) {
        case "中专" || "中技":
            ret = "50002";
            break;
        case "高中":
            ret = "50003";
            break;
        case "大专":
            ret = "50004";
            break;
        case "本科":
            ret = "50005";
            break;
        case "硕士":
            ret = "50006";
            break;
        case "博士":
            ret = "50007";
            break;
        case "高中以下":
            ret = "50008";
            break;
        case "初中及以下":
            ret = "50008";
            break;
        default:
            ret = "50001";
    }
    return ret;
}


function __format_sex(sex) {
    var ret;
    if (sex === "男") {
        ret = "70001";
    } else if (sex === "女") {
        ret = "70002"
    } else {
        ret = "70003"
    }
    return ret;
}

