var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxl425g7nwPAfSsH-Aw27RpwSYcLy5rSCfvt13vrgxhvBP5SOs/exec";
var gameDate;

$(document).ready(function() {
	getMatches();
});

function refresh(){
	if(gameDate == null) getMatches();
	else getScores();
}

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
            displayGame(data);
        })
		.fail(function(xhr,status,error){
			alert("Error updating score");
        })
		.always(function() {
			// Enable the button and display when done
			$(control).attr("disabled", false).removeClass("disabled");
		});
}

function addGame(){
	// Call WS
	$.ajax({url: SCRIPT_URL+"?method=NEW",
			type: "POST",
			crossDomain: true,
			dataType: "json"})
		.done(function(data){
			$("#game-view").show();
			$("#match-view").hide();
            displayGame(data);
        })
		.fail(function(xhr,status,error){
			alert("Error creating game");
        });
}

function getScores(date){
	$("#game-view").show();
	$("#match-view").hide();
	
	if(date == null) date = gameDate;
    $.getJSON(SCRIPT_URL+"?callback=?&date="+date, function (data) { displayGame(data); });
}

function getMatches(){
	$("#game-view").hide();
	$("#match-view").show();
	
	$.getJSON(SCRIPT_URL+"?callback=?&method=MATCHES", function (data) { 
		 $("#match-list").find("tr:gt(0)").remove();
	
		jQuery.each(data.matches, function(index, value) {
			$('#match-list tr:last').after('<tr onclick="javascript:getScores(\''+this.date+'\');"><td>'+this.date+'</td><td>'+this.sansom+'</td><td>'+this.cooper+'</td><td>'+this.table+'</td></tr>');
		});
		
		gameDate = "";
	});
}

function displayGame(data){
	// Game info header
	if(data.complete)
		$("#game-details").text("Match: " + data.match);
	else
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
	
	//Remove add and sub buttons if this game is complete
	if(data.complete){
		$(".score > :button").hide();
	}
	else{
		$(".score > :button").show();
	}
	
	//Store the current game
	gameDate = data.gameDate;
}