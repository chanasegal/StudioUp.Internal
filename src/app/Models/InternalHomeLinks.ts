export class internalHomeLinks {
    id?: number;
    title?: string;
    link?:string;
    isExternal?:boolean;
    isActive?:boolean;

    constructor(title: string) {
        this.title = title;
    }
}