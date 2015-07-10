var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxl425g7nwPAfSsH-Aw27RpwSYcLy5rSCfvt13vrgxhvBP5SOs/exec";

$(document).ready(function() {
	getScores();
});

function pushScore(element){
	//Use the DOM to work out the column and method we need to call
	var column = element.parentElement.id;
	var method = element.className;
	
	// Disable input button and display box
	var control = "#" + column + " > :button, #" + column + " > :input";
	$(control).attr("disabled", true).addClass("disabled");
	
	// Call WS
	$.ajax({url: SCRIPT_URL+"?col="+column+"&method="+method,
			type: "POST",
			crossDomain: true,
			dataType: "json"})
		.done(function(data){
            refresh(data);
        })
		.fail(function(xhr,status,error){
			alert("Error updating score");
        })
		.always(function() {
			// Enable the button and display when done
			$(control).attr("disabled", false).removeClass("disabled");
		});
}

function getScores(){
    $.getJSON(SCRIPT_URL+"?callback=?", function (data) { refresh(data); });
}

function refresh(data){
	// Game info header
	$("#game-details").text("Match: " + data.match + " Game: " + data.game);
	
	//Scores
	jQuery.each(data.scores, function(index, value) {
		var control = "#" + this.column + " > :input";
		$(control).val(this.value);
	});
	
	// Statistics
	$("#sansom-win").text(data.stats.Sansom_Matches_Won);
	$("#cooper-win").text(data.stats.Cooper_Matches_Won);
	$("#draws").text(data.stats.Draws);
	$("#sansom-game-win").text(data.stats.Sansom_Games_Won);
	$("#cooper-game-win").text(data.stats.Cooper_Games_Won);
	$("#table-game-win").text(data.stats.Table_Games_Won);
	$("#sansom-bridge").text(data.stats.Sansom_Bridge_Cards);
	$("#cooper-bridge").text(data.stats.Cooper_Bridge_Cards);
	$("#table-bridge").text(data.stats.Table_Bridge_Cards);
	$("#sansom-briggs").text(data.stats.Sansom_Briggsings);
	$("#cooper-briggs").text(data.stats.Cooper_Briggsings);
	$("#table-briggs").text(data.stats.Table_Briggsings);
	$("#games-played").text(data.stats.Games_Played);
	$("#matches-played").text(data.stats.Matches_Played);
}