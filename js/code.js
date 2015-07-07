var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxl425g7nwPAfSsH-Aw27RpwSYcLy5rSCfvt13vrgxhvBP5SOs/exec";

$(document).ready(function() {
    $.getJSON(SCRIPT_URL+"?callback=?",
		function (data) { refresh(data); });
});

function IncrementScore(column){
	
	 $.ajax({
        url: SCRIPT_URL+"?col="+column,
        type: "POST",
        crossDomain: true,
        dataType: "json",
        success:function(result){
            refresh(result);
        },
        error:function(xhr,status,error){
            alert(error);
        }
    });
	
	
}

function refresh(data){
	$("#GameDetails").text("Match: " + data.match + " Game: " + data.game);
	jQuery.each(data.scores, function(index, value) {
		var control = '#' + this.column;
		$(control).val(this.value);
	});
}