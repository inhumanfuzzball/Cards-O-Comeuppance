var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxl425g7nwPAfSsH-Aw27RpwSYcLy5rSCfvt13vrgxhvBP5SOs/exec";

$(document).ready(function() {
    $.getJSON(SCRIPT_URL+"?callback=?",
		function (data) { refresh(data); });
});

function IncrementScore(column){
	
	// Disable input button
	var control = "#" + column + " > :button, #" + column + " > :input";
	$(control).attr("disabled", true);
	$(control).addClass("disabled");
	$.ajax({
        url: SCRIPT_URL+"?col="+column,
        type: "POST",
        crossDomain: true,
        dataType: "json",
        success:function(result){
            refresh(result);
			$(control).attr("disabled", false);
			$(control).removeClass("disabled");
        },
        error:function(xhr,status,error){
            alert(error);
        }
    });
	
	
}

function refresh(data){
	$("#GameDetails").text("Match: " + data.match + " Game: " + data.game);
	
	jQuery.each(data.scores, function(index, value) {
		var control = "#" + this.column + " > :input";
		$(control).val(this.value);
	});
	
	$("#SansomWin").text(data.stats.Sansom_Matches_Won);
	$("#CooperWin").text(data.stats.Cooper_Matches_Won);
	$("#Draws").text(data.stats.Draws);
	
	$("#SansomGameWin").text(data.stats.Sansom_Games_Won);
	$("#CooperGameWin").text(data.stats.Cooper_Games_Won);
	$("#TableGameWin").text(data.stats.Table_Games_Won);
	
	$("#SansomBridge").text(data.stats.Sansom_Bridge_Cards);
	$("#CooperBridge").text(data.stats.Cooper_Bridge_Cards);
	$("#TableBridge").text(data.stats.Table_Bridge_Cards);
	
	$("#SansomBriggs").text(data.stats.Sansom_Briggsings);
	$("#CooperBriggs").text(data.stats.Cooper_Briggsings);
	$("#TableBriggs").text(data.stats.Table_Briggsings);
	
	$("#GamesPlayed").text(data.stats.Games_Played);
	$("#MatchesPlayed").text(data.stats.Matches_Played);
		
}