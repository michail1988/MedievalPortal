export class NewsHistory {
    constructor(
            public author: string,
            public title: string,
            public content: string,
            public headline: string,
            public editor: string,
            public modified_date: Date
        ) { }
}
