$.ajax({
	url: '../test/actors',
	type: 'GET',
	dataType: 'json',
	success: function (res) {
		if (res.status === 1){
			var data = res.data;
			for (var i = 0; i < data.length; i ++){
				var htmlStr = "<p>"+data[i].actorId+"  "+data[i].firstName+" "+data[i].lastName+" "+data[i].lastUpdate+"</p>";
				$('#show').append(htmlStr);
			}
		}
	},
	error: function (err) {

	}
})