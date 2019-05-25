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
..* The bar charts a populated using d3/dc from a dataset thats been filtered from the api into a more workable format.
- Table
..* a simple table displaying all our data through a function updating table dynamically.
- Pie chart
..* The pie chart is also d3/dc but the data is filtered again to display specific win/loss/otl data from a specified team.


### Features Left to Implement
- highlight the team you chose in the barcharts
- sass styling
- manipulating data based off of high and low scores in the stats.


## Technologies Used

- [d3](https://d3js.org/)
    -d3 is the foundation for most of the data dashboard.

- [dc](https://dc-js.github.io/dc.js/)
    - dc was used to render the charts more easily then d3 alone.

- [crossfilter](https://square.github.io/crossfilter/)
    - crossfilter helps access the data more easily and used with d3/dc to create the charts

- [node_modules/dependancy managent](https://yarnpkg.com/)
    - I was hoping to use yarn dependency management again. However when deploying on gh pages it would throw errors and so CDN's have been used.

- [bootstrap 4.3.1](https://getbootstrap.com/)
    - bootswatch is used to provide the theme for the dashboard.

- [js](https://bootswatch.com)
    - most functions are js and called from the html's onChange call.

- [html5/css3]


## Testing

1. Select options:
    1. check drop downs populate.
    2. check content updates for all graphs when options have changed. 

2. Welcome button:
    1. click button to scroll down to content.

3. Small/medium screens
    1. check graphs still display.
    2. check they scroll horizontally and independently of rest of content.

4. General:
    1. check all break points function and displays on different devices on dev tools
    2. rerun previous tests on sizes mobile/tablet.
    3. rerun tests from deployed gh page.
    4. html/css validator.


mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

- graphs created a strange overflow on small screens creating a lot of white space on the right of the screen. fixed in media queries with overflow-x.

- Pie chart couldn't display the data I wanted. This was due to the way crossfilter gets the data. Fixed by reorganising the data in newDataSet function, in groupingData.js

## Deployment

I decided to use github pages to deploy this project as suggested and taught via the course. Issues with deployment includes unexpected display behaviour on gh pages. Mostly fixed in media queries. Also slowing down of charts being displayed (possibly slow wifi as I couldn't recreate later).



