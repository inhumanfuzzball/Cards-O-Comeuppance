var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxl425g7nwPAfSsH-Aw27RpwSYcLy5rSCfvt13vrgxhvBP5SOs/exec";

$(document).ready(function() {
    $.getJSON(SCRIPT_URL+"?callback=?",
		function (data) { refresh(data); });
});

function IncrementScore(column){
	
	// Disable input button
	var control = "#" + column + " > :button";
	$(control).attr("disabled", true);
	$(control).addClass("disabled");
	$.ajax({
        url: SCRIPT_URL+"?col="+column,
        type: "POST",
        crossDomain: true,
        dataType: "json",
        success:function(result){
            refresh(result);
			$(control).attr("disabled", false);
			$(control).removeClass("disabled");
        },
        error:function(xhr,status,error){
            alert(error);
        }
    });
	
	
}

function refresh(data){
	$("#GameDetails").text("Match: " + data.match + " Game: " + data.game);
	jQuery.each(data.scores, function(index, value) {
		var control = "#" + this.column + " > :input";
		$(control).val(this.value);
	});
}