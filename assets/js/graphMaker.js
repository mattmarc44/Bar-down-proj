$('document').ready(function() {
    //get external data
    var allData = $.getJSON('https://statsapi.web.nhl.com//api/v1/teams?expand=team.stats', function() {
        //break it down
        var nhlTeams = allData.responseJSON.teams;
        //variable for storing the set team
        var selected = $('#team-select').children('option:selected').val();
        var selectedTeam = nhlTeams[selected];
        //variable for storing desired stat
        var selectedTwo = $('#stat-select').children('option:selected').val();
        var selectedStat = selectedTeam.teamsStats[0].splits[0].stat[selectedTwo];


        //update selected team
        $('#team-select').change(function() { 
            selected = $(this).children('option:selected').val();
        });
        //update selected stat
        $('#stat-select').change(function() { 
            selectedTwo = $(this).children('option:selected').val();
        });
    

        //populate select options from data
        /* we're close i can fee it
        function populate() {
            d3.select("#team-select").append("option")
                .text()
                .attr('value')
        }*/
    /*
    function getStat(nhlTeams, stat) {

    }
*/
    });
    
});