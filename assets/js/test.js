const baseUrl = 'https://statsapi.web.nhl.com//api/v1/teams?expand=team.stats';

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

/*
THEORY

dynamically target team using its array index.
use a variable to store the path to teamstats.
attach targeted stat to the end to access that data.
sommehow make that a chart.
*/

function makeChart(data) {
$('#draw').empty();

    var h = 500;    
    var w = 300;
    var barPadding = 1;

    var dataSet = [];
    dataSet.push(data.shotsPerGame)
    dataSet.push(data.goalsPerGame);

    var colWidth = w / dataSet.length;

    var svg = d3.select('#draw')
                .append('svg')
                .attr('height', h)
                .attr('width', w)
            
    svg.selectAll('rect')
        .data(dataSet)
        .enter()
        .append('rect')
        .attr('x', function(d, i) {
            return i * colWidth;
        })
        .attr('y', function(d) {
            return h - d;
        })
        .attr('height', function(d) {
            return d;
        })
        .attr('width', colWidth - barPadding);

    svg.selectAll('text')
        .data(dataSet)
        .enter()
        .append('text')
        .text(function(d) {
            return d;
        })
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
            return i * colWidth + (colWidth - 1) / 2;
        })
        .attr('y', function(d) {
            return h - d - 14;
        })
        .attr('font-size', '20px');
}

function writeToDocument() {
    getData(function (data) {
        var teamNo = document.getElementById('teams').value;
        var statType = document.getElementById('stat-select').value;
        data = data.teams[teamNo].teamStats[0].splits[0].stat;
            //console.log(teamNo);
            document.getElementById('data').innerHTML = data[statType]; //`<p>${data[type]}</p> + <p>${data[typeTwo]}</p>`
            makeChart(data, teamNo);
    });
}

writeToDocument();