module.exports = function(callback/*, slackData*/) {

  var commands = [
    {
      title: 'Useful commands',
      commands: [
        {
          command: '!date, !time',
          description: 'Date/time information'
        },
        {
          command: '!weather <Lviv>',
          description: 'Current weather conditions'
        },
        {
          command: '!tfl',
          description: 'Current tube lines status'
        },
        {
          command: '!commands',
          description: 'Available Bender bot commands'
        } 
      ]
    },
    {
      title: 'Entertaiment commands',
      commands: [
        {
          command: '!joke',
          description: 'Random joke'
        },
        {
          command: '!chucknorris',
          description: 'Random *Chuck Norris* joke'
        },
      ]
    }
  ];

  var response = [];

  for (var i = 0, b = commands.length; i < b; i++) {
    var fields = [];

    for (var a = 0, c = commands[i].commands.length; a < c; a++) {
      fields.push({
          "title": commands[i].commands[a].command,
          "value": commands[i].commands[a].description,
          "short": true
      });
    }

    response.push({
        "color": GLOBAL.hexGenerator(),
        "pretext": commands[i].title + ':',
        "fields": fields
    });
  }

  callback(response);
};