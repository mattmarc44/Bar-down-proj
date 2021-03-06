//this will be our dataset to make graphs
var groupedData = [];

//base url for api
const baseUrl = 'https://statsapi.web.nhl.com//api/v1/teams?expand=team.stats';

//making the api request
function getData(cb) {
    //create request
    let xhr = new XMLHttpRequest;

    xhr.open('GET', baseUrl, true);
    //send it
    xhr.send();
    //on load
    xhr.onreadystatechange = function () {
        //if all is well..
        if (this.readyState == 4 && this.status === 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

//this is our object constructor which we'll push to our groupedData array later
function teamObjectMaker(data, i) {
    var dataPath = data.teams[i].teamStats[0].splits[0].stat;

    response = {};
    response['teamName'] = data.teams[i].name;
    response['shots'] = dataPath.shotsPerGame;
    response['goals'] = dataPath.goalsPerGame;
    response['pointPctg'] = dataPath.ptPctg;
    response['shootingPctg'] = dataPath.shootingPctg;
    response['wins'] = dataPath.wins;
    response['losses'] = dataPath.losses;
    response['otl'] = dataPath.ot;
    return response;
}


//this will make our groupedData array, iterate though each team from the api
//take its details, put it in an object and push it to our groupedData.
function makeDataSet(data) {
    for (var i = 0; i < data.teams.length; i++) {
        var newTeam = new teamObjectMaker(data, i);
        groupedData.push(newTeam);
    }
}

//indented two lines must be commented out for testing
    //variables for table
    var table = document.getElementById('table');

    writeDoc();

//kicks everything off
function writeDoc() {
    getData(function (data) {
        makeDataSet(data);
        makeGraph();
        makePieGraph();

        var tableData = Object.keys(groupedData[0]);
        makeTable(table, groupedData);
        makeTableHead(table, tableData);
    });
}

//time to make a graph
function makeGraph() {
    //get stats to compare
    var statOne = document.getElementById('statsOne').value;
    var statTwo = document.getElementById('statsTwo').value;

    var ndx = crossfilter(groupedData);

    var name_dim = ndx.dimension(dc.pluck('teamName'));
    var total_goals = name_dim.group().reduceSum(dc.pluck(statOne));

    dc.barChart('#graphOne')
        .width(900)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 90, left: 50 })
        .dimension(name_dim)
        .group(total_goals)
        .transitionDuration(600)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('team')
        .yAxisLabel(statOne)
        .yAxis().ticks(6);

    var total_shots = name_dim.group().reduceSum(dc.pluck(statTwo));

    dc.barChart('#graphTwo')
        .width(900)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 90, left: 50 })
        .dimension(name_dim)
        .group(total_shots)
        .transitionDuration(600)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('team')
        .yAxisLabel(statTwo)
        .yAxis().ticks(6);

    dc.renderAll();
}

function makePieGraph() {
    //get team for pie chart
    var pickedTeam = document.getElementById('team-picker').value;
    // reorg dataset for diferent layout in pie
    var dataSet = [];

    // construct a new object so the dc piechart will display wins, losses and otl
    function newDataSet(title, amount) {
        response = {};

        response['title'] = title;
        response['amount'] = amount;
        return response;
    }

    //each time makeGrpah is called we'll be able to update the dataset for that team
    var win = new newDataSet('Wins', groupedData[pickedTeam].wins);
    var loss = new newDataSet('Losses', groupedData[pickedTeam].losses);
    var otLoss = new newDataSet('otl', groupedData[pickedTeam].otl);

    //put the new objects into the new dataset
    dataSet.push(win);
    dataSet.push(loss);
    dataSet.push(otLoss);
    console.log(dataSet);

    var ndx = crossfilter(dataSet);

    var title_dim = ndx.dimension(dc.pluck('title'));
    var amount_group = title_dim.group().reduceSum(dc.pluck('amount'));

    dc.pieChart("#graphThree")
        .width(400)
        .height(400)
        .dimension(title_dim)
        .group(amount_group)
        .transitionDuration(600)
        .legend(dc.legend().x(0).y(0));

    dc.renderAll();

}

function makeTableHead(table, data) {
    var thead = table.createTHead();
    var row = thead.insertRow();

    //iterate through key values in groupedData to make a tableheader in each
    for (let key of data) {
        var th = document.createElement("th");
        var text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function makeTable(table, data) {
    for (let el of data) {
      let row = table.insertRow();
      for (key in el) {
        let cell = row.insertCell();
        let text = document.createTextNode(el[key]);
        cell.appendChild(text);
      }
    }
  }
