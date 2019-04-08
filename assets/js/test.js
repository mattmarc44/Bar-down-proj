const baseUrl = 'https://statsapi.web.nhl.com//api/v1/teams?expand=team.stats';

function getData(type, cb) {
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

function writeToDocument(type) {
    getData(type, function (data) {
        data = data.teams[0].teamStats[0].splits[0].stat; //targetdata = teamStats[0].splits[0].stat;
            //console.log(data.faceOffsWon);
            document.getElementById('data').innerHTML = data[type];
    });
}


/*
THEORY

dynamically target team using its array index.
use a variable to store the path to teamstats.
attach targeted stat to the end to access that data.
sommehow make that a chart.
*/