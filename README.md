
<p align="center">
  <a href="https://github.com/SlimDogs/bender-slack-bot"><img src="https://github.com/SlimDogs/bender-slack-bot/blob/master/docs/assets/logo.png?raw=true" alt="Bender - The Slack Bot" title="Bender - The Slack Bot" height="200px">
  <br>
  <br>
</p>

<p align="center">
  <a href="#" target="_blank"><img src="https://travis-ci.org/SlimDogs/bender-slack-bot.svg?branch=master" alt="Latest CI build status" title="Latest CI build status"></a>
  <a href="https://greenkeeper.io" target="_blank"><img src="https://badges.greenkeeper.io/SlimDogs/bender-slack-bot.svg" alt="Greenkeeper" title="Greenkeeper"></a>
  <a href="http://commitizen.github.io/cz-cli" target="_blank"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly" title="Commitizen friendly"></a>
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" title="MIT License"></a>
</p>

## Table of content
- [About](#about)
- [How to install](#installation)
- [Available commands](#commands)
- [Other features](#other-features)

## About
`bender-slack-bot`
Slack integration (based on outgoing web hooks) which enables certain cool commands for slack team members in enabled slack channels.

It also has some cron type functions such as checking and announcing about certain users birthdays, standup times and ect.

## Installation
- Clone the repository
- `npm install` - to install all required packages
- Update systen evnironmental variables:
  - `BSB_OPEN_WEATHER_API_TOKEN` - open weather api token for `!weather <city>` command to work
  - `BSB_DB_NAME`, `BSB_DB_USERNAME`, `BSB_DB_USER_PASSWORDE`, `BSB_DB_URL_ADDRESS` - width mongo db credentials for `!joke` command to work (p.s. you also need to import your jokes, see `jokesdb.txt` as sample)
- `npm run build` - to compile the app
- Optional but recommended step: deploying app to Heroku or similar service
- `npm start` - to run the bot server
- Configure slack
  - Add new `Outgoing hook` as a custom integration
  - Configure it to be enabled on channels where you want bot to be active
  - Set the trigger words to be: `!tfl,!joke,!chucknorris,!date,!time,!weather,!commands,Bender,bender,!codereview`
  - In `URLs` field add url to your compiled and deployed (or local) bender bot instance e.g. `https://benderthebot.herokuapp.com/slackBotTrigger`

## Commands
- !codereview <List of Names/optional>: randomly chooses a person for a code review.
- !tfl : sows current situation of London Tube Lines.
- !weather <city / optional> : shows weather information in specified city (London is default)
- !joke : tells a joke
- !churcknorris : tells a chuck norris joke

## Other features
- Announces stand up times
- Congratulates users when on their birthday!

Tested/Deployed to: Heroku
