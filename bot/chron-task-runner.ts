/// <reference path='../typings/index.d.ts' />
/// <reference path='../interfaces.ts' />

(() => {
  const https = require('https');
  const users = new (require('./users/callback.js'))();
  
  class ChronTaskRunner {
    get standUpMessages() {
      return [
        `it's almost stand up time, have a good one!`,
        `it's your turn for a stand up!`,
        `new day, new stand up :)`,
        `it's a time to list the things you have done Yesterday!`,
        `don't sleep, stand up`
      ];
    }
  
    constructor() {
      setInterval(this.checkChronTaskTimes.bind(this), 60000);
    }
  
    public checkChronTaskTimes() {
      const currentTime = this._getCurrentTime();
  
      if (currentTime.days !== 6 && currentTime.days !== 0) {
        const randomNumber = Math.floor((Math.random() * (this.standUpMessages.length - 1)) + 1);
        const randomMessage = this.standUpMessages[randomNumber];
  
        if (currentTime.hours === 8 && currentTime.minutes === 59) {
          this.postMessage(`*Team 1* ${randomMessage}`);
        } else if (currentTime.hours === 9 && currentTime.minutes === 14) {
          this.postMessage(`*Team 2* ${randomMessage}`);
        } else if (currentTime.hours === 9 && currentTime.minutes === 30) {
          const birthdayUsers = users.getBirthdayUsers(currentTime.days, currentTime.months);
  
          birthdayUsers.forEach(celebrator => {
            this.postMessage(
              `*Heeeeyyy!!!* guess what day today is? It's ${celebrator.name} birthday! @${celebrator.username}, congrats ${(celebrator.gender === 'male ;)' ? 'mate' : 'beautiful :* <3')} !`,
              'http://benderthebot.herokuapp.com/icons/birthday.jpg'
            );
          });
        }
      }
    }
  
    public postMessage(message = '', image?: string) {
      const req = https.request({
        hostname: 'hooks.slack.com',
        path: '/services/T0GM8NHU0/B0H9881K8/TE8PaC19TxajzwIhDSun1ge7',
        method: 'POST'
      }, function (res, b, c) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log(`Data received: ${chunk}`);
        });
      });
  
      req.on('error', function (e) {
        console.log(`Error while posting message: ${e.message}`);
      });
  
      req.write(JSON.stringify({
        channel: '#random',
        username: 'Bender',
        text: message,
        image_url: image
      }));
      req.end();
    }
  
    private _getCurrentTime() {
      const d = new Date();
    
      return {
        minutes: d.getMinutes(),
        hours: d.getHours(),
        days: d.getDay(),
        months: d.getMonth() + 1
      };
    }
  }
  
  module.exports = ChronTaskRunner;
})();
