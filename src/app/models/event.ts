export class Event {
    constructor(
            public id: string,
            public from_date: Date,
            public to_date: Date,
            public fk_schedule: string,
            public title: string,
            public description: string
        ) { }
}