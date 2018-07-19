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
        public privileges: string,
        public summary: string,
        public abstract: string,
        public paper_acceptation: string,
        public payment: string,
        public payment_accepted: string,
        public academic_title: string,
        public academic_status: string, 
        public master: string, 
        public engineer: string,
        public participation: string,
        public invoice: string,
        public invoice_data: string,
        public accommodation: string,
        public accommodation_from: Date,
        public accommodation_to: Date,
        public meal: string,
        public lactose_intolerance: string,
        public gluten_intolerance: string
    ) { }
    
    public fk_editor: string
}