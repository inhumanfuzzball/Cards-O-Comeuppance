var charts = [];
var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var swingometerGames;
var swingometerMatches;
var swingometerBriggs;
var swingometerBridge;

var sansomCumulativeGames;
var cooperCumulativeGames;
var tableCumulativeGames;

var sansomCumulativeMatches;
var cooperCumulativeMatches;
var tableCumulativeMatches;
var drawCumulativeMatches;

var sansomCumulativeBriggs;
var cooperCumulativeBriggs;
var _tableCumulativeBriggs;
                          
var sansomCumulativeBridge;
var cooperCumulativeBridge;
var _tableCumulativeBridge;

function doCharts()
{
	swingometerGames =   ['Games', null];
	swingometerMatches = ['Matches', null];
	swingometerBriggs =  ['Briggs', null];
	swingometerBridge =  ['Bridge', null];
	sansomCumulativeGames = ['Sansom', null];
	cooperCumulativeGames = ['Cooper', null];
	tableCumulativeGames = ['Table', null];
	sansomCumulativeMatches = ['Sansom', null];
	cooperCumulativeMatches = ['Cooper', null];
	tableCumulativeMatches = ['Table', null];
	drawCumulativeMatches = ['Draw', null];
	sansomCumulativeBriggs = ['Sansom', null];
	cooperCumulativeBriggs = ['Cooper', null];
	_tableCumulativeBriggs = ['Table', null];
	sansomCumulativeBridge = ['Sansom', null];
	cooperCumulativeBridge = ['Cooper', null];
	_tableCumulativeBridge = ['Table', null];
	
    var sansomGamesChart = ['Sansom'];
    var cooperGamesChart = ['Cooper'];
	var tableGamesChart = ['Table'];
	
	var sansomMatchBriggs = 0;
	var sansomMatchBridge = 0;
	var cooperMatchBriggs = 0;
	var cooperMatchBridge = 0;
	var _tableMatchBriggs = 0;
	var _tableMatchBridge = 0;
	
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
	
	$("#Charts-Dropdown").empty();
	$("#Charts-Dropdown").append("<li><a href='javascript:showTotal();'>Scores</a></li>");
	$("#Charts-Dropdown").append("<li><a href='javascript:showCurrentSeason();'>Current Season</a></li>");
	$("#Charts-Dropdown").append("<li><a href='javascript:showSwingometer();'>Swingometer</a></li>");
	$("#Charts-Dropdown").append("<li><a href='javascript:showVersesTime();'>Verses Time</a></li>");
	
	var currentYear = new Date().getFullYear()*1;
	for(var year = currentYear; year >= START_YEAR; year--)
	{	
		$("#Charts-Dropdown").append("<li><a href='javascript:showYearCharts("+year+");'>"+year+"</a></li>");
	}	
	
	for(var i = 1; i <= 12; i++){
		var month = monthNames[i];
		$("#Charts-Dropdown").append("<li><a href='javascript:showMonthCharts("+i+");'>"+month+"</a></li>");
	}
	
	/*

	// Special Pseudo matches
	renderPie('#chartPseudoBriggs', [['Sansom', sansomMatchBriggs],
								    ['Cooper',  cooperMatchBriggs],
								    ['Table',   _tableMatchBriggs],]);
	
	renderPie('#chartPseudoBridge', [['Sansom',  sansomMatchBridge],
							        ['Cooper',   cooperMatchBridge],
							        ['Table',    _tableMatchBridge],]);
									
	*/
	
	showTotal();
}

function destroyCharts(){
	for(var i = 0; i < charts.length; i++){
		charts[i].destroy();
	}
	charts = [];
}

function initialiseTemplate(full){
	destroyCharts();
	var source = $(full ? "#chart-template-full" : "#chart-template").html();
	var template = Handlebars.compile(source);
	$('#Charts').empty();
	return template;
}

function showTotal(){
	var template = initialiseTemplate(false);
	$("#Charts").append(template({description: "Scores"}));
	
	renderPie('#chartScoresMatches', [['Sansom', scores.sansomMatches],
									['Cooper', scores.cooperMatches],
									['Table', scores.tableMatches],
									['Draw', scores.drawMatches]]);
		
	renderPie('#chartScoresGames', [['Sansom', scores.sansomGames],
									['Cooper', scores.cooperGames],
									['Table', scores.tableGames]]);
							  
	renderPie('#chartScoresBridge', [['Sansom', scores.sansomBridge],
									['Cooper', scores.cooperBridge],
									['Table', scores.tableBridge]]);

	renderPie('#chartScoresBriggs', [['Sansom', scores.sansomBriggs],
									['Cooper', scores.cooperBriggs],
									['Table', scores.tableBriggs]]);
}

function showSwingometer(){
	var template = initialiseTemplate(true);
	$("#Charts").append(template({description: "Swingometer"}));
	
	renderLine2('#chartSwingometerGames', [swingometerGames]);
	renderLine2('#chartSwingometerMatches', [swingometerMatches]);
	renderLine2('#chartSwingometerBridge', [swingometerBridge]);
	renderLine2('#chartSwingometerBriggs', [swingometerBriggs]);
}

function showVersesTime(){
	var template = initialiseTemplate(true);
	$("#Charts").append(template({description: "Time"}));
	
	renderLine('#chartTimeGames', [sansomCumulativeGames,cooperCumulativeGames,tableCumulativeGames]);
	renderLine('#chartTimeMatches', [sansomCumulativeMatches,cooperCumulativeMatches,tableCumulativeMatches,drawCumulativeMatches]);
	renderLine('#chartTimeBriggs', [sansomCumulativeBriggs,cooperCumulativeBriggs,_tableCumulativeBriggs]);	
	renderLine('#chartTimeBridge', [sansomCumulativeBridge,cooperCumulativeBridge,_tableCumulativeBridge]);
}

function showMonthCharts(monthNumber){
	var template = initialiseTemplate(false);
	var month = monthNames[monthNumber];
	timeCharts(monthScores[monthNumber], month, template, "#Charts"); 
}

function showCurrentSeason(){
	var currentYear = new Date().getFullYear()*1;
	showYearCharts(currentYear);
}

function showYearCharts(year){
	var template = initialiseTemplate(false);
	timeCharts(yearScores[year], year, template, "#Charts");  
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
	charts.push(chart);
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
	charts.push(chart);
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
	charts.push(chart);
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
	charts.push(chart);
}