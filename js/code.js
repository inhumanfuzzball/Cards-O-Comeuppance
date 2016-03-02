var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxl425g7nwPAfSsH-Aw27RpwSYcLy5rSCfvt13vrgxhvBP5SOs/exec";
var gameDate;
var matches;
var stats;

var sansomYearGames;
var sansomYearMatches;
var sansomYearBridge;
var sansomYearBriggs;

var cooperYearGames;
var cooperYearMatches;
var cooperYearBridge;
var cooperYearBriggs;

var tableYearGames;
var tableYearMatches;
var tableYearBridge;
var tableYearBriggs;

var cooperGames;
var sansomGames;
var sansomMatches;
var cooperMatches;
var matchNumber;
var gameNumber;

var showyear = false;
var allrows = false;

$(document).ready(function() {
	$(".container-fluid").hide();
	getMatches();
});

function refresh(){
	if(gameDate == null) getMatches();
	else getScores();
}

function showTrophies(){
	$(".container-fluid").hide();
	$("#trophy-view").show();
}

function showCharts(){
	$(".container-fluid").hide();
	$("#chart-view").show();
	$(window).trigger('resize');
}

function getScore(column){
	var control = "#" + column + " > :input";
	return $(control).val() * 1;
}

function  updateScore(column,method)
{
	var control = "#" + column + " > :input";
	if(method === "add"){
		gameNumber++;
		$(control).val(($(control).val() * 1) + 1);
		if(column === "A"){
			sansomYearGames++;
			sansomGames++;
		}
		if(column === "B"){
			cooperYearGames++;
			cooperGames++;
		}
	}
	else if(method === "sub"){
		if(($(control).val() * 1) > 0){
			$(control).val(($(control).val() * 1) - 1);
			if(column === "A"){
				sansomYearGames--;
				sansomGames--;
			}
			if(column === "B"){
				cooperYearGames--;
				cooperGames--;
			}
		}
	}
	displayScores();
}

function updateScores(){

	$(".loader").show();
	$(".success,.failed").hide();
	
	var gameRow = [getScore("A"),getScore("B"),getScore("C"),getScore("D"),getScore("E"),getScore("F"),getScore("G"),getScore("H"),getScore("I")];

	// Show some saving animation
	$.ajax({url: SCRIPT_URL+"?method=SAVE&date="+gameDate,
		type: "POST",
		crossDomain: true,
		data: JSON.stringify(gameRow),
		dataType: "json"})
	.done(function(data){
		updateGameNumber(data);
		$(".loader").hide();
		$(".success").show();
		// After 10 seconds hide the success icon
		setTimeout(function(){ $( ".success" ).fadeOut( "slow" ); }, 10000);
	})
	.fail(function(xhr,status,error){
		// Show the error
		$("#error-text").text("Unable to save scores. Reason: " + error);		
		$(".failed,#error-box").show();		
		$(".loader").hide();
		// wait 10 seconds before trying again
		setTimeout(updateScores, 10000);
	});
}

function pushScore(element){
	
	// Use the DOM to work out the column and method being updated
	var column = element.parentElement.id;
	var method = element.className;
	
	// Update the score
	updateScore(column,method);
	
	// Save back to server
	updateScores();	
}

function addGame(){
	$(".loading").fadeIn("slow");	
	$(".container-fluid").fadeOut("slow");
	
	// Call WS
	$.ajax({url: SCRIPT_URL+"?method=NEW",
			type: "POST",
			crossDomain: true,
			dataType: "json"})
		.done(function(data){
			$("#game-view").fadeIn("slow");
			$(".loading").fadeOut("slow");	
            displayGame(data);
        })
		.fail(function(xhr,status,error){
			$(".loading").fadeOut("slow");	
			$("#game-view").fadeIn("slow");
			$("#error-text").text("Error creating game. Reason: " + error);		
			$("#error-box").show();
        });
}

function getScores(date){
	$(".loading").fadeIn("slow");	
	$(".container-fluid").fadeOut("slow");

	if(date == null) date = gameDate;
    $.getJSON(SCRIPT_URL+"?callback=?&date="+date, function (data) { displayGame(data); });
}

function getMatches(){
	$(".container-fluid").fadeOut("slow");
	$(".loading").fadeIn("slow");
	$.getJSON(SCRIPT_URL+"?callback=?&method=MATCHES", function (data) { 
		displayMatches(data);
		displayStats(data);
		buildTrophies(data);
		$("#match-view").fadeIn("slow");
		$(".loading").fadeOut("slow");
	});
}

function toggleRows(){
	allrows = !allrows;
	
	// Showing all rows to change glyph to retract
	if(allrows){
		$("#expand").removeClass("glyphicon glyphicon-menu-down").addClass("glyphicon glyphicon-menu-up");
	}else{
		$("#expand").removeClass("glyphicon glyphicon-menu-up").addClass("glyphicon glyphicon-menu-down");
	}
	
	displayTable();
}

