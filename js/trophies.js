var streaks = [];
var winningStreaks = [];
var GOLD = "#ff9900";
var GASH = "#737373";

//Trophies
function buildTrophies(data)
{
	var trophies = [
	"TrophyComeuppanceCup",
	"TrophyPingtarPlaque",
	"TrophyThomasTrophy",	
	"TrophyKonigsbergCup"];
	
	var trophiesShare = [
	"TrophyPingtarPrince",
	"TrophyShare",
	"TrophyNoComeuppance",
	"TrophyComeuppanceSpree",
	"TrophyTeletext",
	"TrophyTollFree",
	"TrophyILiedTwice",
	"TrophyHatTrick",	
	"TrophyHastingsAward"];
	
	var trophiesShaft = [
	"TrophyShafted",
	"TrophyBeelzebuerkStrikes",
	"TrophyBlackHoleOfComeuppance",
	"TrophyBridgeTooFar",
	"TrophyCloudOfComeuppance",
	"TrophyCrippled",
	"TrophyCrippledBurnt",
	"TrophyPileOfComeuppance"];
	
	
	var source = $("#entry-template").html();
	var template = Handlebars.compile(source);
	
	calculateLosingStreaks(data);
	calculateWinningStreaks(data);
	
	$("#sansom-trophies-year").empty();
	$("#cooper-trophies-year").empty();
	$("#sansom-trophies-alltime").empty();
	$("#cooper-trophies-alltime").empty();
	$("#sansom-trophies-share").empty();
	$("#cooper-trophies-share").empty();
	$("#sansom-trophies-shaft").empty();
	$("#cooper-trophies-shaft").empty();
	
	
	for(var i = START_YEAR; i < new Date().getFullYear(); i++)
	{
		$("#sansom-trophies-year").append(TrophyChampionYear("Sansom",template, data, i));
		$("#cooper-trophies-year").append(TrophyChampionYear("Cooper",template, data, i));
	}		
	
	for(var i = START_YEAR; i < new Date().getFullYear(); i++)
	{
		$("#sansom-trophies-year").append(TrophyLoserYear("Sansom",template, data, i));
		$("#cooper-trophies-year").append(TrophyLoserYear("Cooper",template, data, i));
	}
	
	var sansomHtml = "";
	var cooperHtml = "";
	for(var i = 0; i < trophies.length; i++)
	{
		sansomHtml += window[trophies[i]]("Sansom",template, data);
		cooperHtml += window[trophies[i]]("Cooper",template, data);
	}
	if(sansomHtml === "") sansomHtml = "<p>Nothing to see here</p>";
	if(cooperHtml === "") cooperHtml = "<p>Nothing to see here</p>";
		
	$("#sansom-trophies-alltime").append(sansomHtml);
	$("#cooper-trophies-alltime").append(cooperHtml);
	
	for(var i = 0; i < trophiesShare.length; i++)
	{
		$("#sansom-trophies-share").append(window[trophiesShare[i]]("Sansom",template, data));
		$("#cooper-trophies-share").append(window[trophiesShare[i]]("Cooper",template, data));
	}
	
	for(var i = 0; i < trophiesShaft.length; i++)
	{
		$("#sansom-trophies-shaft").append(window[trophiesShaft[i]]("Sansom",template, data));
		$("#cooper-trophies-shaft").append(window[trophiesShaft[i]]("Cooper",template, data));
	}
}

