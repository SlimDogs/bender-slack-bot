/// <reference path="../../typings/index.d.ts" />

(() => {
  class HelpCommands {
    private _callback: Function;
  
    get commands() {
      return [
        {
          title: 'Useful commands',
          commands: [
            { command: '!date, !time', description: 'Date/time information'},
            { command: '!weather <Lviv>', description: 'Current weather conditions' },
            { command: '!tfl', description: 'Current tube lines status' },
            { command: '!codereview', description: 'Will choose random user for a code review' },
            { command: '!commands', description: 'Available Bender bot commands' }
          ]
        },
        {
          title: 'Entertaiment commands',
          commands: [
            { command: '!joke', description: 'Random joke' },
            { command: '!chucknorris', description: 'Random *Chuck Norris* joke' }
          ]
        }
      ];
    }
  
    constructor(callback: Function) {
      this._callback = callback;
  
      this.respond();
    }
  
    public respond() {
      let response;
      
      this.commands.forEach(category => {
        const fields = category.commands.map(command => {
          return {
            title: command.command,
            value: command.description,
            short: true
          };
        });
  
        response.push({
          color: global['hexGenerator'](),
          pretext: `${category.title}:`,
          fields: fields
        });
      });
      
      this._callback(response);
    }
  }
  
  module.exports = HelpCommands;  
})();
