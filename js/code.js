var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxl425g7nwPAfSsH-Aw27RpwSYcLy5rSCfvt13vrgxhvBP5SOs/exec";
var START_YEAR = 2014;

var gameDate;
var matches;

var showyear = false;
var allrows = false;

var playingAudio = false;

$(document).ready(function() {
	$(".container-fluid").hide();
	getMatches();
});

function refresh(){
	if(gameDate == null) getMatches();
	else getScores();
}

function showTrophies(){
	$(".loading").fadeIn("slow");	
	$(".container-fluid").fadeOut("slow");
	
	doTrophies();
	
	$("#trophy-view").fadeIn("slow");
	$(".loading").fadeOut("slow");	
}

function showCharts(){
	doCharts();
	$(".container-fluid").fadeOut("slow");
	$("#chart-view").fadeIn("slow");
	$(window).trigger('resize');
}

function getScore(column){
	var control = "#" + column + " > :input";
	return $(control).val() * 1;
}

function  updateScore(column,method){
	var control = "#" + column + " > :input";
	if(method === "add"){
		$(control).val(($(control).val() * 1) + 1);
		addScore(column)
	}
	else if(method === "sub"){
		if(($(control).val() * 1) > 0){ // Don't allow negative scores
			$(control).val(($(control).val() * 1) - 1);
			subScore(column);
		}
	}
	
	validate();
	displayScores();
}

function validate(){
	// Check the scores add up
	var scoresTotal = ($("#A > :input").val()*1) + ($("#B > :input").val()*1) + ($("#C > :input").val()*1);
	var bridgeTotal = ($("#D > :input").val()*1) + ($("#E > :input").val()*1) + ($("#F > :input").val()*1);
	
	if(scoresTotal > bridgeTotal){
		//disable scores add
		$("#A > .add").prop('disabled', true);
		$("#B > .add").prop('disabled', true);
		$("#C > .add").prop('disabled', true);
		
		//disable bridge sub
		$("#D > .sub").prop('disabled', true);
		$("#E > .sub").prop('disabled', true);
		$("#F > .sub").prop('disabled', true);
		
		//highlight bridge
		$("#D > input").addClass('highlighted');
		$("#E > input").addClass('highlighted');
		$("#F > input").addClass('highlighted');
	}
	else if(bridgeTotal > scoresTotal){
		//disable bridge add
		$("#D > .add").prop('disabled', true);
		$("#E > .add").prop('disabled', true);
		$("#F > .add").prop('disabled', true);
		
		//disable scores sub
		$("#A > .sub").prop('disabled', true);
		$("#B > .sub").prop('disabled', true);
		$("#C > .sub").prop('disabled', true);
		
		//highlight scores
		$("#A > input").addClass('highlighted');
		$("#B > input").addClass('highlighted');
		$("#C > input").addClass('highlighted');
	}
	else{
		$(".add").prop('disabled', false);
		$(".sub").prop('disabled', false);
		$("input").removeClass('highlighted');
	}
	
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
		destroyCharts();
		displayMatches(data);
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

		var sansomClass = match.sansom > match.cooper && match.sansom >= match.table ? "win" : "lose";
		var cooperClass = match.cooper > match.sansom && match.cooper >= match.table ? "win" : "lose";
		var tableClass = match.table > match.cooper && match.table > match.sansom ? "win" : "lose"; 
		if(match.sansom == match.cooper && match.sansom >= match.table && match.cooper >= match.table ){
			sansomClass = "";
			cooperClass = "";		
		}
		
		var sansomFlair = "";
		var cooperFlair = "";
		
		// Killroy Shares and shafts (lost to and beat their opponent)
		if(match.cooper > match.sansom){
			cooperFlair += "&nbsp;<i class=\"fa fa-thumbs-up\" title=\"Killroy Shares\"></i>";
			sansomFlair += "&nbsp;<i class=\"fa fa-thumbs-down\" title=\"Killroy Shafts\"></i>";			
		} 
		if(match.sansom > match.cooper) {
			sansomFlair += "&nbsp;<i class=\"fa fa-thumbs-up\" title=\"Killroy Shares\"></i>";
			cooperFlair += "&nbsp;<i class=\"fa fa-thumbs-down\" title=\"Killroy Shafts\"></i>";	
		}
			
		// pile of comeuppance (came third)
		if(match.sansom > match.cooper && match.table > match.cooper)
			cooperFlair += "&nbsp;<i class=\"fa fa-bomb\" title=\"Pile of Comeuppance\"></i>";
		if(match.cooper > match.sansom && match.table > match.sansom)
			sansomFlair += "&nbsp;<i class=\"fa fa-bomb\" title=\"Pile of Comeuppance\"></i>";
		
		// shafted (lost by 5 or more games)
		if(match.sansom - match.cooper >= 5)
			cooperFlair += "&nbsp;<i class=\"fa fa-hand-grab-o\" title=\"Shafted\"></i>";
		if(match.cooper - match.sansom >= 5)
			sansomFlair += "&nbsp;<i class=\"fa fa-hand-grab-o\" title=\"Shafted\"></i>";
		
		// hat trick (won all 3)
		if( (match.sansom > match.cooper && match.sansom > match.table) &&
			(match.sansombriggs > match.cooperbriggs && match.sansombriggs > match.tablebriggs) &&
			(match.sansombridge > match.cooperbridge && match.sansombridge > match.tablebridge) )
			sansomFlair += "&nbsp;<i class=\"fa fa-magic\" title=\"Hat-Trick\"></i>";
		if(	(match.cooper > match.sansom && match.cooper > match.table) &&
			(match.cooperbriggs > match.sansombriggs && match.cooperbriggs > match.tablebriggs) &&
			(match.cooperbridge > match.sansombridge && match.cooperbridge > match.tablebridge) )
			cooperFlair += "&nbsp;<i class=\"fa fa-magic\" title=\"Hat-Trick\"></i>";
		
		// bridge too far (3/4 of bridge cards)
		var totalBridge = match.sansombridge + match.cooperbridge + match.tablebridge;
		if(match.sansombridge/totalBridge > 0.75)
			sansomFlair += "&nbsp;<i class=\"fa fa-ban\" title=\"A bridge too far (3/4 of bridge cards)\"></i>";
		if(match.cooperbridge/totalBridge > 0.75)
			cooperFlair += "&nbsp;<i class=\"fa fa-ban\" title=\"A bridge too far (3/4 of bridge cards)\"></i>";		

		// crippled (5 or more briggsings)
		if(match.sansombriggs >= 5) 
			sansomFlair += "&nbsp;<i class=\"fa fa-ambulance\" title=\"Crippled (5 Briggsings)\"></i>";
		if(match.cooperbriggs >= 5) 		
			cooperFlair += "&nbsp;<i class=\"fa fa-ambulance\" title=\"Crippled (5 Briggsings)\"></i>";
		
		// 888 award (no briggsings)
		if(match.sansombriggs === 0)
			sansomFlair += "&nbsp;<i class=\"fa fa-cc\" title=\"888 Award (No Briggsings)\"></i>";
		if(match.cooperbriggs === 0)
			cooperFlair += "&nbsp;<i class=\"fa fa-cc\" title=\"888 Award (No Briggsings)\"></i>";
		
		$('#match-list tr:last').after('<tr onclick="javascript:getScores(\''+match.date+'\');"><td>'+match.date+'</td><td class="'+sansomClass+'"><b>'+match.sansom+sansomFlair+'</b></td><td class="'+cooperClass+'"><b>'+match.cooper+cooperFlair+'</b></td><td class="'+tableClass+'"><b>'+match.table+'</b></td></tr>');
	}
}

