(function () {
    var TeamCommands = (function () {
        function TeamCommands() {
            this.users = [
                {
                    name: 'Umair Butt',
                    username: 'umairbutt',
                    team: 1,
                    location: 'London',
                    isDev: true,
                    isTester: false,
                    gender: 'male',
                    birthday: {
                        day: 11,
                        month: 3
                    }
                },
                {
                    name: 'Piero Bosco',
                    username: 'piero',
                    team: 2,
                    location: 'London',
                    isDev: true,
                    isTester: true,
                    gender: 'male',
                    birthday: {
                        day: 12,
                        month: 8
                    }
                },
                {
                    name: 'Hannah Adams',
                    username: 'hadams',
                    team: 2,
                    location: 'London',
                    isDev: false,
                    isTester: true,
                    gender: 'female',
                    birthday: {
                        day: 0,
                        month: 0
                    }
                },
                {
                    name: 'Mariia Stoliar',
                    username: 'mariiastoliar',
                    team: 2,
                    location: 'Lviv',
                    isDev: false,
                    isTester: true,
                    gender: 'female',
                    birthday: {
                        day: 10,
                        month: 1
                    }
                },
                {
                    name: 'Nadiia Stasyk',
                    username: 'nstasyk',
                    team: 1,
                    location: 'Lviv',
                    isDev: false,
                    isTester: true,
                    gender: 'female',
                    birthday: {
                        day: 16,
                        month: 2
                    }
                },
                {
                    name: 'Oles Gamernyk',
                    username: 'olesgamernyk',
                    team: 1,
                    location: 'Lviv',
                    isDev: false,
                    isTester: true,
                    gender: 'male',
                    birthday: {
                        day: 8,
                        month: 3
                    }
                },
                {
                    name: 'Svitlana Berezyuk',
                    username: 'svitlana',
                    team: 1,
                    location: 'Lviv',
                    isDev: false,
                    isTester: true,
                    gender: 'female',
                    birthday: {
                        day: 22,
                        month: 6
                    }
                },
                {
                    name: 'Ania Nakonechna',
                    username: 'ania',
                    team: 0,
                    location: 'Lviv',
                    isDev: false,
                    isTester: true,
                    gender: 'female',
                    birthday: {
                        day: 6,
                        month: 8
                    }
                },
                {
                    name: 'Stephen Parsons',
                    username: 'stephen',
                    gender: 'female',
                    team: 0,
                    location: 'Lviv',
                    isDev: false,
                    isTester: false,
                    birthday: {
                        day: 15,
                        month: 8
                    }
                },
                {
                    name: 'Nadya Tretyak',
                    username: 'nadya',
                    team: 0,
                    location: 'Lviv',
                    isDev: false,
                    isTester: false,
                    gender: 'female',
                    birthday: {
                        day: 30,
                        month: 3
                    }
                }
            ];
        }
        TeamCommands.prototype.getDevs = function () {
            return this.users.filter(function (user) { return user.isDev; });
        };
        TeamCommands.prototype.getTesters = function () {
            return this.users.filter(function (user) { return user.isTester; });
        };
        TeamCommands.prototype.getCodeReviewer = function (askerUsername) {
            var asker = this.users.filter(function (user) { return user.username === askerUsername; })[0];
            var askerTeam = asker.team;
            var possibleReviewers = this.users.filter(function (user) {
                return user.username !== askerUsername && user.isDev && user.team === askerTeam;
            });
            return possibleReviewers[Math.floor((Math.random() * (possibleReviewers.length - 1)) + 1)];
        };
        TeamCommands.prototype.getBirthdayUsers = function (day, month) {
            if (day === void 0) { day = 0; }
            if (month === void 0) { month = 0; }
            return this.users.filter(function (user) {
                return user.birthday.day === day && user.birthday.month === month;
            });
        };
        return TeamCommands;
    }());
    module.exports = TeamCommands;
})();