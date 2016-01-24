function stringToSeconds(str) {
	var s = str.toString().trim();
	var val, seconds = 0;

	for (var i = 0; i < 3; i++) {
		var idx = s.lastIndexOf(':');
		if (idx > -1) {
			val = parseInt(s.substr(idx + 1));
			seconds += val * Math.pow(60, i);
			s = s.substr(0, idx);
		} else {
			val = parseInt(s);
			seconds += val * Math.pow(60, i);
			break;
		}
	}

	return seconds || 0;
}

function getVideoCurrentTime() {
	var $duration = $('#player-api .ytp-time-current');
	return stringToSeconds($duration.text());
}

function getVideoDuration() {
	var $duration = $('#player-api .ytp-time-duration');
	return stringToSeconds($duration.text());
}

function getVideoUniqueID() {
	var url = window.location.href;
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[7].length==11){
		return match[7];
	}
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}