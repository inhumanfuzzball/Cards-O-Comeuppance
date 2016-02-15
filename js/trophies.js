var streaks = [];
var GOLD = "#ff9900";
var GASH = "#737373";

//Trophies
function buildTrophies(data)
{
	var trophies = [
	"TrophyComeuppanceCup",
	"TrophyPingtarPlaque",
	"TrophyPingtarPrince",
	"TrophyShare",
	"TrophyNoComeuppance",
	"TrophyILiedTwice",	
	"TrophyHastingsAward",
	"TrophyThomasTrophy",
	"TrophyKonigsbergCup",
	"TrophyShafted",
	"TrophyBlackHoleOfComeuppance",
	"TrophyBridgeTooFar",
	"TrophyCloudOfComeuppance",
	"TrophyCrippled",
	"TrophyCrippledBurnt",
	"TrophyPileOfComeuppance"];
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
	
	for(var i = 2014; i < new Date().getFullYear(); i++)
	{
		$("#sansom-trophies").append(TrophyLoserYear("Sansom",template, data, i));
		$("#cooper-trophies").append(TrophyLoserYear("Cooper",template, data, i));
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
	streaks.push({player:loser, streak:currentLosingStreak});
	
}

/* Functions for each trophy */

function TrophyComeuppanceCup(player, template, data)
{
	var details = {glyph: "fa fa-trophy", title: "The Comeuppance Cup", desc: "Awarded to the player who has won the most matches", colour: "gold"};
	
	if( player === "Sansom" && data.stats.Sansom_Matches_Won < data.stats.Cooper_Matches_Won) return "";
	if( player === "Cooper" && data.stats.Sansom_Matches_Won > data.stats.Cooper_Matches_Won) return "";
	
	return template(details);
}

function TrophyPingtarPlaque(player, template, data)
{
	var details = {glyph: "fa fa-shield",  title: "The Pingtar Plaque", desc: "Awarded to the player who has won the most games", colour: "gold"};
	
	if( player === "Sansom" && data.stats.Sansom_Games_Won < data.stats.Cooper_Games_Won) return "";
	if( player === "Cooper" && data.stats.Sansom_Games_Won > data.stats.Cooper_Games_Won) return "";
	
	return template(details);
}

function TrophyThomasTrophy(player, template, data)
{
	var details = {glyph: "fa fa-shield",  title: "The Thomas Trophy", desc: "Awarded to the player for the dubious honour of being Briggsed the most times", colour: "rubbish"};
	
	if( player === "Sansom" && data.stats.Sansom_Briggsings < data.stats.Cooper_Briggsings) return "";
	if( player === "Cooper" && data.stats.Sansom_Briggsings > data.stats.Cooper_Briggsings) return "";
	
	return template(details);
}

function TrophyKonigsbergCup(player, template, data)
{
	var details = {glyph: "fa fa-beer", title: "The Konigsberg Cup", desc: "Awarded to the player for the dubious honour of picking up the most Bridge cards", colour: "rubbish"};
	
	if( player === "Sansom" && data.stats.Sansom_Bridge_Cards < data.stats.Cooper_Bridge_Cards) return "";
	if( player === "Cooper" && data.stats.Sansom_Bridge_Cards > data.stats.Cooper_Bridge_Cards) return "";
	
	return template(details);
}

function TrophyShafted(player, template, data)
{
	var returnText = "";

	var count = 0;
	
	
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.cooper - match.sansom >= 5) count++ 
		if(player === "Cooper" && match.sansom - match.cooper >= 5) count++;
	}
	
	if(count > 0)
	{
		var details = {glyph: "fa fa-hand-grab-o",  title: "Shafted", desc: "Lost a match by over five games. Awarded " + NumberToWords(count), colour: "rubbish"};
		returnText = template(details);
	}
	
	if(count > 5)
	{
		var details = {glyph: "fa fa-hand-grab-o",  title: "A Shaft of Shafts", desc: "Collected five Shafted trophies", colour: "rubbish"};
		returnText += template(details);
	}
	
	if(count > 10)
	{
		var details = {glyph: "fa fa-hand-grab-o",  title: "The Golden Shaft", desc: "Collected ten Shafted trophies", colour: "rubbish"};
		returnText += template(details);
	}
	
	return returnText;
}

function TrophyBlackHoleOfComeuppance(player, template, data)
{
	var details = {glyph: "fa fa-circle", title: "Black Hole of Comeuppance", desc: "Has lost a match by ten or more games, forming a singularity of Comeuppance which even light cannot escape.", colour: "rubbish"};
	
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.cooper - match.sansom >= 10) return template(details);
		if(player === "Cooper" && match.sansom - match.cooper >= 10) return template(details);
	}

	return "";
}

function TrophyPingtarPrince(player, template, data)
{
	var details = {glyph: "fa fa-diamond", title: "Pingtar Prince", desc: "", colour: "silver"};
	
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
		details.desc = "Won by the highest winning margin. Awarded on "  + date + " for winning by " + winCount + " matches.";
		return template(details);
	}
	
	return "";
}

function TrophyBridgeTooFar(player, template, data)
{
	var details = {glyph: "fa fa-ban", title: "A Bridge too far!", desc: "Has had more than three quarters of the bridge cards in a game", colour: "rubbish"};
	
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
	var details = {glyph: "fa fa-cloud", title: "Under the cloud of Comeuppance", desc: "Was under a cloud of Comeuppance by loosing 4 consecutive games", colour: "rubbish"};

	for(var i = 0; i < streaks.length; i++)
	{
		if(streaks[i].streak >= 4 && player === streaks[i].player) return template(details);  
	}
	
	return "";
}

