var submitDuration; // the point in the video where it has been 'watched' and is submitted
var videoID;
var mainLoop;
var submitLoop;

function mainFunc() {
	submitDuration = getVideoDuration() * submitPercentage;
	var currentTime = getVideoCurrentTime();
	if(currentTime >= submitDuration) {
		// video has been watched
		// add to buffer
		buffer.push(videoID);
		// stop loop
		clearInterval(mainLoop);
	}
}

function submitFunc() {
	for(i=0;i<buffer.length;i++) {
		// submit
		chrome.runtime.sendMessage({
			action: 'xhttp',
			username: username,
			password: password,
			videoid: buffer[i],
		}, function(response) {
			if(response.error == "None") {
				buffer.splice(i - 1, 1);
			} else if(response.error == "Invalid video id") {
				buffer.splice(i - 1, 1);
			} else {
				console.error(response);
			}
		});
	}
}

function reset() {
	clearInterval(mainLoop);
	clearInterval(submitLoop);
	submitDuration = getVideoDuration() * submitPercentage;
	videoID = getVideoUniqueID();
	mainLoop = setInterval(function() {
		mainFunc();
	}, 1000);
	submitLoop = setInterval(function() {
		submitFunc();
	}, 3000);
}

$('body').on('transitionend', function(event)
{
	if (event.target.id != 'progress') return false;
	reset();
});

reset();