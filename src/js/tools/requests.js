function requests(method, url, headers, data, async) {
    if (method === "GET") {
        return request_get(url, headers, async);
    }
    else if (method === "POST") {
        return request_post(url, headers, data, async);
    }
}


function request_post(url, headers, data, async) {
    $.ajax({
        method: "POST",
        url: url,
        headers: headers,
        data: data,
        async: async,
        success: function (res) {
            console.log("post success");
            return res
        },
        error: function (res) {
            console.log("post error");
        }
    });
}

function request_get(url, headers, async) {
    $.ajax({
        method: "GET",
        url: url,
        headers: headers,
        async: async,
        success: function (res) {
            console.log("get success");
            return res
        },
        error: function (res) {
            console.log("get error");
        }
    });
}