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
	renderPie('#chartMatches', [['Sansom', sansomMatches],
								['Cooper', cooperMatches],
								['Table', tableMatches],
							    ['Draw', drawMatches]]);
		
	renderPie('#chartGames', [['Sansom', sansomGames],
							  ['Cooper', cooperGames],
							  ['Table', tableGames]]);
							  
	renderPie('#chartBridge', [['Sansom', sansomBridge],
								['Cooper', cooperBridge],
								['Table', tableBridge]]);

	renderPie('#chartBriggs', [['Sansom', sansomBriggs],
							  ['Cooper', cooperBriggs],
							  ['Table', tableBriggs]]);
					
	// Year scores						
	renderPie('#chartYearMatches',  [['Sansom', sansomYearMatches],
									['Cooper',  cooperYearMatches],
									['Table',   tableYearMatches],
									['Draw',    drawYearMatches],]);

	renderPie('#chartYearGames', [['Sansom', sansomYearGames],
								 ['Cooper',  cooperYearGames],
							     ['Table',   tableYearGames],]);
							  
	renderPie('#chartYearBridge', [['Sansom', sansomYearBridge],
								  ['Cooper',  cooperYearBridge],
								  ['Table',   tableYearBridge],]);
	
	renderPie('#chartYearBriggs', [['Sansom',  sansomYearBriggs],
							      ['Cooper',   cooperYearBriggs],
							      ['Table',    tableYearBriggs],]);
	
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