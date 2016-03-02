// Spreadsheet
var SPREADSHEET_ID = "###";
var cols = ["A","B","C","D","E","F","G","H","I"]
var sheet;
var values;
var row;

function doGet(e) {
  var gameDate = e.parameter.date;
  var method = e.parameter.method == null ? "GAME" : e.parameter.method.toUpperCase()
  initialiseSheet(gameDate);
  
  if(method === "GAME"){
    return getScoresResponse(e.parameters.callback);
  }
  else if(method === "MATCHES"){
    return getMatchesResponse(e.parameters.callback);
  }
}

function doPost(e) {

  var col = e.parameter.col;
  var method = e.parameter.method == null ? "ADD" : e.parameter.method.toUpperCase();
  var gameDate = e.parameter.date;
  
  initialiseSheet(gameDate);
    
  if( method === "ADD" && canEdit()){
      addToScore(col,1);
  }
  else if(method === "SUB" && canEdit()){
    addToScore(col,-1);
  }
  else if (method === "NEW"){
    gameDate = addGame();
    initialiseSheet(gameDate);
  }
  else if (method === "CLOSE" && canEdit()){
    sheet.getRange(row+1,12).setValue("Y");
  }
  else if (method === "SAVE" && canEdit()){
    var rowData = JSON.parse(e.postData.getDataAsString());
    save(rowData);
  }
  
  return getScoresResponse(e.parameter.callback);
}

function save(rowData){
  for(var i = 0; i < 9; i++)
  {
    sheet.getRange(row+1,i+1).setValue(rowData[i]);
    values[row][i] = rowData[i];
  }
}

function getScoresResponse(callback){
  var scores = [];

  for(var i = 0; i < cols.length; i++)
  {
    var score = {column:cols[i],value:getScore(cols[i])};
    scores.push(score);
  }

  var stats = getStats();
  var output = { gameDate: values[row][9], complete: !canEdit(), match: row-1, game: stats.Games_Played+1, scores: scores, stats: stats };
  
  if(callback == null){
    return ContentService.createTextOutput(Utilities.jsonStringify(output)).setMimeType(ContentService.MimeType.JSON);
  }
  else{
     return ContentService.createTextOutput(callback + "(" + Utilities.jsonStringify(output) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);   
  }
}

function getMatchesResponse(callback){
  var matches = [];

  for(var i = 2; i < 9999; i++){
    if(values[i][0] === "") break;
    var match = { date: values[i][9], sansom: values[i][0], cooper: values[i][1], table: values[i][2], sansombridge: values[i][3], cooperbridge: values[i][4], tablebridge: values[i][5], sansombriggs: values[i][6], cooperbriggs: values[i][7], tablebriggs: values[i][8] };
    matches.push(match);
  }

  var stats = getStats();
  var output = { matches: matches, stats: stats };
  
  if(callback == null){
    return ContentService.createTextOutput(Utilities.jsonStringify(output)).setMimeType(ContentService.MimeType.JSON);
  }
  else{
     return ContentService.createTextOutput(callback + "(" + Utilities.jsonStringify(output) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);   
  }
}


function addToScore(col,number){
  var value = getScore(col) + number;
  if(value < 0) value = 0;
  sheet.getRange(row+1,columnNumber(col)+1).setValue(value);
  values[row][columnNumber(col)] = value;
  return value;
}

function getScore(col){
  var value = values[row][columnNumber(col)];
  return value;
}

function canEdit(){
  return row !== -1 && values[row][9] === getDate();
}

function getScoreSheet(){
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Score Sheet");
}

function getStats(){
  var statsSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Stats");
  var stats = statsSheet.getDataRange().getValues();
  var returnStats = 
      {
        Sansom_Matches_Won: stats[0][1],
        Cooper_Matches_Won: stats[1][1],
        Table_Matches_Won: stats[2][1],
        Draws: stats[3][1],
        Sansom_Games_Won: stats[4][1],
        Cooper_Games_Won: stats[5][1],
        Table_Games_Won: stats[6][1],
        Sansom_Bridge_Cards: stats[7][1],
        Cooper_Bridge_Cards: stats[8][1],
        Table_Bridge_Cards: stats[9][1],
        Sansom_Briggsings: stats[10][1],
        Cooper_Briggsings: stats[11][1],
        Table_Briggsings: stats[12][1],
        Games_Played: stats[13][1],
        Matches_Played: stats[14][1]
    }
  return returnStats;
}

function getGameRow(date){
  if(date == null) date = getDate();
  for(var i = 2; i < 9999; i++){
    var value = values[i][9]; 
    if(value === date) return i;
    if(value == "") return i - 1;
  }
  return -1;
}

function addGame(){
  var date = getDate();
  for(var i = 3; i < 9999; i++){
    var value = values[i][9]; 
    if(value === date) return date;
    if(value == "")
    {
      for(var j = 1; j < 10; j++)
      {
        sheet.getRange(i+1,j).setValue(0);
      }
      //sheet.getRange(i+1,1,1,9).setValue([0,0,0,0,0,0,0,0,0]);
      sheet.getRange(i+1,10).setValue(date);
      return date;
    }
  }
  return -1;
}

function columnNumber(col){
  return col.charCodeAt(0) - 65;
}

function initialiseSheet(date){
  sheet = getScoreSheet();
  values = sheet.getDataRange().getValues();
  row = getGameRow(date);
}

function getDate(){
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return day+"-"+month+"-"+year;
}