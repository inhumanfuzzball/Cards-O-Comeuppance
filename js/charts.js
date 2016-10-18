function doCharts()
{
	var gameStats;
	
    var sansomGamesChart = ['Sansom'];
    var cooperGamesChart = ['Cooper'];
	var tableGamesChart = ['Table'];
	
	var sansomMatchBriggs = 0;
	var sansomMatchBridge = 0;
	var cooperMatchBriggs = 0;
	var cooperMatchBridge = 0;
	var _tableMatchBriggs = 0;
	var _tableMatchBridge = 0;
	
	var sansomCumulativeGames = ['Sansom', null];
    var cooperCumulativeGames = ['Cooper', null];
	var tableCumulativeGames = ['Table', null];
	
	var sansomCumulativeMatches = ['Sansom', null];
    var cooperCumulativeMatches = ['Cooper', null];
	var tableCumulativeMatches = ['Table', null];
	var drawCumulativeMatches = ['Draw', null];
	
	var sansomCumulativeBriggs = ['Sansom', null];
    var cooperCumulativeBriggs = ['Cooper', null];
	var _tableCumulativeBriggs = ['Table', null];
	
	var sansomCumulativeBridge = ['Sansom', null];
    var cooperCumulativeBridge = ['Cooper', null];
	var _tableCumulativeBridge = ['Table', null];
    
	var sansomCounter = 0;
	var cooperCounter = 0;
	var tableCounter = 0;
	
	var sansomMatchCounter = 0;
	var cooperMatchCounter = 0;
	var tableMatchCounter = 0;
	var drawMatchCounter = 0;

	var sansomBriggsCounter = 0;
	var cooperBriggsCounter = 0;
	var _tableBriggsCounter = 0;
	
	var sansomBridgeCounter = 0;
	var cooperBridgeCounter = 0;
	var _tableBridgeCounter = 0;
	
    for(var i = 0; i < matches.length; i++){

    	sansomGamesChart.push(matches[i].sansom);
		cooperGamesChart.push(matches[i].cooper);
		tableGamesChart.push(matches[i].table);
		
		sansomCounter += matches[i].sansom;
		cooperCounter += matches[i].cooper;
		tableCounter += matches[i].table;
		sansomCumulativeGames.push(sansomCounter);
		cooperCumulativeGames.push(cooperCounter);
		tableCumulativeGames.push(tableCounter);		
		
		sansomBriggsCounter += (matches[i].sansombriggs * 1);
		cooperBriggsCounter += (matches[i].cooperbriggs * 1);
		_tableBriggsCounter += (matches[i].tablebriggs * 1);
		sansomCumulativeBriggs.push(sansomBriggsCounter);
		cooperCumulativeBriggs.push(cooperBriggsCounter);
		_tableCumulativeBriggs.push(_tableBriggsCounter);	
		
		sansomBridgeCounter += (matches[i].sansombridge * 1);
		cooperBridgeCounter += (matches[i].cooperbridge * 1);
		_tableBridgeCounter += (matches[i].tablebridge * 1);
		sansomCumulativeBridge.push(sansomBridgeCounter);
		cooperCumulativeBridge.push(cooperBridgeCounter);
		_tableCumulativeBridge.push(_tableBridgeCounter);	

		if(matches[i].sansom > matches[i].cooper && matches[i].sansom > matches[i].table) sansomMatchCounter++;
		else if(matches[i].cooper > matches[i].sansom && matches[i].cooper > matches[i].table) cooperMatchCounter++;
		else if(matches[i].table > matches[i].sansom && matches[i].table > matches[i].cooper) tableMatchCounter++;
		else if(matches[i].sansom === matches[i].cooper) drawMatchCounter++;
		
		sansomCumulativeMatches.push(sansomMatchCounter);
		cooperCumulativeMatches.push(cooperMatchCounter);
		tableCumulativeMatches.push(tableMatchCounter);
		drawCumulativeMatches.push(drawMatchCounter);
		
		if(matches[i].sansombriggs > matches[i].cooperbriggs && matches[i].sansombriggs > matches[i].tablebriggs)
			sansomMatchBriggs++;
		if(matches[i].cooperbriggs > matches[i].sansombriggs && matches[i].cooperbriggs > matches[i].tablebriggs)
			cooperMatchBriggs++;
		if(matches[i].tablerbriggs > matches[i].sansombriggs && matches[i].tablebriggs > matches[i].cooperbriggs)
			_tableMatchBriggs++;
		
		if(matches[i].sansombridge > matches[i].cooperbridge && matches[i].sansombridge > matches[i].tablebridge)
			sansomMatchBridge++;
		if(matches[i].cooperbridge > matches[i].sansombridge && matches[i].cooperbridge > matches[i].tablebridge)
			cooperMatchBridge++;
		if(matches[i].tablerbridge > matches[i].sansombridge && matches[i].tablebridge > matches[i].cooperbridge)
			_tableMatchBridge++;
    }
	
    renderBar('#chartGamesBar', [sansomGamesChart,cooperGamesChart,tableGamesChart]);

	renderLine('#chartCumulativeGames', [sansomCumulativeGames,cooperCumulativeGames,tableCumulativeGames]);
	
	renderLine('#chartCumulativeMatches', [sansomCumulativeMatches,cooperCumulativeMatches,tableCumulativeMatches,drawCumulativeMatches]);
	
	renderLine('#chartCumulativeBriggs', [sansomCumulativeBriggs,cooperCumulativeBriggs,_tableCumulativeBriggs]);
		
	renderLine('#chartCumulativeBridge', [sansomCumulativeBridge,cooperCumulativeBridge,_tableCumulativeBridge]);
		
	// All time scores
	renderPie('#chartMatches', [['Sansom', scores.sansomMatches],
								['Cooper', scores.cooperMatches],
								['Table', scores.tableMatches],
							    ['Draw', scores.drawMatches]]);
		
	renderPie('#chartGames', [['Sansom', scores.sansomGames],
							  ['Cooper', scores.cooperGames],
							  ['Table', scores.tableGames]]);
							  
	renderPie('#chartBridge', [['Sansom', scores.sansomBridge],
								['Cooper', scores.cooperBridge],
								['Table', scores.tableBridge]]);

	renderPie('#chartBriggs', [['Sansom', scores.sansomBriggs],
							  ['Cooper', scores.cooperBriggs],
							  ['Table', scores.tableBriggs]]);
							  
		
	var source = $("#year-chart-template").html();
	var template = Handlebars.compile(source);
	$('#YearCharts').empty();
	
	var currentYear = new Date().getFullYear()*1;
	for(var year = currentYear; year >= START_YEAR; year--)
	{
		$("#YearCharts").append(template({year: year}));
		
		renderPie('#chart'+year+'Matches',  [['Sansom', yearScores[year].sansomMatches],
											['Cooper',  yearScores[year].cooperMatches],
											['Table',   yearScores[year].tableMatches],
											['Draw',    yearScores[year].drawMatches],]);

		renderPie('#chart'+year+'Games', 	[['Sansom', yearScores[year].sansomGames],
											['Cooper',  yearScores[year].cooperGames],
											['Table',   yearScores[year].tableGames],]);
		
		if(yearScores[year].sansomBridge > 0 || yearScores[year].cooperBridge > 0 || yearScores[year].tableBridge > 0)
		{
			renderPie('#chart'+year+'Bridge', 	[['Sansom', yearScores[year].sansomBridge],
												['Cooper',  yearScores[year].cooperBridge],
												['Table',   yearScores[year].tableBridge],]);
		}
		else
		{
			$('#chart'+year+'Bridge').html("<p>Nothing to see here.</p>");
		}	

		if(yearScores[year].sansomBriggs > 0 || yearScores[year].cooperBriggs > 0 || yearScores[year].tableBriggs > 0)
		{
			renderPie('#chart'+year+'Briggs', 	[['Sansom',  yearScores[year].sansomBriggs],
												['Cooper',   yearScores[year].cooperBriggs],
												['Table',    yearScores[year].tableBriggs],]);
		}
		else
		{
			$('#chart'+year+'Briggs').html("<p>Nothing to see here.</p>");			
		}
						  
	}						  

	// Special Pseudo matches
	renderPie('#chartPseudoBriggs', [['Sansom', sansomMatchBriggs],
								    ['Cooper',  cooperMatchBriggs],
								    ['Table',   _tableMatchBriggs],]);
	
	renderPie('#chartPseudoBridge', [['Sansom',  sansomMatchBridge],
							        ['Cooper',   cooperMatchBridge],
							        ['Table',    _tableMatchBridge],]);
}

function renderBar(id, columns){
	var chart = c3.generate({
		bindto: id,	
		data: {
			columns: columns,
			type: 'bar'
		}
	});
}

function renderLine(id, columns){
	var chart = c3.generate({
		bindto: id,	
		data: {
			columns: columns
		},
		axis: {
			x: {
				min: 1
			}
		}
	});
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