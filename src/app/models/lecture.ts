export class Lecture {
    constructor(
            public id: string,
            public headline: string,
            public title: string,
            public author: string,
            public content: string,
            public contact: string,
            public place: string,
            public date: string,
            public status: string
        ) { }
    
    public fk_editor: string
}
