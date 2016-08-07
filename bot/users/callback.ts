/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../interfaces.ts" />

class team {
    constructor() {}

    users: Array<user> = [
        // Devs
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
            name: 'Tautvydas Derzinskas',
            username: 'tautvydas',
            team: 1,
            location: 'London',
            isDev: true,
            isTester: false,
            gender: 'male',
            birthday: {
                day: 12,
                month: 10,
                year: 1988
            }
        },
        {
            name: 'Justinas Marozas',
            username: 'justinas.marozas',
            team: 1,
            location: 'London',
            isDev: true,
            isTester: false,
            gender: 'male',
            birthday: {
                day: 28,
                month: 5
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
            name: 'Chris Poulter',
            username: 'chrispoulter',
            team: 2,
            location: 'London',
            isDev: true,
            isTester: true,
            gender: 'male',
            birthday: {
                day: 22,
                month: 5
            }
        },
        {
            name: 'Ian Port',
            username: 'iport',
            team: 2,
            location: 'London',
            isDev: true,
            isTester: true,
            gender: 'male',
            birthday: {
                day: 4,
                month: 8
            }
        },
        // Testers
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
            name: 'Diana Pinchuk',
            username: 'diana_pinchuk',
            team: 2,
            location: 'Lviv',
            isDev: false,
            isTester: true,
            gender: 'female',
            birthday: {
                day: 1,
                month: 5
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

    getDevs(): Array<user> {
        let onlyDevs: Array<user> = this.users.filter(function(e) {
            return e.isDev;
        });

        return onlyDevs;
    }

    getTesters(): Array<user> {
        let onlyTesters: Array<user> = this.users.filter(function(e) {
            return e.isTester;
        });

        return onlyTesters;
    }

    getCodeReviewer(askerUsername: string): user {
        // Getting asker team
        let asker: user = this.users.filter(function(e) {
            return e.username === askerUsername;
        })[0],
            askerTeam: number = asker.team;

        // Getting all possible reviewers (same team + devs)
        let possibleReviewers: Array<user> = this.users.filter(function(e) {
            return e.username !== askerUsername && e.isDev && e.team === askerTeam;
        });

        // Selecting random reviewer
        let reviewer: user = possibleReviewers[Math.floor((Math.random() * (possibleReviewers.length - 1)) + 1)];

        return reviewer;
    }

    getBirthdayUsers(day: number = 0, month: number = 0): Array<user> {
        let birthdayCelebrators = this.users.filter(function(e) {
            return e.birthday.day === day && e.birthday.month === month;
        });

        return birthdayCelebrators;
    }
}

module.exports = new team();