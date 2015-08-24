// ==UserScript==
// @name          YTStats
// @namespace	  userscripts.org
// @author        wimpyburger
// @description   Tampermonkey script for YTStats site
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       *//*.youtube.com/tv*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_openInTab
// @grant         GM_xmlhttpRequest
// @version       0.1
// ==/UserScript==

var pageloadedinterval;
var regularinterval;
var siteurl = "http://localhost/_OTHER_/ytstats/inc/submit.php";
var xmlhttp = new XMLHttpRequest();
var username = "changeme";
var password = "changeme";

function sendvideo(videourl) {
    var videourl = videourl.substr(videourl.lastIndexOf('v=') + 2);
    GM_openInTab(siteurl + "?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password) + "&id=" + videourl, true);
}

function checkplaytime() {
    var ytplayer = document.getElementById("movie_player");
    if(ytplayer.getDuration() > 0 ) {
        var halflength = ytplayer.getDuration() / 2;
        var currenttime = ytplayer.getCurrentTime();
        if(currenttime >= halflength) {
            sendvideo(ytplayer.getVideoUrl());
            clearInterval(regularinterval);
        }
    }
}

function checkifloaded() {
    if(document.getElementById("movie_player") != 'null') {
        clearInterval(pageloadedinterval);
        regularinterval = setInterval(checkplaytime, 1000);
    }
}



pageloadedinterval = setInterval(checkifloaded, 500);