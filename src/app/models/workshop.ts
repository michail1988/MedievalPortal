export class Workshop {
    constructor(
            public id: string,
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