/*inactive-Heatmaps*//*inactive-Playbacks*//*inactive-FormAnalytics*//*inactive-MicroSurveys*/var mousestats_project = void 0 == mousestats_project ? "" : mousestats_project, mousestats_playbackProject = void 0 == mousestats_playbackProject ? "" : mousestats_playbackProject, mousestats_formAnalyticsProject = void 0 == mousestats_formAnalyticsProject ? [] : mousestats_formAnalyticsProject, mousestats_microSurveysProject = void 0 == mousestats_microSurveysProject ? "" : mousestats_microSurveysProject, mousestats_Site = void 0 == mousestats_Site ? "" : mousestats_Site, mousestats_xadd = void 0 == mousestats_xadd ? "" : mousestats_xadd; 
var MouseStatsSharedControl = {
    j: null, z: null, msca: "https:" == location.protocol ? "https://ssl.mousestats.com/monitorv3/?" : "http://ssl.mousestats.com/monitorv3/?", msai: "https:" == location.protocol ? "https://ssl.mousestats.com/monitorv3/microsurvey?" : "http://ssl.mousestats.com/monitorv3/microsurvey?", msbg: ["hm", "pb", "fa", "ms"], msbi: ["", "", "", ""], msbe: ["&", "\u0001", "\u0001", ""], mscf: "", msbt: [[], [], [], []], msan: [[], [], [], []], mscb: !1, msbf: {}, msbu: [0, 0, 0, 0, 0, 0, 0, 0], msav: 0, msar: [!1, !1, !1, !1],
    mscg: function (a) { if (!this.msag() || this.mscb || !this.msal()) return !1; this.msam("", !1); this.msak(a); this.msae(); this.msax.init(); mousestats_Site = a; document && "complete" == document.readyState ? MouseStatsSharedControl.msbd() : this.mousestats_addEvtListener(window, "load", function () { MouseStatsSharedControl.msbd() }); this.msba(); this.mscb = !0 }, msak: function (a) {
        this.msbf.msbv = a; this.msbf.msbh = this.msaj(); a = this.msas(); ".localhost" == a && (a = ""); var b = new Date, b = (new Date(b.getFullYear() + 5, b.getMonth(), b.getDate())).toUTCString(),
        c = new Date; c.setTime(c.getTime() + 9E5); var c = c.toUTCString(), d = this.msbw("mousestats_vi"); 5 < d.length ? this.msbf.msbr = d : (this.msbf.msbr = this.msaj(), document.cookie = "mousestats_vi=" + this.msbf.msbr + "; path=/; domain=" + a + "; expires=" + b + ";"); d = this.msbw("mousestats_si"); this.msbf.msbs = 5 < d.length ? d : this.msaj(); document.cookie = "mousestats_si=" + this.msbf.msbs + "; path=/; domain=" + a + "; expires=" + c + ";"; this.msbf.msbz = ""; "undefined" !== typeof mousestats_visitorName && 0 !== mousestats_visitorName.length && (this.msbf.msbz =
        mousestats_visitorName); "undefined" !== typeof MouseStats_VisitorName && 0 !== MouseStats_VisitorName.length && (this.msbf.msbz = MouseStats_VisitorName)
    }, msbd: function () {
        "undefined" !== typeof MouseStats_DisableHeatmaps && !1 !== MouseStats_DisableHeatmaps || this.msah(); "undefined" !== typeof MouseStats_DisablePlaybacks && !1 !== MouseStats_DisablePlaybacks || this.msaf(); "undefined" !== typeof MouseStats_DisableFormAnalytics && !1 !== MouseStats_DisableFormAnalytics || this.msaq(); "undefined" !== typeof MouseStats_DisableMicroSurveys &&
        !1 !== MouseStats_DisableMicroSurveys || this.msac()
    }, msag: function () { if (0 < window.location.toString().indexOf("disableMonitoring_mousestats")) return !1; try { if ("undefined" !== typeof parent && "undefined" !== typeof parent.WebPlayer) return !1 } catch (a) { } try { var b = function () { var a = navigator.userAgent.toLowerCase(); return -1 != a.indexOf("msie") ? parseInt(a.split("msie")[1]) : !1 }; if (!1 !== b() && 9 >= b()) return !1 } catch (c) { } return MouseStatsSharedControl.msab() ? !1 : !0 }, msaw: function (a) {
        var b = location.href; return (new RegExp(a.split("+").join("\\+").split("\\\\").join("\\"),
        "i")).test(b) ? !0 : !1
    }, msaf: function () { location.host.toLowerCase(); for (var a = 0; a < this.msan[1].length; a++) if (this.msaw(this.msan[1][a][0])) { mousestats_playbackProject = this.msan[1][a][1]; break } try { 0 !== mousestats_playbackProject.length && MouseStatsSharedControl.msad(function () { MouseStatsSharedControl.msaz("fullplayback.v3.public") }) } catch (b) { MouseStatsSharedControl.msad(function () { MouseStatsSharedControl.msaz("fullplayback.v3.public") }) } }, msah: function () {
        for (var a = "", b = 0; b < this.msan[0].length; b++) if (this.msaw(this.msan[0][b][0])) {
            var c =
            this.msan[0][b][3], d = !1; -1 === c.indexOf(":") ? this.msbp() || (d = !0) : (c = c.split(":"), msbx = document.documentElement && 0 !== document.documentElement.clientHeight ? document.documentElement : document.body, msci = msbx.clientWidth || window.innerWidth, msci >= parseInt(c[0]) && msci <= parseInt(c[1]) && (d = !0)); c = !0; if ("undefined" !== typeof MouseStatsCustomCode && "undefined" !== typeof MouseStatsCustomCode.decisionHeatmap) {
                c = MouseStatsCustomCode.decisionHeatmap(this.msan[0][b][1]); try { clearInterval(MouseStatsCustomCode.theI) } catch (e) { } MouseStatsCustomCode.theI =
                setInterval("MouseStatsSharedControl.msah()", 1E3)
            } d && c && (a = this.msan[0][b][1], mousestats_xadd = this.msan[0][b][2]); if (0 !== a.length) if ("undefined" !== typeof mousestats_setproject && 0 !== mousestats_setproject.length) { if (mousestats_setproject === a) break } else break
        } "undefined" !== typeof MouseStatsHeatmaps && "undefined" !== typeof MouseStatsHeatmaps.Pause && 0 !== a.length && a !== mousestats_project && (0 !== mousestats_project.length && MouseStatsHeatmaps.Pause(), mousestats_project = a, MouseStatsHeatmaps.Resume()); "undefined" !==
        typeof MouseStatsHeatmaps && "undefined" !== typeof MouseStatsHeatmaps.Pause && 0 === a.length && MouseStatsHeatmaps.Pause(); mousestats_project = a; 0 < mousestats_project.length && "undefined" === typeof MouseStatsHeatmaps && !this.msar[0] && ("undefined" === typeof MouseStats_jQueryHeatmaps ? MouseStatsSharedControl.msaz("heatmap.recording.v3.public") : MouseStatsSharedControl.msad(function () { MouseStatsSharedControl.msaz("heatmap.recording.v3.public") }))
    }, msaq: function () {
        for (var a = 0; a < this.msan[2].length; a++) this.msaw(this.msan[2][a][0]) &&
        mousestats_formAnalyticsProject.push([this.msan[2][a][1], this.msan[2][a][2]]); try { 0 !== mousestats_formAnalyticsProject.length && MouseStatsSharedControl.msad(function () { MouseStatsSharedControl.msaz("forms.v4.public") }) } catch (b) { MouseStatsSharedControl.msad(function () { MouseStatsSharedControl.msaz("forms.v4.public") }) }
    }, msac: function () {
        for (var a = 0; a < this.msan[3].length; a++) if (this.msaw(this.msan[3][a][0])) { mousestats_microSurveysProject = this.msan[3][a][1]; break } try {
            "undefined" !== typeof mousestats_microSurveysProject.ID &&
            MouseStatsSharedControl.msaz("microsurvey.v3.public")
        } catch (b) { MouseStatsSharedControl.msaz("microsurvey.v3.public") }
    }, msad: function (a) {
        if (null !== MouseStatsSharedControl.j && MouseStatsSharedControl.j.fn.on) a(); else if (null !== document.getElementById("mouseStatsQInjection")) setTimeout(function () { MouseStatsSharedControl.msad(a) }, 200); else if ("undefined" !== typeof jQuery && jQuery.fn.on) MouseStatsSharedControl.j = jQuery, MouseStatsSharedControl.msad(a); else {
            var b = !1, c = document.getElementsByTagName("head")[0],
            d = document.createElement("script"); d.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"; "undefined" !== typeof MouseStats_GoogleBlocked && MouseStats_GoogleBlocked && (d.src = "//code.jquery.com/jquery-1.9.1.min.js"); d.type = "text/javascript"; d.id = "mouseStatsQInjection"; d.onload = d.onreadystatechange = function () { if (!(b || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) { b = !0; d.onload = d.onreadystatechange = null; var c = jQuery.noConflict(!0); MouseStatsSharedControl.j = c; MouseStatsSharedControl.msad(a) } };
            c.appendChild(d)
        }
    }, msaz: function (a) { var b = "http://www2.mousestats.com/static/jstracking/" + a + ".js?c1"; a = "https://ssl.mousestats.com/static/jstracking/" + a + ".js?c1"; var c = document.createElement("script"); c.src = "https:" == location.protocol ? a : b; c.async = !0; c.type = "text/javascript"; document.body.appendChild(c) }, isPlaybackLoaded: function () { return "undefined" !== typeof MouseStatsVisitorPlaybacks && MouseStatsVisitorPlaybacks.isLoaded ? !0 : !1 }, isHeatmapLoaded: function () {
        return "undefined" !== typeof MouseStatsHeatmaps && MouseStatsHeatmaps.isLoaded ?
        !0 : !1
    }, isFormAnalyticsLoaded: function () { return "undefined" !== typeof MouseStatsFormAnalytics && MouseStatsFormAnalytics.isLoaded ? !0 : !1 }, isMicroSurveysLoaded: function () { return "undefined" !== typeof MouseStatsMicroSurveys && MouseStatsMicroSurveys.isLoaded ? !0 : !1 }, msba: function () { function a() { MouseStatsSharedControl.msao(!0) } this.mousestats_addEvtListener(window, "beforeunload", a); this.mousestats_addEvtListener(window, "unload", a) }, msbm: function (a, b, c) {
        var d = new Date; d.setDate(d.getDate() + c); var e = this.msas();
        ".localhost" == e && (e = ""); b = escape(b) + (null == c ? "" : "; path=/; domain=" + e + "; expires=" + d.toUTCString()); document.cookie = a + "=" + b
    }, msbw: function (a) { var b, c, d, e = document.cookie.split(";"); for (b = 0; b < e.length; b++) if (c = e[b].substr(0, e[b].indexOf("=")), d = e[b].substr(e[b].indexOf("=") + 1), c = c.replace(/^\s+|\s+$/g, ""), c == a) return unescape(d) }, msab: function () {
        if ("undefined" !== typeof MouseStats_EnablePermanentBlockFeature && !0 === MouseStats_EnablePermanentBlockFeature) {
            try {
                if (0 < window.location.toString().indexOf("MouseStatsEnablePermanent")) return this.msbm("mousestats_disable",
                "", 365), !1; if (0 < window.location.toString().indexOf("MouseStatsDisablePermanent")) return this.msbm("mousestats_disable", "true", 365), !0; if (void 0 !== this.msbw("mousestats_disable") && 1 < this.msbw("mousestats_disable").length) return !0
            } catch (a) { } return !1
        }
    }, msbn: function (a, b) { this.msbi[a] = b; return !0 }, msbk: function (a, b) { 2 == a && (this.msbt[a] = []); this.msbt[a].push(b); return !0 }, msce: function (a) {
        "undefined" === typeof a && (a = !1); for (var b = "tags:" + this.mscc.encode(this.msat()) + "*", c = !1, d = 0; d < this.msbg.length; d++) if (0 <
        this.msbi[d].length && 0 < this.msbt[d].length) { for (var c = "", e = 0; e < this.msbt[d].length; e++) c += this.msbt[d][e] + this.msbe[d]; b += this.msbg[d] + ":" + this.msbi[d] + "&data=" + this.mscc.encode(c) + "*"; c = !0 } c && (this.msbl(), this.msav += 1, 200 < this.msav ? this.StopAll() : a ? this.msam(b, !0) : this.msbb("", b, null))
    }, msbb: function (a, b, c) {
        if (this.mscd() || 0 < document.location.toString().indexOf("mousestatsDisableSubmit")) return !1; 0 === a.length && (a = this.msca); var d = !1; window.XMLHttpRequest && (d = "withCredentials" in new XMLHttpRequest);
        var e = !1; d || window.XDomainRequest || (e = !0); if (window.XMLHttpRequest && d || e) try { var g = new window.XMLHttpRequest; g.open("POST", a, !0); g.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); g.onreadystatechange = function () { 4 == this.readyState && 200 == this.status && "function" == typeof c && c() }; g.send(b) } catch (l) { } else if (window.XDomainRequest) try {
            var h = new f.XDomainRequest; h.open("post", a); "function" == typeof c && (h.onload = c); h.onerror = function () { }; h.onprogress = function () { }; h.ontimeout = function () { };
            h.timeout = 6E3; setTimeout(function () { h.send(b) }, 200)
        } catch (k) { }
    }, msbp: function () { try { return /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent) ? !0 : !1 } catch (a) { try { console.log("MS: Error in isMobile") } catch (b) { } return !1 } }, msao: function (a) {
        var b = !1; try { b = b || MouseStatsVisitorPlaybacks.isLoaded } catch (c) { } try { b = b || MouseStatsHeatmaps.isLoaded } catch (d) { } try {
            b =
            b || MouseStatsFormAnalytics.isLoaded
        } catch (e) { } if (b) { try { MouseStatsVisitorPlaybacks.Stop() } catch (g) { } try { MouseStatsHeatmaps.Stop() } catch (l) { } try { MouseStatsFormAnalytics.Stop() } catch (h) { } try { MouseStatsSharedControl.msce(a) } catch (k) { } }
    }, StopAll: function () { MouseStatsSharedControl.msao(!1) }, mousestats_addEvtListener: function (a, b, c) { document.addEventListener ? a ? a.addEventListener(b, c, !1) : addEventListener(b, c, !1) : attachEvent && (a ? a.attachEvent("on" + b, c) : attachEvent("on" + b, c)) }, msat: function () {
        function a(a,
        b) { MouseStats_Commands.push(["tag", a, b]) } var b = ""; 0 < this.msbf.msbz.length && (b += "[" + this.msbf.msbz.trim() + "]"); try { var c = window.ub.page.name; "number" != typeof c && "string" != typeof c || a("Unbounce-Name", c) } catch (d) { } try { c = window.ub.page.variantId, "number" != typeof c && "string" != typeof c || a("Unbounce-Variant", c) } catch (e) { } try { var g = window.optimizely.data.state.activeExperiments[0], c = g; "number" != typeof c && "string" != typeof c || a("Optimizely-ExperimentID", c) } catch (l) { } try {
            g = window.optimizely.data.state.activeExperiments[0],
            c = window.optimizely.data.state.variationNamesMap[g], "number" != typeof c && "string" != typeof c || a("Optimizely-VariationName", c)
        } catch (h) { } try { g = window.optimizely.data.state.activeExperiments[0], c = window.optimizely.data.state.variationIdsMap[g], "number" != typeof c && "string" != typeof c || a("Optimizely-VariationID", c) } catch (k) { } try { c = window.__variant, "number" != typeof c && "string" != typeof c || a("Instapage-Variant", c) } catch (p) { } if ("undefined" !== typeof MouseStats_Commands && 0 < MouseStats_Commands.length) {
            uniq = function (a,
            b) { var c = {}; return a.filter(function (a) { a = b ? b.apply(a) : a; return a in c ? !1 : c[a] = !0 }) }; MouseStats_Commands = uniq(MouseStats_Commands, [].join); c = ""; for (g = 0; g < MouseStats_Commands.length; g++) if (0 === MouseStats_Commands[g][0].indexOf("tag") || 0 === MouseStats_Commands[g][0].indexOf("identify")) try {
                var n = 2 < MouseStats_Commands[g].length ? MouseStats_Commands[g][1].trim() + ":" : "", m = 2 < MouseStats_Commands[g].length ? MouseStats_Commands[g][2].trim() : MouseStats_Commands[g][1].trim(), b = b + ("[" + (n + m) + "]"); 0 == MouseStats_Commands[g][0].indexOf("identify") &&
                0 < m.length && (c = "[_ms_identify:" + m.substring(0, 50) + "]")
            } catch (q) { } b += c
        } return b
    }, msbc: function () { this.msce(); this.msae() }, msae: function () { try { clearInterval(this.msbu[0]) } catch (a) { } this.msbu[0] = setInterval("MouseStatsSharedControl.msbc();", 8E3) }, msbl: function () { this.msbt = [[], [], []] }, msbw: function (a) { for (var b, c, d = document.cookie.split(";"), e = 0; e < d.length; e++) if (b = d[e].substr(0, d[e].indexOf("=")), c = d[e].substr(d[e].indexOf("=") + 1), b = b.replace(/^\s+|\s+$/g, ""), b == a) return unescape(c); return "" },
    msal: function () { return "cookie" in document && (0 < document.cookie.length || -1 < (document.cookie = "test").indexOf.call(document.cookie, "test")) }, msaj: function () { for (var a = "", b = 0; 5 > b; b++) a += (65536 * (1 + Math.random()) | 0).toString(16).substring(1); return a }, msas: function () {
        var a = window.location.host; a.indexOf(":") && (a = a.split(":")[0]); if (/^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})?(:([0-9]{1,5})|)$/.test(a)) return a; a = window.location.href; a = a.replace(/^http(s)?\:\/\/?/i, "").replace(/^([^\/]+)\/.*/i,
        "$1"); a = /\.gov\.|\.edu\.|\.ac\.|\.org\.|\.co\.|\.net\.|\.com\./.test(a) ? a.replace(/^([^\.]+\.){1,}([^\.]+\.[^\.]+\.[^\.]+)$/i, "$2") : a.replace(/^([^\.]+\.){1,}([^\.]+\.[^\.]+)$/i, "$2"); a.indexOf(":") && (a = a.split(":")[0]); return "." + a
    }, msam: function (a, b) { if (b) MouseStatsSharedControl.msay("d", a); else { var c = MouseStatsSharedControl.msay("d"); 10 < c.length && (MouseStatsSharedControl.msbb("", c, null), MouseStatsSharedControl.msay("d", "")) } }, msay: function (a, b) {
        try {
            var c = !1; "undefined" == typeof b && (c = !0); if (c) return "undefined" ==
            typeof localStorage["ms_" + a] ? "" : localStorage["ms_" + a]; localStorage["ms_" + a] = b; return !0
        } catch (d) { return "" }
    }, mscd: function () { return /bot|crawler|baiduspider|80legs|ia_archiver|voyager|curl|wget|yahoo! slurp|mediapartners-google|Google Page Speed Insights|Google Web/ig.test(navigator.userAgent) ? !0 : !1 }, mscc: {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (a) {
            var b = "", c, d, e, g, l, h, k = 0; for (a = this._utf8_encode(a) ; k < a.length;) c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), g = c >> 2, c = (c & 3) <<
            4 | d >> 4, l = (d & 15) << 2 | e >> 6, h = e & 63, isNaN(d) ? l = h = 64 : isNaN(e) && (h = 64), b = b + this._keyStr.charAt(g) + this._keyStr.charAt(c) + this._keyStr.charAt(l) + this._keyStr.charAt(h); return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, ",").replace(/A/g, "~")
        }, _utf8_encode: function (a) {
            a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c); 128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)),
                b += String.fromCharCode(d & 63 | 128))
            } return b
        }
    }, msax: {
        init: function () { this.browser = this.searchString(this.dataBrowser) || "unknown"; this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "unknown"; this.OS = this.searchString(this.dataOS) || "unknown" }, searchString: function (a) { for (var b = 0; b < a.length; b++) { var c = a[b].string, d = a[b].prop; this.versionSearchString = a[b].versionSearch || a[b].identity; if (c) { if (-1 != c.indexOf(a[b].subString)) return a[b].identity } else if (d) return a[b].identity } },
        searchVersion: function (a) { var b = a.indexOf(this.versionSearchString); if (-1 != b) return parseFloat(a.substring(b + this.versionSearchString.length + 1)) }, dataBrowser: [{ string: navigator.userAgent, subString: "Chrome", identity: "Chrome" }, { string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" }, { string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" }, { prop: window.opera, identity: "Opera", versionSearch: "Version" }, {
            string: navigator.vendor, subString: "iCab",
            identity: "iCab"
        }, { string: navigator.vendor, subString: "KDE", identity: "Konqueror" }, { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" }, { string: navigator.vendor, subString: "Camino", identity: "Camino" }, { string: navigator.userAgent, subString: "Netscape", identity: "Netscape" }, { string: navigator.userAgent, subString: "MSIE", identity: "MSIE", versionSearch: "MSIE" }, { string: navigator.userAgent, subString: "Trident", identity: "MSIE", versionSearch: "rv" }, {
            string: navigator.userAgent, subString: "Gecko", identity: "Mozilla",
            versionSearch: "rv"
        }, { string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }], dataOS: [{ string: navigator.platform, subString: "Win", identity: "Windows" }, { string: navigator.platform, subString: "Mac", identity: "Mac" }, { string: navigator.userAgent, subString: "iPhone", identity: "iOS" }, { string: navigator.userAgent, subString: "iPad", identity: "iOS" }, { string: navigator.userAgent, subString: "iPod", identity: "iOS" }, { string: navigator.userAgent, subString: "Android", identity: "Android" }, {
            string: navigator.platform,
            subString: "Linux", identity: "Linux"
        }]
    }
}; MouseStatsSharedControl.mscg("5539898680139550665"); window.MouseStatsVisitorPlaybacks = []; window.MouseStatsVisitorPlaybacks.customVariable = function () { };
/* cached:5/20/2015 3:00:27 PM */