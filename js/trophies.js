var streaks = [];

//Trophies
function buildTrophies(data)
{
	var trophies = [
	"TrophyComeuppanceCup",
	"TrophyPingtarPlaque",
	"TrophyPingtarPrince",
	"TrophyShare",
	"TrophyILiedTwice",	
	"TrophyHastingsAward",
	"TrophyThomasTrophy",
	"TrophyKonigsbergCup",
	"TrophyShafted",
	"TrophyBlackHoleOfComeuppance",
	"TrophyBridgeTooFar",
	"TrophyCloudOfComeuppance"];
	var source = $("#entry-template").html();
	var template = Handlebars.compile(source);
	
	calculateLosingStreaks(data);
	
	$("#sansom-trophies").empty();
	$("#cooper-trophies").empty();
	
	for(var i = 2014; i < new Date().getFullYear(); i++)
	{
		$("#sansom-trophies").append(TrophyChampionYear("Sansom",template, data, i));
		$("#cooper-trophies").append(TrophyChampionYear("Cooper",template, data, i));
	}		
	
	for(var i = 0; i < trophies.length; i++)
	{
		$("#sansom-trophies").append(window[trophies[i]]("Sansom",template, data));
		$("#cooper-trophies").append(window[trophies[i]]("Cooper",template, data));
	}

}

function calculateLosingStreaks(data)
{
	var loser = "";
	var currentLosingStreak = 0;

	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(loser === "Cooper")
		{
			if(match.sansom > match.cooper) {
				currentLosingStreak++;
			}
			if(match.cooper > match.sansom){
				streaks.push({player:"Cooper", streak:currentLosingStreak});
				loser = "Sansom";
				currentLosingStreak = 1;
			}
			if(match.sansom === match.cooper){
				streaks.push({player:"Cooper", streak:currentLosingStreak});
				currentLosingStreak = 0;
				loser = "";
			}
		}
		else if(loser === "Sansom")
		{
			if(match.cooper > match.sansom) {
				currentLosingStreak++;
			}
			if(match.sansom > match.cooper){
				streaks.push({player:"Sansom", streak:currentLosingStreak});
				loser = "Cooper";
				currentLosingStreak = 1;
			}
			if(match.sansom === match.cooper){
				streaks.push({player:"Sansom", streak:currentLosingStreak});
				currentLosingStreak = 0;
				loser = "";
			}
		}
		else if(loser === "")
		{
			currentLosingStreak = 1;
			if(match.cooper > match.sansom) loser = "Sansom";
			if(match.sansom > match.cooper) loser = "Cooper";
		}	
	}
}

/* Functions for each trophy */

function TrophyComeuppanceCup(player, template, data)
{
	var details = {glyph: "fa fa-trophy",  isFa: true, title: "The Comeuppance Cup", desc: "Awarded to the player who has won the most matches", colour: "#ff9900"};
	
	if( player === "Sansom" && data.stats.Sansom_Matches_Won < data.stats.Cooper_Matches_Won) return "";
	if( player === "Cooper" && data.stats.Sansom_Matches_Won > data.stats.Cooper_Matches_Won) return "";
	
	//Trophy won by player
	return template(details);
}

function TrophyPingtarPlaque(player, template, data)
{
	var details = {glyph: "fa fa-shield", isFa: true, title: "The Pingtar Plaque", desc: "Awarded to the player who has won the most games", colour: "#ff9900"};
	
	if( player === "Sansom" && data.stats.Sansom_Games_Won < data.stats.Cooper_Games_Won) return "";
	if( player === "Cooper" && data.stats.Sansom_Games_Won > data.stats.Cooper_Games_Won) return "";
	
	//Trophy won by player
	return template(details);
}

function TrophyThomasTrophy(player, template, data)
{
	var details = {glyph: "fa fa-shield", isFa: true, title: "The Thomas Trophy", desc: "Awarded to the player for the dubious honour of being Briggsed the most times", colour: "#737373"};
	
	if( player === "Sansom" && data.stats.Sansom_Briggsings < data.stats.Cooper_Briggsings) return "";
	if( player === "Cooper" && data.stats.Sansom_Briggsings > data.stats.Cooper_Briggsings) return "";
	
	//Trophy won by player
	return template(details);
}

function TrophyKonigsbergCup(player, template, data)
{
	var details = {glyph: "fa fa-beer", isFa: true, title: "The Konigsberg Cup", desc: "Awarded to the player for the dubious honour of picking up the most Bridge cards", colour: "#737373"};
	
	if( player === "Sansom" && data.stats.Sansom_Bridge_Cards < data.stats.Cooper_Bridge_Cards) return "";
	if( player === "Cooper" && data.stats.Sansom_Bridge_Cards > data.stats.Cooper_Bridge_Cards) return "";
	
	//Trophy won by player
	return template(details);
}

function TrophyShafted(player, template, data)
{
	var details = {glyph: "fa fa-hand-grab-o", isFa: true, title: "Shafted", desc: "Was shafted and lost a match by over 5 games", colour: "#737373"};
	
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.cooper - match.sansom >= 5) return template(details);
		if(player === "Cooper" && match.sansom - match.cooper >= 5) return template(details);
	}

	//Trophy won by player
	return "";
}

function TrophyBlackHoleOfComeuppance(player, template, data)
{
	var details = {glyph: "fa fa-circle", isFa: true, title: "Black Hole of Comeuppance", desc: "Has lost a match by ten or more games, forming a singularity of Comeuppance which even light cannot escape.", colour: "#737373"};
	
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.cooper - match.sansom >= 10) return template(details);
		if(player === "Cooper" && match.sansom - match.cooper >= 10) return template(details);
	}

	//Trophy won by player
	return "";
}

