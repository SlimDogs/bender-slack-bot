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
        var randomUser = Math.floor((Math.random() * currentTeamMembers.length) + 1);

        if (randomUser != slackData.userName) {
            return randomUser;
        } else {
            return seleckLucky();
        }
    }

    var selectedUser = seleckLucky();

    callback([{
        "color": GLOBAL.hexGenerator(),
        "title": "Hey, @" + slackData.userName + " needs someone for code review! I assign *" + selectedUser.name + "* for this task, @" + selectedUser.slack + " be kind and spare a minute :piero:"
    }]);
};