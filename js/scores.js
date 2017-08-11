var yearScores;
var monthScores;

var yearSwing;
var monthSwing;

var swing;

var scores;
var currentYear = new Date().getFullYear();

function calculateScores(){

	scores = getScoresObject();
	swing = getSwingObject();
	yearScores = [];
	monthScores = [];
	yearSwing = [];
	monthSwing = [];
	
	for(var i = 0; i < matches.length; i++){
		var match = matches[i];
		var year = 	match.date.split("-")[2]*1;
		var month = match.date.split("-")[1]*1;
		
		if(yearScores[year] == null) yearScores[year] = getScoresObject();
		if(monthScores[month] == null) monthScores[month] = getScoresObject();
		
		if(yearSwing[year] == null) yearSwing[year] = getSwingObject();
		if(monthSwing[month] == null) monthSwing[month] = getSwingObject();
		
		addToTotal(match, yearScores[year]);
		addToTotal(match, monthScores[month]);
		addToTotal(match, scores);
		
		addToSwing(match, yearSwing[year]);
		addToSwing(match, monthSwing[month]);
		addToSwing(match, swing);
	}
	
	// Set the scores for the current year if there have been no games yet
	if(yearScores[currentYear] == null) yearScores[currentYear] = getScoresObject();
}

function addToSwing(match, swingCount){
	
	if(match.sansom*1 > match.cooper*1 && match.sansom*1 >= match.table*1) 
		swingCount.sansomMatchCounter++;
	else if(match.cooper*1 > match.sansom*1 && match.cooper*1 >= match.table*1) 
		swingCount.cooperMatchCounter++;
		
	swingCount.matches.push(swingCount.sansomMatchCounter-swingCount.cooperMatchCounter);
	
	swingCount.sansomGameCounter += match.sansom*1;
	swingCount.cooperGameCounter += match.cooper*1;
	swingCount.sansomBridgeCounter += match.sansombridge*1;
	swingCount.cooperBridgeCounter += match.cooperbridge*1;
	swingCount.sansomBriggsCounter += match.sansombriggs*1;
	swingCount.cooperBriggsCounter += match.cooperbriggs*1;
	swingCount.games.push(swingCount.sansomGameCounter*1 - swingCount.cooperGameCounter*1);
	swingCount.bridge.push(swingCount.sansomBridgeCounter*1 - swingCount.cooperBridgeCounter*1);
	swingCount.briggs.push(swingCount.sansomBriggsCounter*1 - swingCount.cooperBriggsCounter*1);
}

function addToTotal(match,scoreCount)
{
	if(match.sansom*1 > match.cooper*1 && match.sansom*1 >= match.table*1) 
		scoreCount.sansomMatches++;
	else if(match.cooper*1 > match.sansom*1 && match.cooper*1 >= match.table*1) 
		scoreCount.cooperMatches++;
	else if(match.table*1 > match.sansom*1 && match.table*1 > match.cooper*1) 
		scoreCount.tableMatches++;
	else if(match.cooper*1 === match.sansom*1) 
		scoreCount.drawMatches++;
	
	scoreCount.cooperGames += match.cooper*1;
	scoreCount.cooperBridge += match.cooperbridge*1;	
	scoreCount.cooperBriggs += match.cooperbriggs*1;

	scoreCount.sansomGames += match.sansom*1;	
	scoreCount.sansomBridge += match.sansombridge*1;
	scoreCount.sansomBriggs += match.sansombriggs*1;

	scoreCount.tableGames += match.table*1;	
	scoreCount.tableBridge += match.tablebridge*1;
	scoreCount.tableBriggs += match.tablebriggs*1;

	scoreCount.matchNumber++;
	scoreCount.gameNumber += (match.cooper*1 + match.sansom*1 + match.table*1);
	scoreCount.bridgeNumber += (match.cooperbridge*1 + match.sansombridge*1 + match.tablebridge*1);
	scoreCount.briggsNumber += (match.cooperbriggs*1 + match.sansombriggs*1 + match.tablebriggs*1);	
}

