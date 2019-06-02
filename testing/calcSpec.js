describe("groupingData", function() {
    describe("teamObjectMaker", function() {
        it("teamObjectMaker should return expected value", function() {
            var result = teamObjectMaker({
                teams: [{
                    name: "teamName", 
                    teamStats: [{
                        splits: [{
                            stat: {shotsPerGame: 10, goalsPerGame: 8, ptPctg: 3, shootingPctg: 56, wins: 4, losses: 2, ot: 9}
                        }],
                    }],
                }]
            }, 0);
            var expectedValue = {
                teamName: "teamName",
                shots: 10,
                goals: 8,
                pointPctg: 3,
                shootingPctg: 56,
                wins: 4,
                losses: 2,
                otl: 9
            };
            expect(result).toEqual(expectedValue);
        });

        it("should return string", function() {
            var baseUrl = "https://statsapi.web.nhl.com//api/v1/teams?expand=team.stats";
            expect(baseUrl).toBe("https://statsapi.web.nhl.com//api/v1/teams?expand=team.stats");
        });
    });
});