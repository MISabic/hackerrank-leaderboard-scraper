const getLimit = (numberOfPages) => {
    const range = numberOfPages * 10;
    return ((range / 100) * 100 === range) ? range : range + 100;
}

const generateRankList = async (contestCode, numberOfPages) => {
    let leaders = [];
    let limit = getLimit(numberOfPages);

    for(let i=0; i<=limit; i+=100) {
        await fetch(`https://www.hackerrank.com/rest/contests/${contestCode}/leaderboard?offset=${i}&limit=100`)
            .then(resp => resp.json())
            .then(data => {
                data.models.map(hacker => {
                    const leader = {
                        Rank: hacker?.rank,
                        Hacker: hacker?.hacker,
                        HackerID: hacker?.hacker_id,
                        Country: hacker?.country,
                        Problems: hacker?.challenges?.length,
                        Solved: hacker?.solved_challenges,
                        Score: hacker?.score,
                        Time: hacker?.time_taken
                    }
                    leaders.push(leader);
                });
            })
            .catch(err => console.log(err));
    }

    return leaders;
}

const contestCode = "101hack52";
const numberOfPages = 224;

const rankList = await generateRankList(contestCode, numberOfPages);

console.log(rankList);