function calculateWinningStreaks(data)
{
	winningStreaks = [];
	var winner = "";
	var currentWinningStreak = 0;
	
	
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(winner === "Cooper")
		{
			if(match.cooper > match.sansom && match.cooper > match.table) {
				currentWinningStreak++;
			}
			if(match.sansom > match.cooper){
				winningStreaks.push({player:"Cooper", streak:currentWinningStreak});
				winner = "Sansom";
				currentWinningStreak = 1;
			}
			if(match.sansom === match.cooper || match.table > match.cooper){
				streaks.push({player:"Cooper", streak:currentWinningStreak});
				currentWinningStreak = 0;
				winner = "";
			}
		}
		else if(winner === "Sansom")
		{
			if(match.sansom > match.cooper && match.sansom > match.table) {
				currentWinningStreak++;
			}
			if(match.cooper > match.sansom){
				winningStreaks.push({player:"Sansom", streak:currentWinningStreak});
				winner = "Cooper";
				currentWinningStreak = 1;
			}
			if(match.sansom === match.cooper || match.table > match.sansom){
				winningStreaks.push({player:"Sansom", streak:currentWinningStreak});
				currentWinningStreak = 0;
				winner = "";
			}
		}
		else if(winner === "")
		{
			currentWinningStreak = 1;
			if(match.cooper > match.sansom && match.cooper >= match.table) winner = "Cooper";
			if(match.sansom > match.cooper && match.sansom >= match.table) winner = "Sansom";
		}	
	}
	winningStreaks.push({player:winner, streak:currentWinningStreak});
}

function calculateLosingStreaks(data)
{
	streaks = []
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
		var details = {
			glyph: "fa fa-hand-grab-o",  
			title: "Shafted", 
			desc: "Lost a match by over five games.", 
			colour: "rubbish",
			count: count};
		returnText = template(details);
	}
	
	if(count > 4)
	{
		var details = {
			glyph: "fa fa-hand-grab-o",  
			title: "A Shaft of Shafts", 
			desc: "Collected five Shafted trophies", 
			colour: "rubbish"};
		returnText += template(details);
	}
	
	if(count > 9)
	{
		var details = {
			glyph: "fa fa-hand-grab-o",  
			title: "The Golden Shaft", 
			desc: "Collected ten Shafted trophies", 
			colour: "rubbish"};
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
			if(match.cooper - match.sansom === winCount)
			{
				wonBy = "Both";
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
			if(match.sansom - match.cooper === winCount)
			{
				wonBy = "Both";
			}
		}
	}
	
	if(player === wonBy)
	{
		details.desc = "Won by the highest winning margin. Awarded on "  + date + " for winning by " + winCount + " matches.";
		return template(details);
	}
	
	if(wonBy === "Both")
	{
		if(player === "Cooper") details.title = "Pingtar Prince (Shafted)"
		if(player === "Sansom") details.title = "Pingtar Prince (Shared)"
		details.desc = "Joint winner by the highest winning margin. Winning by " + winCount + " matches.";
		return template(details);
	}
	
	return "";
}

function TrophyBridgeTooFar(player, template, data)
{
	var details = {glyph: "fa fa-ban", title: "A Bridge too far!", desc: "Has had more than 3/4 of the bridge cards in a game.", colour: "rubbish"};
	
	var count = 0;
	
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		// Ignore games with no bridge cards
		if(match.sansombridge === "") continue;
		
		var totalBridge = match.sansombridge + match.cooperbridge + match.tablebridge;
		if(player === "Sansom" && match.sansombridge/totalBridge > 0.75) count++;
		if(player === "Cooper" && match.cooperbridge/totalBridge > 0.75) count++; 
	}
	
	if(count > 0)
	{
		details.desc = "Has had more than 3/4 of the bridge cards in a game.";
		details.count = count;
		return template(details);
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
		details.title = "The Kilroy award (Shared)"
		return template(details); 
	}
	
	return "";
}

function TrophyTeletext(player, template, data)
{
	var details = {glyph: "fa fa-cc", title: "888 Teletext Award", desc: "Got no Briggsings in a match.", colour: "silver"};
	var count = 0;
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.sansombriggs === 0) count++	
		else if(player === "Cooper" && match.cooperbriggs === 0) count++;	
	}
	
	details.count = count;
	if(count > 0) return template(details);
	else return "";
}

