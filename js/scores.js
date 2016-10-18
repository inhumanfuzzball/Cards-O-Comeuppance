var yearScores;
var scores;
var currentYear = new Date().getFullYear();

function calculateScores(){

	scores = getScoresObject();
	yearScores = [];
	
	for(var i = 0; i < matches.length; i++){
		var match = matches[i];
		var year = 	match.date.substring(match.date.length - 4, match.date.length)*1;
		
		if(yearScores[year] == null) yearScores[year] = getScoresObject();
		
		if(match.sansom*1 > match.cooper*1 && match.sansom*1 >= match.table*1) yearScores[year].sansomMatches++;
		else if(match.cooper*1 > match.sansom*1 && match.cooper*1 >= match.table*1) yearScores[year].cooperMatches++;
		else if(match.table*1 > match.sansom*1 && match.table*1 > match.cooper*1) yearScores[year].tableMatches++;
		else if(match.cooper*1 === match.sansom*1) yearScores[year].drawMatches++;
		
		yearScores[year].cooperGames += match.cooper*1;
		yearScores[year].cooperBridge += match.cooperbridge*1;	
		yearScores[year].cooperBriggs += match.cooperbriggs*1;
		
		yearScores[year].sansomGames += match.sansom*1;	
		yearScores[year].sansomBridge += match.sansombridge*1;
		yearScores[year].sansomBriggs += match.sansombriggs*1;
		
		yearScores[year].tableGames += match.table*1;	
		yearScores[year].tableBridge += match.tablebridge*1;
		yearScores[year].tableBriggs += match.tablebriggs*1;
		
		yearScores[year].matchNumber++;
		yearScores[year].gameNumber += (match.cooper*1 + match.sansom*1 + match.table*1);
		yearScores[year].bridgeNumber += (match.cooperbridge*1 + match.sansombridge*1 + match.tablebridge*1);
		yearScores[year].briggsNumber += (match.cooperbriggs*1 + match.sansombriggs*1 + match.tablebriggs*1);
	}
	
	for(key in yearScores){
		scores.cooperMatches += yearScores[key].cooperMatches;
		scores.cooperGames += yearScores[key].cooperGames;
		scores.cooperBridge += yearScores[key].cooperBridge;
		scores.cooperBriggs += yearScores[key].cooperBriggs;
		
		scores.sansomMatches += yearScores[key].sansomMatches;
		scores.sansomGames += yearScores[key].sansomGames;
		scores.sansomBridge += yearScores[key].sansomBridge;
		scores.sansomBriggs += yearScores[key].sansomBriggs;
		
		scores.tableMatches += yearScores[key].tableMatches;
		scores.tableGames += yearScores[key].tableGames;
		scores.tableBridge += yearScores[key].tableBridge;
		scores.tableBriggs += yearScores[key].tableBriggs;
		
		scores.drawMatches += yearScores[key].drawMatches;
		scores.matchNumber += yearScores[key].matchNumber;
		scores.gameNumber += yearScores[key].gameNumber;
		scores.briggsNumber += yearScores[key].briggsNumber;
		scores.bridgeNumber += yearScores[key].bridgeNumber;
	}
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