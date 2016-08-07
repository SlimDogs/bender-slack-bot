interface birthDate {
    day: number,
    month: number,
    year?: number
}

interface user {
    name: string,
    username: string,
    team: number,
    location: string,
    isDev: boolean,
    isTester: boolean,
    gender: string,
    birthday?: birthDate
}

interface slackOpts {
    userName: string,
    triggerWord: string,
    messageText: string,
    messageTextUpperCase: string
}