export class UserHistory {
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
        public editor: string,
        public modified_date: Date
    ) {


    }

    get showStudentOptions(): boolean { return this.academic_status === '1' }

    get showAcademicTitle(): boolean {
        return this.academic_status === '2'
    }

    get isAcceptationPending(): boolean {
        if ( 'Y' == this.confirmation || 'N' == this.confirmation ) {
            return false;
        }

        return true;
    }

    get isAccepted(): boolean {
        if ( 'Y' == this.confirmation ) {
            return true;
        }

        return false;
    }

    get isRejected(): boolean {
        if ( 'N' == this.confirmation ) {
            return true;
        }

        return false;
    }
}
