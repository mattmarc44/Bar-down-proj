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
function writeToDocument() {
    getData(function (data) {
        var teamNo = document.getElementById('teams').value;
        var statType = document.getElementById('stat-select').value;
        data = data.teams[teamNo].teamStats[0].splits[0].stat[statType]; //var targetdata = teamStats[0].splits[0].stat;
            //console.log(teamNo);
            document.getElementById('data').innerHTML = data; //`<p>${data[type]}</p> + <p>${data[typeTwo]}</p>`
    });
}