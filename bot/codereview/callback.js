module.exports = function(callback, slackData) {

    var currentTeamMembers = [{
        name: 'Umair Butt',
        slack: 'umairbutt'
    }, {
        name: 'Tautvydas Derzinskas',
        slack: 'tautvydas'
    }, {
        name: 'Justinas Marozas',
        slack: 'justinas.marozas'
    }, {
        name: 'Paolo Regoli',
        slack: 'pregoli'
    }, {
        name: 'Piero Bosco',
        slack: 'piero'
    }, {
        name: 'Chris Poulter',
        slack: 'chrispoulter'
    }, {
        name: 'Ian Port',
        slack: 'iport'
    }];

    function seleckLucky() {
        var randomUser = currentTeamMembers[Math.floor((Math.random() * (currentTeamMembers.length - 1)) + 1)];

        if (randomUser.name != slackData.userName) {
            return randomUser;
        } else {
            return seleckLucky();
        }
    }

    var selectedUser = seleckLucky();

    console.log('Making a call back for codereview!');

    callback([{
        "color": GLOBAL.hexGenerator(),
        "title": "Hey, @" + slackData.userName + " needs someone for code review! I assign *" + selectedUser.name + "* for this task, @" + selectedUser.slack + " be kind and spare a minute :piero:"
    }]);
};