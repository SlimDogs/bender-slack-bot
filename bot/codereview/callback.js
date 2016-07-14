module.exports = function(callback, slackData) {

    var restOftheMessage = slackData.messageText.replace('!codereview', '');
    if (restOftheMessage.length > 0 && restOftheMessage.indexOf(' ') >= 0) {
        var options = restOftheMessage.split(' ');
    }

    var currentTeamMembers;
    if (options && options.length > 0) {
        currentTeamMembers = [];

        for (var i = 0, b = options.length; i < b; i++) {
            currentTeamMembers.push({
                name: options[i],
                slack: options[i]
            });
        }

    } else {
        currentTeamMembers = [{
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
    }

    function seleckLucky() {
        var randomUser = currentTeamMembers[Math.floor((Math.random() * (currentTeamMembers.length - 1)) + 1)];

        if (randomUser.name != slackData.userName) {
            return randomUser;
        } else {
            return seleckLucky();
        }
    }

    var selectedUser = seleckLucky();

    callback("Oi, @" + slackData.userName + " needs someone for code review! I assign *" + selectedUser.name + "* for this task, @" + selectedUser.slack + " be kind and spare a minute");
};