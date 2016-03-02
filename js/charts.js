function doCharts()
{
    var sansomGames = ['Sansom'];
    var cooperGames = ['Cooper'];
	var tableGames = ['Table'];
	
	var sansomCumulativeGames = ['Sansom'];
    var cooperCumulativeGames = ['Cooper'];
	var tableCumulativeGames = ['Table'];
    
	var sansomCounter = 0;
	var cooperCounter = 0;
	var tableCounter = 0;
    for(var i = 0; i < matches.length; i++){
    	sansomGames.push(matches[i].sansom);
		cooperGames.push(matches[i].cooper);
		tableGames.push(matches[i].table);
		
		sansomCounter += matches[i].sansom;
		cooperCounter += matches[i].cooper;
		tableCounter += matches[i].table;
		
		sansomCumulativeGames.push(sansomCounter);
		cooperCumulativeGames.push(cooperCounter);
		tableCumulativeGames.push(tableCounter);
    }
    
	var chart = c3.generate({
		bindto: "#chartCumulativeGames",	
		data: {
			columns: [
				sansomCumulativeGames,
				cooperCumulativeGames,
				tableCumulativeGames
			]
		}
	});
	
	// All time scores
	renderPie('#chartMatches', [['Sansom', stats.Sansom_Matches_Won],
								['Cooper', stats.Cooper_Matches_Won],
								['Table', stats.Table_Matches_Won],]);
	
	renderPie('#chartGames', [['Sansom', stats.Sansom_Games_Won],
							  ['Cooper', stats.Cooper_Games_Won],
							  ['Table', stats.Table_Games_Won],]);
							  
	renderPie('#chartBridge', [['Sansom', stats.Sansom_Bridge_Cards],
								['Cooper', stats.Cooper_Bridge_Cards],
								['Table', stats.Table_Bridge_Cards],]);
	
	renderPie('#chartBriggs', [['Sansom', stats.Sansom_Briggsings],
							  ['Cooper', stats.Cooper_Briggsings],
							  ['Table', stats.Table_Briggsings],]);
				
				
	// Year scores						
	renderPie('#chartYearMatches',  [['Sansom', sansomYearMatches],
									['Cooper',  cooperYearMatches],
									['Table',   tableYearMatches],]);

	renderPie('#chartYearGames', [['Sansom', sansomYearGames],
								 ['Cooper',  cooperYearGames],
							     ['Table',   tableYearGames],]);
							  
	renderPie('#chartYearBridge', [['Sansom', sansomYearBridge],
								  ['Cooper',  cooperYearBridge],
								  ['Table',   tableYearBridge],]);
	
	renderPie('#chartYearBriggs', [['Sansom',  sansomYearBriggs],
							      ['Cooper',   cooperYearBriggs],
							      ['Table',    tableYearBriggs],]);
	

}

function renderPie(id, columns){

	var chart = c3.generate({
		bindto: id,	
		data: {		
			columns: columns,
			type : 'pie',
			onclick: function (d, i) { console.log("onclick", d, i); },
			onmouseover: function (d, i) { console.log("onmouseover", d, i); },
			onmouseout: function (d, i) { console.log("onmouseout", d, i); }
		}
    });
}