function TrophyTollFree(player, template, data)
{
	var details = {glyph: "fa fa-smile-o", title: "Toll Free", desc: "Got no bridge cards in a match.", colour: "silver"};
	var count = 0;
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.sansombridge === 0) count++;
		else if(player === "Cooper" && match.cooperbridge === 0) count++;
	}

	details.count = count;
	if(count > 0) return template(details);
	else return "";
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
	var details = {glyph: "fa fa-diamond", title: "The Hastings Award", desc: "Won 12 games in a match.", colour: "silver"};

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
	var count = 0;
	var dates = "";
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.sansom < match.cooper && match.sansom < match.table) count++;
		if(player === "Cooper" && match.cooper < match.sansom && match.cooper < match.table) count++;
	}
		
	if(count > 0)
	{
		switch(count)
		{
			case 1:
			case 2:
			case 3:
			case 4:
				details.title = count + (count === 1 ? " pile " : " piles ") + "of comeuppance";
				break;
			case 5:
				details.title = "A mound of comeuppance";
				break;
			case 6:
				details.title = "A hill of comeuppance";
				break;
			case 7:
				details.title = "A mountain of comeuppance";
				break;
			case 8:
				details.title = "A island of comeuppance";
				break;
			case 9:
				details.title = "An continent of comeuppance";
				break;
			case 10:
				details.title = "A super-continent of comeuppance";
				break;
			case 11:
				details.title = "A planet of comeuppance";
				break;
			case 12:
				details.title = "A star of comeuppance";
				break;
			case 13:
				details.title = "A galaxy of comeuppance";
				break;
			default:
				details.title = "A universe of comeuppance";
				details.glyph = "fa fa-sun-o fa-spin";
				break;
		}
		
		details.desc = "Has come third in a match";
		details.count = count;
		return template(details);
	}
		
	return "";
}

function TrophyComeuppanceSpree(player,template,data)
{
	var count = 0;
	var count3 = 0;
	var count4 = 0;
	var count5 = 0;
	var count6 = 0
	
	for(var i = 0; i < winningStreaks.length; i++)
	{
		if(winningStreaks[i].streak >= 2 && player !== streaks[i].player) count++;
		if(winningStreaks[i].streak >= 3 && player !== streaks[i].player) count3++;
		if(winningStreaks[i].streak >= 4 && player !== streaks[i].player) count4++;
		if(winningStreaks[i].streak >= 5 && player !== streaks[i].player) count5++;	
		if(winningStreaks[i].streak >= 6 && player !== streaks[i].player) count6++;			
	}
	
	var html = "";
	
	if(count > 0)
	{
		var details = {glyph: "fa fa-fire", title: "Comeuppance Spree", desc: "Won two matches in a row", colour: "silver"};
		details.count = count;
		html += template(details)
	}
	
	if(count3 > 0)
	{
		var details = {glyph: "fa fa-fire", title: "Comeuppance Rampage", desc: "Won three matches in a row", colour: "silver"};
		details.count = count3;
		html += template(details)
	}
	
	if(count4 > 0)
	{
		var details = {glyph: "fa fa-fire", title: "Dominating", desc: "Won four matches in a row", colour: "silver"};
		details.count = count4;
		html += template(details)
	}
	
	if(count5 > 0)
	{
		var details = {glyph: "fa fa-fire", title: "Unstoppable", desc: "Won five matches in a row", colour: "gold"};
		details.count = count5;
		html += template(details)
	}
	
	if(count6 > 0)
	{
		var details = {glyph: "fa fa-fire", title: "GODLIKE!", desc: "Won six matches in a row", colour: "gold"};
		details.count = count6;
		html += template(details)
	}
	
	return html;
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
		var details = {glyph: "fa fa-star-half-o", title: "Double Comeuppance", desc: "Beat their opponent two matches in a row", colour: "silver"};
		details.count = count;
		html += template(details)
	}
	
	if(count3 > 0)
	{
		var details = {glyph: "fa fa-star", title: "Multi Comeuppance", desc: "Beat their opponent three matches in a row", colour: "silver"};
		details.count = count3;
		html += template(details)
	}
	
	if(count4 > 0)
	{
		var details = {glyph: "fa fa-fighter-jet", title: "Mega Comeuppance", desc: "Beat their opponent four matches in a row", colour: "silver"};
		details.count = count4;
		html += template(details)
	}
	
	if(count5 > 0)
	{
		var details = {glyph: "fa fa-rocket", title: "ULTRA COMEUPPANCE!", desc: "Beat their opponent five matches in a row", colour: "gold"};
		details.count = count5;
		html += template(details)
	}
	
	if(count6 > 0)
	{
		var details = {glyph: "fa fa-space-shuttle", title: "M-M-M-MONSTER COMEUPPANCE!!!", desc: "UNSTOPPABLE! Beat their opponent six matches in a row", colour: "gold"};
		details.count = count6;
		html += template(details)
	}
	
	return html;
}

