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

interface Iconfig {
    // Weather API key
    OPEN_WEATHER_API_TOKEN?: string,
    // Jokes Mongo db thingies
    DB_NAME?: string,
    DB_USERNAME?: string,
    DB_USER_PASSWORD?: string,
    DB_URL_ADDRESS?: string
};

interface IslackPostField {
    title: string,
    value: string,
    short: boolean
}

interface IslackPost {
    attachments?: Array<IslackPost>,
    channel?: string,
    username: string,
    text?:string,
    color?: string,
    title?: string,
    image_url?: string
    fields: Array<IslackPostField>
}