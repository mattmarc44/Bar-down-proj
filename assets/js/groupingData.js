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
    response = {};
    response['teamName'] = data.teams[i].name;
    response['shots'] = data.teams[i].teamStats[0].splits[0].stat.shotsPerGame;
    response['goals'] = data.teams[i].teamStats[0].splits[0].stat.goalsPerGame;
    response['pointPctg'] = data.teams[i].teamStats[0].splits[0].stat.ptPctg;
    response['shootingPctg'] = data.teams[i].teamStats[0].splits[0].stat.shootingPctg;
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


//kicks everything off
function writeDoc() {
    getData(function (data) {
        makeDataSet(data);
        console.log(groupedData);
        makeGraph();
    });
}

writeDoc();

console.log(groupedData);


//time to make a graph
function makeGraph() {
    var ndx = crossfilter(groupedData);

    var name_dim = ndx.dimension(dc.pluck('teamName'));
    var total_goals = name_dim.group().reduceSum(dc.pluck('goals'));

    dc.barChart('#graphOne')
        .width(900)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(name_dim)
        .group(total_goals)
        .transitionDuration(600)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('team')
        .yAxis().ticks(6);

    var total_shots = name_dim.group().reduceSum(dc.pluck('shots'));

    dc.barChart('#graphTwo')
        .width(900)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(name_dim)
        .group(total_shots)
        .transitionDuration(600)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('team')
        .yAxis().ticks(6);

    dc.renderAll();
}
