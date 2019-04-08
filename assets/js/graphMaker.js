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
        var selectedStat = selectedTeam.teamStats[0].splits[0].stat[selectedTwo];

        //update selected team
        $('#team-select').change(function() { 
            selected = $(this).children('option:selected').val();
        });
        //update selected stat
        $('#stat-select').change(function() { 
            selectedTwo = $(this).children('option:selected').val();
        });
    

        //populate select options from data

        d3.selectAll('#team-select')
            .data(nhlTeams)
            .enter()
            .append('option')
            .text(function(d) {
                return d.name;
            })
            .attr('value', function(d) {
                return d;//fix later
            });
    /*
    function getStat(nhlTeams, stat) {

    }
*/
    });
    
});