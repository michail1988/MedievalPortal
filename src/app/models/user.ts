export class User {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public registerdate: Date,
        public email: string,
        public password: string,
        public university: string,
        public phone: string,
        public congressrole: string,
        public subjectdescription: string,
        public contactcomments: string,
        public confirmation: string,
        public privileges: string
    ) { }
}