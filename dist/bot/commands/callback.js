(function () {
    var HelpCommands = (function () {
        function HelpCommands(callback) {
            this._callback = callback;
            this.respond();
        }
        Object.defineProperty(HelpCommands.prototype, "commands", {
            get: function () {
                return [
                    {
                        title: 'Useful commands',
                        commands: [
                            { command: '!date, !time', description: 'Date/time information' },
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
            },
            enumerable: true,
            configurable: true
        });
        HelpCommands.prototype.respond = function () {
            var response = [];
            this.commands.forEach(function (category) {
                var fields = category.commands.map(function (command) {
                    return {
                        title: command.command,
                        value: command.description,
                        short: true
                    };
                });
                response.push({
                    color: global['hexGenerator'](),
                    pretext: category.title + ":",
                    fields: fields
                });
            });
            this._callback(response);
        };
        return HelpCommands;
    }());
    module.exports = HelpCommands;
})();