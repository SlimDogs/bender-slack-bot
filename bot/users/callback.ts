/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../interfaces.ts" />

(() => {
  class TeamCommands {
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
  
    getDevs() {
      return this.users.filter(user => user.isDev);
    }
  
    getTesters() {
      return this.users.filter(user => user.isTester);
    }
  
    getCodeReviewer(askerUsername: string) {
      // Getting asker team
      const asker = this.users.filter(user => user.username === askerUsername)[0];
      const askerTeam = asker.team;
  
      // Getting all possible reviewers (same team + devs)
      const possibleReviewers = this.users.filter(user =>
        user.username !== askerUsername && user.isDev && user.team === askerTeam
      );
  
      // Selecting random reviewer
      return possibleReviewers[Math.floor((Math.random() * (possibleReviewers.length - 1)) + 1)];
    }
  
    getBirthdayUsers(day: number = 0, month: number = 0) {
      return this.users.filter(user =>
        user.birthday.day === day && user.birthday.month === month
      );
    }
  }
  
  module.exports = TeamCommands;
})();