function addScore(column)
{
	if(column === "A"){ // sansom games
		yearScores[currentYear].sansomGames++;
		scores.sansomGames++;
		if(scores.sansomGames % 100 === 0){
			showDialog('Shared','Congratulations Sansom, you have won ' + scores.sansomGames +  ' games of cards o comeuppance.', true);
		}
	}
	
	if(column === "B"){ // cooper games
		yearScores[currentYear].cooperGames++;
		scores.cooperGames++;
		if(scores.cooperGames % 100 === 0){
			showDialog('Shared','Congratulations Cooper, you have won ' + scores.cooperGames +  ' games of cards o comeuppance.', true);
		}
	}
	
	if(column === "D"){ // sansom bridge
		yearScores[currentYear].sansomBridge++;
		scores.sansomBridge++;
		if(scores.sansomBridge % 100 === 0){
			showDialog('Shafted','Sansom has just achieved a total of ' + scores.sansomBridge +  ' bridge cards. A heavy toll indeed.', false);
		}	
	}
	
	if(column === "E"){ // cooper bridge
		yearScores[currentYear].cooperBridge++;
		scores.cooperBridge++;
		if(scores.cooperBridge % 100 === 0){
			showDialog('Shafted','Cooper has just achieved a total of ' + scores.cooperBridge +  ' bridge cards. A heavy toll indeed.',false);
		}
	}
	
	if(column === "G"){ // sansom briggs
		yearScores[currentYear].sansomBriggs++;
		scores.sansomBriggs++;
		if(scores.sansomBriggs % 100 === 0){
			showDialog('Shafted','Comeuppance is in order. Sansom has been Briggsed ' + scores.sansomBriggs +  ' times. Kilroy is impressed.',false);
		}
	}
	
	if(column === "H"){ // cooper briggs
		yearScores[currentYear].cooperBriggs++;
		scores.cooperBriggs++;
		if(scores.cooperBriggs % 100 === 0){
			showDialog('Shafted','Comeuppance is in order. Cooper has been Briggsed ' + scores.cooperBriggs +  ' times. Kilroy is impressed.',false);
		}
	}
	
	if(column === "A" || column ==="B" || column ==="C")
	{
		yearScores[currentYear].gameNumber++;
		scores.gameNumber++;
		
		if(scores.gameNumber % 1000 === 0)
		{
			showDialog('Shared','A KILO OF COMEUPPANCE! Congratulations on playing ' + scores.gameNumber +  ' games of cards o comeuppance.',true);
		}
		else if(scores.gameNumber % 100 === 0)
		{
			showDialog('Shared','Congratulations on playing ' + scores.gameNumber +  ' games of cards o comeuppance.',true);
		}
	}
	
	if(column === "D" || column ==="E" || column ==="F")
	{
		var totalBridge = scores.sansomBridge + scores.cooperBridge + scores.tableBridge;
		if(totalBridge % 1000 === 0)
		{
			showDialog('Shafted','The bridge has been crossed ' + totalBridge +  ' times. Welcome to Koenigsberg.',false);
		}
		else if(totalBridge % 100 === 0)
		{
			showDialog('Shafted','The bridge has been crossed ' + totalBridge +  ' times. Welcome to Koenigsberg.',false);
		}
	}
	
	if(column === "G" || column ==="H" || column ==="I")
	{
		var totalBriggs = scores.sansomBriggs + scores.cooperBriggs + scores.tableBriggs;
		if(totalBriggs % 1000 === 0)
		{
			showDialog('Shafted','There has been a total of ' + totalBriggs +  ' Briggsings.',false);
		}
		else if(totalBriggs % 100 === 0)
		{
			showDialog('Shafted','There has been a total of ' + totalBriggs +  ' Briggsings.',false);
		}
	}
}

function showDialog(title, message, share){
	$("#milestone-header").text(title);
	$("#milestone-message").text(message);
	if(share)
	{
		$("#milestone-img").attr("src","img/share.png");
	}
	else
	{
		$("#milestone-img").attr("src","img/shaft.png")
	}
	
	$("#milestone").slideDown("slow");	
}

function subScore(column)
{
	if(column === "A"){ // sansom games
		yearScores[currentYear].sansomGames--;
		scores.sansomGames--;
	}
	
	if(column === "B"){ // cooper games
		yearScores[currentYear].cooperGames--;
		scores.cooperGames--;
	}
	
	if(column === "D"){ // sansom bridge
		yearScores[currentYear].sansomBridge--;
		scores.sansomBridge--;
	}
	
	if(column === "E"){ // cooper bridge
		yearScores[currentYear].cooperBridge--;
		scores.cooperBridge--;
	}
	
	if(column === "G"){ // sansom briggs
		yearScores[currentYear].sansomBriggs--;
		scores.sansomBriggs--;
	}
	
	if(column === "H"){ // cooper briggs
		yearScores[currentYear].cooperBriggs--;
		scores.cooperBriggs--;
	}
	
	if(column === "A" || column ==="B" || column ==="C")
	{
		yearScores[currentYear].gameNumber--;
		scores.gameNumber--;		
	}
}

function getSwingObject(){
	var obj = { matches: ["matches",null], games: ["games",null], bridge:["bridge",null], briggs: ["briggs",null], 
	sansomMatchCounter: 0, cooperMatchCounter: 0,
	sansomGameCounter: 0, cooperGameCounter: 0,
	sansomBridgeCounter: 0, cooperBridgeCounter: 0,
	sansomBriggsCounter: 0, cooperBriggsCounter: 0 };
	return obj;
}


function getScoresObject(){
	var obj = { cooperMatches: 0, cooperGames: 0, cooperBridge: 0, cooperBriggs: 0, 
				sansomMatches: 0, sansomGames: 0, sansomBridge: 0, sansomBriggs: 0,
				tableMatches: 0, tableGames: 0, tableBridge: 0, tableBriggs: 0,
				drawMatches: 0, matchNumber: 0, gameNumber: 0, briggsNumber: 0, bridgeNumber: 0 };
	return obj; 
}

$("#milestone").click(function() {$("#milestone").slideUp("slow");});
