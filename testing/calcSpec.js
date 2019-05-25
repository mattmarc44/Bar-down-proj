describe("groupingData", function() {
    describe("firts tests", function() {
        xit("should get data", function() {
            expect(writeDoc()).toBeDefined();
        });
        it("should present graphs", function() {
            expect(makeGraph()).toHaveBeenCalled();
        });
        it("should return string", function() {
            expect(baseUrl).toBe("https://statsapi.web.nhl.com//api/v1/teams?expand=team.stats");
        })
    });
});