function TrophyHatTrick(player,template,data)
{
	var details = {glyph: "fa fa-magic", title: "Hat-trick", desc: "Had the most game wins, bridge cards and Briggsings in a match", colour: "silver"};

	var count = 0;
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(	player === "Sansom" && 
			(match.sansom > match.cooper && match.sansom > match.table) &&
			(match.sansombriggs > match.cooperbriggs && match.sansombriggs > match.tablebriggs) &&
			(match.sansombridge > match.cooperbridge && match.sansombridge > match.tablebridge) )
		{
			count++;
		}
		
		if(	player === "Cooper" && 
			(match.cooper > match.sansom && match.cooper > match.table) &&
			(match.cooperbriggs > match.sansombriggs && match.cooperbriggs > match.tablebriggs) &&
			(match.cooperbridge > match.sansombridge && match.cooperbridge > match.tablebridge) )
		{
			count++;
		}
	}
	
	if(count > 0){
		details.count = count;
		return template(details)
	}
	
	return "";
}

function TrophyBeelzebuerkStrikes(player,template,data)
{
	var details = {glyph: "fa fa-bolt", title: "Beelzebuerk Strikes", desc: "Didn't win a single game!", colour: "rubbish"};
	var count = 0;
	for(var i = 0; i < data.matches.length; i++)
	{
		var match = matches[i];
		if(player === "Sansom" && match.sansom === 0) count++;
		if(player === "Cooper" && match.cooper === 0) count++;
	}
	
	if(count > 0){
		details.count = count;
		return template(details)
	}
}

function TrophyChampionYear(player,template,data,year)
{
	var html = "";
	
	var details = {glyph: "fa fa-trophy", title: "Comeuppance King of " + year, desc: "Won the most matches in " + year, colour: "gold"};
	var gameDetails = {glyph: "fa fa-trophy", title: "Comeuppance Qwa'ven of " + year, desc: "Won the most games in " + year, colour: "gold"};
	
	if(player==="Sansom" && yearScores[year].sansomWins > yearScores[year].cooperWins) html += template(details);
	if(player==="Cooper" && yearScores[year].cooperWins > yearScores[year].sansomWins) html += template(details);	
	
	if(player==="Sansom" && yearScores[year].sansomGames > yearScores[year].cooperGames) html += template(gameDetails);
	if(player==="Cooper" && yearScores[year].cooperGames > yearScores[year].sansomGames) html += template(gameDetails);

	return html;
}

function TrophyLoserYear(player,template,data,year)
{
	var html = "";
	
	var briggsDetails = {glyph: "fa fa-thumbs-o-down", title: "Comeuppance Briggs of " + year, desc: "Briggsed the most in " + year, colour: "rubbish"};
	var bridgeDetails = {glyph: "fa fa-thumbs-o-down", title: "Comeuppance Kilroy of " + year, desc: "Had the most bridge cards in " + year, colour: "rubbish"};
	
	if(player==="Sansom" && yearScores[year].sansomBridge > yearScores[year].cooperBridge) html += template(bridgeDetails);
	if(player==="Cooper" && yearScores[year].cooperBridge > yearScores[year].sansomBridge) html += template(bridgeDetails);
	
	if(player==="Sansom" && yearScores[year].sansomBriggs > yearScores[year].cooperBriggs) html += template(briggsDetails);
	if(player==="Cooper" && yearScores[year].cooperBriggs > yearScores[year].sansomBriggs) html += template(briggsDetails);
	

	return html;
}

function NumberToWords(number)
{
	if (number === 1) return "once";
	if (number === 2) return "twice";
	if (number > 2) return number + " times";
}