function displayMatches(data){
	matches = data.matches;
	stats = data.stats;
	gameDate = null;
	displayTable();
	calculateScores();
	displayScores();
}

function updateGameNumber(data){
	displayScores();
}

function toggleYearDisplay(){
	showyear = !showyear;
	displayScores();
	$("#scoresHeader").text(showyear ? "Current Season" : "All Time" );
}

function displayScores(){
	var year = new Date().getFullYear()*1;

	$("#match").text(yearScores[year].matchNumber + " (" + scores.matchNumber + ")");
	$("#game").text(yearScores[year].gameNumber + " (" + scores.gameNumber + ")");
	$("#sansomMatchScore").text(yearScores[year].sansomMatches + " (" + scores.sansomMatches+ ")");
	$("#sansomGameScore").text(yearScores[year].sansomGames + " (" + scores.sansomGames + ")");
	$("#cooperMatchScore").text(yearScores[year].cooperMatches + " (" + scores.cooperMatches+ ")");
	$("#cooperGameScore").text(yearScores[year].cooperGames + " (" + scores.cooperGames + ")");
	
	var scoreBox = scores;
	if(showyear) scoreBox = yearScores[year]

	displayScore("#sansomGames",scoreBox.sansomGames,scoreBox.cooperGames, true);
	displayScore("#cooperGames",scoreBox.cooperGames,scoreBox.sansomGames, false);
	displayScore("#sansomMatches",scoreBox.sansomMatches,scoreBox.cooperMatches, true);
	displayScore("#cooperMatches",scoreBox.cooperMatches,scoreBox.sansomMatches, false);	
	displayScore("#sansomBridge",scoreBox.sansomBridge,scoreBox.cooperBridge, true);
	displayScore("#cooperBridge",scoreBox.cooperBridge,scoreBox.sansomBridge, false);
	displayScore("#sansomBriggs",scoreBox.sansomBriggs,scoreBox.cooperBriggs, true);
	displayScore("#cooperBriggs",scoreBox.cooperBriggs,scoreBox.sansomBriggs, false);
	$("#totalMatches").text(scoreBox.matchNumber);
	$("#totalGames").text(scoreBox.gameNumber);
	$("#totalBridge").text(scoreBox.bridgeNumber);
	$("#totalBriggs").text(scoreBox.briggsNumber);		
}

function displayScore(tag,score,compareScore,left){
	var diff = score - compareScore;
	var line = "";
	
	if(left) line += " " + score;
	if(diff === 0) line += " <small class='darw'><i class='fa fa-sort' aria-hidden='true'></i> 0</small>";
	if(diff > 0) line += " <small class='win'><i class='fa fa-caret-up' aria-hidden='true'></i> " + diff + "</small>";
	if(diff < 0) line += " <small class='lose'><i class='fa fa-caret-down' aria-hidden='true'></i> " + diff * -1 + "</small>";
	if(!left) line += " " + score;
	
	$(tag).html(line);
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
	validate();
}

function PlayAudio(file, element){
	if(!playingAudio){
		var audio = new Audio('sounds/'+file+'.mp3');
		audio.onended = function() { playingAudio = false; element.classList.remove("lose"); }
		playingAudio = true;
		element.classList.add("lose");
		audio.play();
			
		$.ajax({url: SCRIPT_URL+"?method=PLAYSOUND&sound="+file,
			type: "POST",
			crossDomain: true,
			data: JSON.stringify(""),
			dataType: "json"})
		.done(function(data){
		
		})
		.fail(function(xhr,status,error){

		});
	}
}