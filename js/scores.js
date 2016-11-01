var yearScores;
var monthScores;

var scores;
var currentYear = new Date().getFullYear();

function calculateScores(){

	scores = getScoresObject();
	yearScores = [];
	monthScores = [];
	
	for(var i = 0; i < matches.length; i++){
		var match = matches[i];
		var year = 	match.date.split("-")[2]*1;
		var month = match.date.split("-")[1]*1;
		
		if(yearScores[year] == null) yearScores[year] = getScoresObject();
		if(monthScores[month] == null) monthScores[month] = getScoresObject();
		
		addToTotal(match, yearScores[year]);
		addToTotal(match, monthScores[month]);
		addToTotal(match, scores);
	}
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
	}
	
	if(column === "B"){ // cooper games
		yearScores[currentYear].cooperGames++;
		scores.cooperGames++;
	}
	
	if(column === "A" || column ==="B") // here incase additional columns are added, only game wins update hte game total
	{
		yearScores[currentYear].gameNumber++;
		scores.gameNumber++;		
	}
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
	
	if(column === "A" || column ==="B") // here incase additional columns are added, only game wins update hte game total
	{
		yearScores[currentYear].gameNumber--;
		scores.gameNumber--;		
	}
}

function getScoresObject(){
	var obj = { cooperMatches: 0, cooperGames: 0, cooperBridge: 0, cooperBriggs: 0, 
				sansomMatches: 0, sansomGames: 0, sansomBridge: 0, sansomBriggs: 0,
				tableMatches: 0, tableGames: 0, tableBridge: 0, tableBriggs: 0,
				drawMatches: 0, matchNumber: 0, gameNumber: 0, briggsNumber: 0, bridgeNumber: 0 };
	return obj; 
}