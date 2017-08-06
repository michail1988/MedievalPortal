export class ContactMessage {
    constructor(
        public name: string,
        public email: string,
        public subject: string,
        public message: string,
        public date: Date
    ) { }
}
