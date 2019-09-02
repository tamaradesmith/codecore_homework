//  const object = {
//      members: ["aurora", "hudson", "nermal", "woodstock", "jasmine", "pewter", "tabatha", "monty", "sherwood"],
//      type: 'team_count',
//      quantity:2,

//  } 


function makeTeam(obj) {
    const teams = [];
    const index = [];
    const member = obj.members;
    const num = obj.quantity;
    if (obj.type === 'team_count') {
        let teamNumber = 0;
        let size = Math.ceil(member.length / num);
        while (teamNumber < num) {
            const team = [];
            let i = 0;
            while (i < size) {
                if (index.length === member.length) {
                    break;
                };
                n = Math.floor(Math.random() * (member.length));
                while (index.includes(n)) {

                    n = Math.floor(Math.random() * (member.length));
                };
                team.push(member[n]);
                index.push(n);
                i++;
            }
            teams.push(team);
            teamNumber++;
        }
        return teams;
    } else {
        const size = num;
        while (index.length !== member.length) {
            let i = 0;
            const team = [];
            while (i < size) {
                if (index.length === member.length) {
                    break;
                };
                n = Math.floor(Math.random() * (member.length));
                while (index.includes(n)) {
                    n = Math.floor(Math.random() * (member.length));
                };
                team.push(member[n]);
                index.push(n);
                i++;
            };
            if (team.length === 1) {
                n = Math.floor(Math.random() * (teams.length - 1));
                teams[n].push(team.join());
            } else {
                teams.push(team);
            };
        }
        return teams;
    };

};
// // makeTeam(members, "bob", 2)
// console.log(makeTeam(object))

module.exports = makeTeam;