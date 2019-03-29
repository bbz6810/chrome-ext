;
(function () {
    window.apiServer = {

        backend: "https://zhaopin.nb01.xyz/api/v1",
        spider: "https://zhaopin.nb01.xyz"

    };
    if (typeof (envApiServer) !== "undefined") {
        Object.assign(window.apiServer, envApiServer);
    }

    window.extConfig = {
        apiDeliver: apiServer.backend + "/resume/delivery/ext",
        apiPushCookie: apiServer.spider + "/chrome_ext/v1/pushCookie",
        apiCacheFont: apiServer.spider + "/chrome_ext/v1/cacheFontVector",
        apiEhrPostId: apiServer.backend + "/ehr/post/list",
        apiUserInfo: apiServer.backend + "/userManage/loginUserInfo",
        apiUserLogin: apiServer.backend + "/user/login",

        mapCookieUrl: {
            "10001": "https://rd5.zhaopin.com/",
            "10005": "https://ehire.51job.com/",
            "10002": "https://employer.58.com/",
            "10003": "https://lpt.liepin.com/",
            "10004": "https://www.zhipin.com/chat/",
        },

        mapPlatform: {
            "10001": "zhilian",
            "10002": "p58",
            "10003": "liepin",
            "10004": "boss",
            "10005": "job51",
        },

        mapAccountInfo: {
            "10001": "zhilian_account_info",
            "10002": "p58_account_info",
            "10003": "liepin_account_info",
            "10004": "boss_account_info",
            "10005": "job51_account_info",
        },

        pushCookieTimeSleep: 10 * 60,
    };
    if (typeof (envExtConfig) !== "undefined") {
        Object.assign(window.extConfig, envExtConfig);
    }
})();
