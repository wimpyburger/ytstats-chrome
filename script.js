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
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_openInTab
// @grant         GM_xmlhttpRequest
// @version       0.1
// ==/UserScript==

var pageloadedinterval;
var regularinterval;
var siteurl = "http://www.turnaroundtoolkit.co.uk/inc/submit.php";
var xmlhttp = new XMLHttpRequest();
var c_username = "changeme";
var c_password = "changeme";

function sendvideo(videourl) {
    var videoid = videourl.substr(videourl.lastIndexOf('v=') + 2);
    //var tab = siteurl + "?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password) + "&id=" + videourl;
    GM_xmlhttpRequest({
        method: "POST",
        url: siteurl,
        data: "username=" + c_username + "&password=" + c_password + "&id=" + videoid,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
			console.log(response.responseText);
            if(response.responseText == "DONE") {
                console.log("Video sent to Ytstats");
                clearInterval(regularinterval);
            }
        }
    });
}

function checkplaytime() {
    var ytplayer = document.getElementById("movie_player");
    if(ytplayer.getDuration() > 0 ) {
        var halflength = ytplayer.getDuration() / 2;
        var currenttime = ytplayer.getCurrentTime();
        if(currenttime >= halflength) {
            sendvideo(ytplayer.getVideoUrl());
        }
    }
}

function checkifloaded() {
    if(document.getElementById("movie_player") != 'null') {
        clearInterval(pageloadedinterval);
        regularinterval = setInterval(checkplaytime, 1000);
    }
}

function reset() {
    clearInterval(regularinterval);
    clearInterval(pageloadedinterval);
    pageloadedinterval = setInterval(checkifloaded, 500);
}

function youtubePageChange()
{
    reset();
    $('body').on('transitionend', function(event)
    {
        if (event.target.id != 'progress') return false;
        reset();
    });
}

$(youtubePageChange);