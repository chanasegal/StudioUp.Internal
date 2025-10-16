export class CustomerType {
    id?: number;
    title?: string;
    isActive?:boolean;

    constructor(title: string) {
        this.title = title;
    }
}