function TrophyShare(player, template, data)
{
	var details = {glyph: "fa fa-hand-stop-o", title: "The Kilroy Silk Award", desc: "Won the highest number of games in a match", colour: "silver"};

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
	var details = {glyph: "fa fa-hand-peace-o", title: "But I lied... twice", desc: "Managed to go two matches without being Briggsed", colour: "silver"};

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
	var details = {glyph: "fa fa-diamond", title: "The Hastings Award", desc: "Won 12 games in a match.", colour: "rubbish"};

	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.sansom >= 12) return template(details)
		if(player === "Cooper" && match.cooper >= 12) return template(details)
	}
		
	return "";
}

function TrophyCrippled(player,template,data)
{
	var details = {glyph: "fa fa-ambulance", title: "Crippled", desc: "Had more than five briggsings in a match", colour: "rubbish"};

	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.sansombriggs >= 5) return template(details)
		if(player === "Cooper" && match.cooperbriggs >= 5) return template(details)
	}
		
	return "";
}

function TrophyCrippledBurnt(player,template,data)
{
	var details = {glyph: "fa fa-fire-extinguisher", title: "Crippled and Burnt", desc: "Had more than eight briggsings in a match", colour: "rubbish"};

	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.sansombriggs >= 8) return template(details)
		if(player === "Cooper" && match.cooperbriggs >= 8) return template(details)
	}
		
	return "";
}

function TrophyPileOfComeuppance(player,template,data)
{
	var details = {glyph: "fa fa-bomb", title: "Pile of Comeuppance", desc: "Came third in a match", colour: "rubbish"};

	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.sansom < match.cooper && match.sansom < match.table) return template(details)
		if(player === "Cooper" && match.cooper < match.sansom && match.cooper < match.table) return template(details)
	}
		
	return "";
}

function TrophyNoComeuppance(player,template,data)
{
	var count = 0;
	var count3 = 0;
	var count4 = 0;
	var count5 = 0;
	var count6 = 0;
	for(var i = 0; i < streaks.length; i++)
	{
		if(streaks[i].streak >= 2 && player !== streaks[i].player) count++;
		if(streaks[i].streak >= 3 && player !== streaks[i].player) count3++;
		if(streaks[i].streak >= 4 && player !== streaks[i].player) count4++;
		if(streaks[i].streak >= 5 && player !== streaks[i].player) count5++;	
		if(streaks[i].streak >= 6 && player !== streaks[i].player) count6++;			
	}
	
	var html = "";
	
	if(count > 0)
	{
		var details = {glyph: "fa fa-star-half-o", title: "Double Comeuppance", desc: "Won two matches in a row. Awarded " + NumberToWords(count), colour: "silver"};
		html += template(details)
	}
	
	if(count3 > 0)
	{
		var details = {glyph: "fa fa-star", title: "Multi Comeuppance", desc: "Won three matches in a row. Awarded "  + NumberToWords(count3), colour: "silver"};
		html += template(details)
	}
	
	if(count4 > 0)
	{
		var details = {glyph: "fa fa-fighter-jet", title: "Mega Comeuppance", desc: "Won four matches in a row. Awarded "  + NumberToWords(count4), colour: "gold"};
		html += template(details)
	}
	
	if(count5 > 0)
	{
		var details = {glyph: "fa fa-rocket", title: "ULTRA COMEUPPANCE!", desc: "Won five matches in a row. Awarded " + NumberToWords(count5), colour: "gold"};
		html += template(details)
	}
	
	if(count6 > 0)
	{
		var details = {glyph: "fa fa-space-shuttle", title: "M-M-M-MONSTER COMEUPPANCE!!!", desc: "UNSTOPPABLE! Won six matches in a row. Awarded " + NumberToWords(count6), colour: "gold"};
		html += template(details)
	}
	
	return html;
}

function TrophyChampionYear(player,template,data,year)
{
	var html = "";
	
	var details = {glyph: "fa fa-trophy", title: "Comeuppance King of " + year, desc: "Won the most matches in " + year, colour: "gold"};
	var gameDetails = {glyph: "fa fa-trophy", title: "Comeuppance Qwa'ven of " + year, desc: "Won the most games in " + year, colour: "gold"};
	
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

function TrophyLoserYear(player,template,data,year)
{
	var html = "";
	
	var briggsDetails = {glyph: "fa fa-thumbs-o-down", title: "Comeuppance Briggs of " + year, desc: "Briggsed the most in " + year, colour: "rubbish"};
	var bridgeDetails = {glyph: "fa fa-thumbs-o-down", title: "Comeuppance Kilroy of " + year, desc: "Had the most bridge cards in " + year, colour: "rubbish"};
	
	var cooperBridge = 0;
	var sansomBridge = 0;
	var cooperBriggs = 0;
	var sansomBriggs = 0;
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if( match.date.substring(match.date.length - 4, match.date.length)*1 != year*1) continue;

		cooperBriggs += match.cooperbriggs;
		sansomBriggs += match.sansombriggs;
		cooperBridge += match.cooperbridge;
		sansomBridge += match.sansombridge;
	}
	
	if(player==="Sansom" && sansomBriggs > cooperBriggs) html += template(briggsDetails);
	if(player==="Sansom" && sansomBridge > cooperBridge) html += template(bridgeDetails);
	if(player==="Cooper" && cooperBriggs > sansomBriggs) html += template(briggsDetails);
	if(player==="Cooper" && cooperBridge > sansomBridge) html += template(bridgeDetails);
	
	return html;
}

function NumberToWords(number)
{
	if (number === 1) return "once";
	
	if (number === 2) return "twice";
	
	if (number > 2) return number + " times";
}







