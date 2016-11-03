function doCharts()
{
	var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
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
	
	var swingometerGames =   ['Games', null];
	var swingometerMatches = ['Matches', null];
	var swingometerBriggs =  ['Briggs', null];
	var swingometerBridge =  ['Bridge', null];
	
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

		if(matches[i].sansom > matches[i].cooper && matches[i].sansom >= matches[i].table) sansomMatchCounter++;
		else if(matches[i].cooper > matches[i].sansom && matches[i].cooper >= matches[i].table) cooperMatchCounter++;
		else if(matches[i].table > matches[i].sansom && matches[i].table > matches[i].cooper) tableMatchCounter++;
		else if(matches[i].sansom === matches[i].cooper) drawMatchCounter++;
		
		sansomCumulativeMatches.push(sansomMatchCounter);
		cooperCumulativeMatches.push(cooperMatchCounter);
		tableCumulativeMatches.push(tableMatchCounter);
		drawCumulativeMatches.push(drawMatchCounter);
		
		if(matches[i].sansombriggs > matches[i].cooperbriggs && matches[i].sansombriggs >= matches[i].tablebriggs)
			sansomMatchBriggs++;
		if(matches[i].cooperbriggs > matches[i].sansombriggs && matches[i].cooperbriggs >= matches[i].tablebriggs)
			cooperMatchBriggs++;
		if(matches[i].tablerbriggs > matches[i].sansombriggs && matches[i].tablebriggs > matches[i].cooperbriggs)
			_tableMatchBriggs++;
		
		if(matches[i].sansombridge > matches[i].cooperbridge && matches[i].sansombridge >= matches[i].tablebridge)
			sansomMatchBridge++;
		if(matches[i].cooperbridge > matches[i].sansombridge && matches[i].cooperbridge >= matches[i].tablebridge)
			cooperMatchBridge++;
		if(matches[i].tablerbridge > matches[i].sansombridge && matches[i].tablebridge > matches[i].cooperbridge)
			_tableMatchBridge++;
		
		swingometerGames.push(sansomCounter-cooperCounter);
		swingometerMatches.push(sansomMatchCounter-cooperMatchCounter);
		swingometerBridge.push(sansomBridgeCounter-cooperBridgeCounter);
		swingometerBriggs.push(sansomBriggsCounter-cooperBriggsCounter);
		
    }
	
    //renderBar('#chartGamesBar', [sansomGamesChart,cooperGamesChart,tableGamesChart]);
	renderLine2('#chartGamesSwing', [swingometerGames]);
	renderLine2('#chartMatchesSwing', [swingometerMatches]);
	renderLine2('#chartBridgeSwing', [swingometerBridge]);
	renderLine2('#chartBriggsSwing', [swingometerBriggs]);

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
							  
		
	var source = $("#chart-template").html();
	var template = Handlebars.compile(source);
	$('#Charts').empty();
	
	// Rneder year pie charts
	var currentYear = new Date().getFullYear()*1;
	for(var year = currentYear; year >= START_YEAR; year--)
	{
		timeCharts(yearScores[year], year, template, "#Charts");  
	}	

	// render month pie charts
	for(var i = 1; i <= 12; i++){
		var month = monthNames[i];
		timeCharts(monthScores[i], month, template, "#Charts"); 
	}
	
	$("#CurrentSeason").empty();
	timeCharts(yearScores[currentYear], "Season", template, "#CurrentSeason");  
	

	// Special Pseudo matches
	renderPie('#chartPseudoBriggs', [['Sansom', sansomMatchBriggs],
								    ['Cooper',  cooperMatchBriggs],
								    ['Table',   _tableMatchBriggs],]);
	
	renderPie('#chartPseudoBridge', [['Sansom',  sansomMatchBridge],
							        ['Cooper',   cooperMatchBridge],
							        ['Table',    _tableMatchBridge],]);
}

function timeCharts(scores, description, template, section){
	$(section).append(template({description: description}));
		
	renderPie('#chart'+description+'Matches',  	[['Sansom', scores.sansomMatches],
												['Cooper',  scores.cooperMatches],
												['Table',   scores.tableMatches],
												['Draw',    scores.drawMatches],]);

	renderPie('#chart'+description+'Games', 	[['Sansom', scores.sansomGames],
												['Cooper',  scores.cooperGames],
												['Table',   scores.tableGames],]);
	
	if(scores.sansomBridge > 0 || scores.cooperBridge > 0 || scores.tableBridge > 0)
	{
		renderPie('#chart'+description+'Bridge', 	[['Sansom', scores.sansomBridge],
													['Cooper',  scores.cooperBridge],
													['Table',   scores.tableBridge],]);
	}
	else
	{
		$('#chart'+description+'Bridge').html("<p>Nothing to see here.</p>");
	}	

	if(scores.sansomBriggs > 0 || scores.cooperBriggs > 0 || scores.tableBriggs > 0)
	{
		renderPie('#chart'+description+'Briggs', 	[['Sansom',  scores.sansomBriggs],
													['Cooper',   scores.cooperBriggs],
													['Table',    scores.tableBriggs],]);
	}
	else
	{
		$('#chart'+description+'Briggs').html("<p>Nothing to see here.</p>");			
	}
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
		},
		grid: {
			y: {
				lines: [
					{value: 0},
				]
			}
		}
	});
}

function renderLine2(id, columns){
	var chart = c3.generate({
		bindto: id,	
		data: {
			columns: columns,
			types: 
			{ 
				Games: 'area',
				Matches: 'area',
				Briggs: 'area',
				Bridge: 'area',
            }	
		},
		axis: {
			x: {
				min: 1
			},
			y: {
				tick: {
					format: function (y) { return Math.abs(y); }
				}
			}
		},
		grid: {
			y: {
				lines: [
					{value: 0},
				]
			},
			x: {
				lines: [
					{value: 1, text: 'Sansom'},
					{value: 1, text: 'Cooper', position: 'start'},
				]
			}
		},
		regions: [
			{axis: 'y', start: 0, class: 'regionSansom', label: 'Sansom'},
			{axis: 'y', end: 0, class: 'regionCooper', label: 'Cooper'},
		]
	});
}

function renderPie(id, columns){
	var chart = c3.generate({
		bindto: id,	
		data: {		
			columns: columns,
			type : 'pie'
		},
		pie: {
			label: {
				format: function(value, ratio, id) { return value; }
			}
		}
    });
}