function displayTable(){
	var count = 0;
	if(!allrows) count = matches.length - 5;
	
	// Clear the table
	$("#match-list").find("tr:gt(0)").remove();
	
	for(var i = matches.length - 1; i >= count; i--){
		var match = matches[i];
		var sansomClass = match.sansom > match.cooper ? "win" : "lose";
		var cooperClass = match.cooper > match.sansom ? "win" : "lose";
		if(match.sansom == match.cooper){
			sansomClass = "";
			cooperClass = "";		
		}
		$('#match-list tr:last').after('<tr onclick="javascript:getScores(\''+match.date+'\');"><td>'+match.date+'</td><td class="'+sansomClass+'">'+match.sansom+'</td><td class="'+cooperClass+'">'+match.cooper+'</td><td>'+match.table+'</td></tr>');
	}
}

function calculateYearScores()
{
	var currentYear = new Date().getFullYear();
	sansomYearMatches = 
	cooperYearMatches = 
	tableYearMatches =
	sansomYearGames = 
	cooperYearGames = 
	tableYearGames =
	sansomMatches = 
	cooperMatches = 
	sansomGames = 
	cooperGames = 
	cooperYearGames =
	cooperYearBridge =
	cooperYearBriggs = 
	sansomYearGames =
	sansomYearBridge =
	sansomYearBriggs =
	tableYearGames =
	tableYearBridge =
	tableYearBriggs = 0;
	
	for(var i = 0; i < matches.length; i++)
	{
		var match = matches[i];
		
		if(match.date === new Date()) continue;
		
		if( match.date.substring(match.date.length - 4, match.date.length)*1 === currentYear*1)
		{
			// Year matches
			if(match.sansom > match.cooper && match.sansom > match.table) sansomYearMatches++;
			else if(match.cooper > match.sansom && match.cooper > match.table) cooperYearMatches++;
			else if(match.table > match.sansom && match.table > match.cooper) tableYearMatches++;

			cooperYearGames += match.cooper;
			cooperYearBridge += match.cooperbridge;	
			cooperYearBriggs += match.cooperbriggs;			
			
			sansomYearGames += match.sansom;	
			sansomYearBridge += match.sansombridge;
			sansomYearBriggs += match.sansombriggs;
			
			tableYearGames += match.table;	
			tableYearBridge += match.tablebridge;
			tableYearBriggs += match.tablebriggs;
		}
		
		if(match.sansom > match.cooper && match.sansom > match.table) sansomMatches++;
		else if(match.cooper > match.sansom && match.cooper > match.table) cooperMatches++;
		
		cooperGames += match.cooper;
		sansomGames += match.sansom;
		
	}
}

function displayMatches(data)
{
	matches = data.matches;
	stats = data.stats;
	gameDate = null;
	displayTable();
	calculateYearScores();
	displayScores();
	doCharts();
}

function displayStats(data){
	$("#sansom-win").text(data.stats.Sansom_Matches_Won);
	$("#cooper-win").text(data.stats.Cooper_Matches_Won);
	$("#table-win").text(data.stats.Table_Matches_Won);
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

function updateGameNumber(data){
	matchNumber = data.match;
	gameNumber = data.game;
	displayScores();
}

function toggleYearDisplay(){
	showyear = !showyear;
	displayScores();
	$("#toggleYear").text(showyear ? "Current Season" : "All Time" );
}

function displayScores()
{
	$("#match").text(matchNumber);
	$("#game").text(gameNumber);
	$("#sansomMatchScore").text(sansomYearMatches + " (" + sansomMatches+ ")");
	$("#sansomGameScore").text(sansomYearGames + " (" + sansomGames + ")");
	$("#cooperMatchScore").text(cooperYearMatches + " (" + cooperMatches+ ")");
	$("#cooperGameScore").text(cooperYearGames + " (" + cooperGames + ")");
	
	if(showyear){
		$("#sansomGames").text(sansomYearGames);
		$("#cooperGames").text(cooperYearGames);
		$("#sansomMatches").text(sansomYearMatches);
		$("#cooperMatches").text(cooperYearMatches);		

	}
	else{
		$("#sansomGames").text(sansomGames);
		$("#cooperGames").text(cooperGames);
		$("#sansomMatches").text(sansomMatches);
		$("#cooperMatches").text(cooperMatches);		
	}
}

function displayGame(data){
	// Show the game area and hide the loading circle
	$(".loader,.success,.failed,#error-box").hide();	
	
	// Game info header
	if(data.complete){
		$("#game-details").text("Match: " + data.match);
		$(".score").removeClass("score").addClass("score-readonly");
	}else{
		$("#game-details").text("Match: " + data.match + " Game: " + data.game);
		$(".score-readonly").removeClass("score-readonly").addClass("score");
	}
	
	updateGameNumber(data)
	
	// Scores
	jQuery.each(data.scores, function(index, value) {
		var control = "#" + this.column + " > :input";
		$(control).val(this.value);
	});
	
	$(".loading").fadeOut("slow");
	$("#game-view").fadeIn("slow");

	// Store the current game date as its the key for updating the game
	gameDate = data.gameDate;
}

