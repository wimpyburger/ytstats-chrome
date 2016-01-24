chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	if (request.action == "xhttp") {
		$.ajax({
			method: "POST",
			url: "http://127.0.0.1:8000/submit/",
			data: {username: request.username, password: request.password, videoid: request.videoid},
			dataType: "json",
			timeout: 2800,
			async: false,
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			},
			success: function(data){
				callback(data);
			},
			error: function(xhr, status, error){
				callback(error);
			}
		});
	}
});