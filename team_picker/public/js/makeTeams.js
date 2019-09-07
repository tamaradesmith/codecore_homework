
function makeTeam(data, obj) {
    const teams = [];
    const index = [];
    const num = obj.quantity;
    const member = data.members.trim().split(", ")
    if (obj.type === 'team_count') {
        console.log('MEMBER: ', obj.type);
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
              team.push(` ${member[n][0].toUpperCase()}${member[n].slice(1)}`);
                index.push(n);
                i++;
            }
            teams.push(team);
            teamNumber++;
        }
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
                team.push(` ${member[n]}`);
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
    };
    return teams;
};

module.exports = makeTeam;