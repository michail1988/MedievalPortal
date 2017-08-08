export class Comment {
    constructor(
            public parentcomment: string,
            public parentdate: Date,
            public parentid: string,
            public parentusername: string,
            public parentconfirmed: string,
            public comment: string,
            public date: Date,
            public id: string,
            public username: string,
            public confirmed: string
        ) { }
    
    public fk_user: string;
    public fk_post: string;
}