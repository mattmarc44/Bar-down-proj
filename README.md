# MattTitmuss-UserCentricFrontendMilestoneProject

This will be a data dashboard for all NHL teams with the aim being an SPA for a target audience of NHL fans and statistician. The main goals are to provide a platform to the user to visualise data from the teams around the league as well as any specific team stats as desired, as it becomes available throughout the season.

I aim to start with a landing page with a short discription of the site and then directing users to the main content. From here there will be options to manipulate any graphs based off a few options. 

Finished site on Github Pages: https://mattmarc44.github.io/Bar-Down-Proj/

## UX
 
#### strategy
- SPA for data visualisation.
- target audience = Fans and Statisticians.
- goals: 
..* Create a data dashboard based on externally sourced data.
..* use an API for data.
..* use d3 and dc to create charts.

focus = create a data dashboard for NHL stats.
definition = A selection of charts for sports stats.
value = keep sports fans up to date with related data.

#### User stories
As a user I want to see stats for my team/league.
As a user I want to view stats in an easily digestable way.
As a user I want to compare stats.
..* I want to directly compare one stat against another.
..* I want to compare a stat against two teams.
As a user I want to see how a teams doing so far in the season (win/losses/OTL).
As a user I want to view all stats in a traditional tabular way.

#### scope
##### planned features priority 1-3
- Landing section, priority = 2
- bar charts, priority = 1
- wins/losses pie chart, priority = 1
- stats table, priority = 1
- selection options, priority = 2
###### future features?
- highlight selected team in bar charts, priority = 3
- manipulate data based off high/low scores, priority = 3

#### wireframe


## Features
 
- Start button:
..* A simple link to the start of the main content. 
- Select options
..* The select options are set up with the onchange attribute to call the functions required to update the graphs based on the selection.
- API
..*Our data is from an ajax call to the NHL api with a specific expansion: https://statsapi.web.nhl.com//api/v1/teams?expand=team.stats. The data is then passed to the other functions in a callback.
- Bar charts
..* The bar charts a populated using d3/dc 
