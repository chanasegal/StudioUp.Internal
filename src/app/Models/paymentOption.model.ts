export class PaymentOption {
    id?: number;
    title?: string;
    isActive?:boolean
    constructor(title: string) {
        this.title = title;
    }
}