function TrophyPingtarPrince(player, template, data)
{
	var details = {glyph: "fa fa-diamond", isFa: true, title: "Pingtar Prince", desc: "", colour: "#ff9900"};
	
	var wonBy;
	var winCount = 0;
	var date;
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(match.cooper > match.sansom)
		{
			if(match.cooper - match.sansom > winCount)
			{
				wonBy = "Cooper";
				winCount = match.cooper - match.sansom;
				date = match.date;
			}
		}
		
		if(match.sansom > match.cooper)
		{
			if(match.sansom - match.cooper > winCount)
			{
				wonBy = "Sansom";
				winCount = match.cooper - match.sansom;
				date = match.date;
			}
		}
	}
	
	if(player === wonBy)
	{
		details.desc = "For crippling their opponent with Comeuppance and winning the game by the most matches. Awarded on "  + date + " for winning by " + winCount + " matches.";
		return template(details);
	}
	
	return "";
}

function TrophyBridgeTooFar(player, template, data)
{
	var details = {glyph: "ban-circle", isFa: false, title: "A Bridge too far!", desc: "Has had more than three quarters of the bridge cards in a game", colour: "#737373"};
	
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(match.sansombridge === "") continue;
		var totalBridge = match.sansombridge + match.cooperbridge + match.tablebridge;
		if(player === "Sansom" && match.sansombridge/totalBridge > 0.75) return template(details);
		if(player === "Cooper" && match.cooperbridge/totalBridge > 0.75) return template(details);
	}
	return "";
}

function TrophyCloudOfComeuppance(player, template, data)
{
	var details = {glyph: "cloud", isFa: true, title: "Under the cloud of Comeuppance", desc: "Was under a cloud of Comeuppance by loosing 4 consecutive games", colour: "#737373"};

	for(var i = 0; i < streaks.length; i++)
	{
		if(streaks[i].streak >= 4 && player === streaks[i].player) return template(details);  
	}
	
	return "";
}

function TrophyShare(player, template, data)
{
	var details = {glyph: "fa fa-hand-stop-o", isFa: true, title: "The Kilroy Silk Share award", desc: "Won the highest number of games in a match", colour: "#ff9900"};

	var maxPlayer = "";
	var maxDate = "";
	var maxGames = 0;
	var shared = false;
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];

		if(match.sansom > maxGames)
		{	
			shared = false;	
			maxGames = match.sansom;
			maxPlayer = "Sansom";
			maxDate = match.date;

		}
		if(match.cooper > maxGames)
		{
			shared = false;
			maxGames = match.cooper;
			maxPlayer = "Cooper";
			maxDate = match.date;
		}
		if(match.cooper === maxGames)
		{
			if(maxPlayer === "Sansom") shared = true;
		}
		if(match.sansom === maxGames)
		{
			if(maxPlayer === "Cooper") shared = true;
		}
	}
	
	if(player === maxPlayer && !shared)
	{
		details.desc = "Won the most number of games in a match on " + maxDate + " winning " + maxGames + " games";
		return template(details); 
	}
	
	if(shared)
	{
		details.desc = "Tied for most number of wins in a match, winning " + maxGames + " games";
		details.title = "The Kilroy Silk Share award (Shared)"
		return template(details); 
	}
	
	return "";
}

function TrophyILiedTwice(player, template, data)
{
	var details = {glyph: "fa fa-hand-peace-o", isFa: true, title: "But I lied... twice", desc: "Managed to go two matches without being Briggsed", colour: "#ff9900"};

	var count = 0;
	var maxCount = 0;
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom")
		{
			if(match.sansombriggs === 0){
				count++;
				if(count > maxCount) maxCount = count;
			}
			else count = 0;
		}			
		else if(player === "Cooper")
		{
			if(match.cooperbriggs === 0){
				count++;
				if(count > maxCount) maxCount = count;
			}
			else count = 0;
		}	
	}
	
	if(maxCount >= 2) return template(details);
	else return "";
}

function TrophyHastingsAward(player, template, data)
{
	var details = {glyph: "fa fa-diamond", isFa: true, title: "The Hastings Award", desc: "Won 12 games in a match.", colour: "#ff9900"};

	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.sansom >= 12) return template(details)
		if(player === "Cooper" && match.cooper >= 12) return template(details)
	}
		
	return "";
}

function TrophyChampionYear(player,template,data,year)
{
	var html = "";
	
	var details = {glyph: "king", isFa: false, title: "Comeuppance King of " + year, desc: "Won the most matches in " + year, colour: "#ff9900"};
	var gameDetails = {glyph: "queen", isFa: false, title: "Comeuppance Qwa'ven of " + year, desc: "Won the most games in " + year, colour: "#ff9900"};
	
	var cooperWins = 0;
	var sansomWins = 0;
	var cooperGames = 0;
	var sansomGames = 0;
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if( match.date.substring(match.date.length - 4, match.date.length)*1 != year*1) continue;

		if(match.cooper > match.sansom) cooperWins++;
		else if(match.cooper < match.sansom) sansomWins++;
		cooperGames += match.cooper;
		sansomGames += match.sansom;
	}
	
	if(player==="Sansom" && sansomWins > cooperWins) html += template(details);
	if(player==="Sansom" && sansomGames > cooperGames) html += template(gameDetails);
	if(player==="Cooper" && cooperWins > sansomWins) html += template(details);
	if(player==="Cooper" && cooperGames > sansomGames) html += template(gameDetails);
	
	return html;
}







