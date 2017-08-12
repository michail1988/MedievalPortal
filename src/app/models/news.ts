export class News {
    constructor(
            public id: string,
            public author: string,
            public title: string,
            public content: string,
            public headline: string,
            public status: string
        ) { }
    
    public fk_editor: string
    
}