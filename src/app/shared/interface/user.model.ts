export class User {
    public mintUserId: number;
    public onelineUserId: number;
    public username: string;
    public title: string;
    public firstName: string;
    public lastName: string;
    public primaryEmail: string;
    public emailValidationStatus: boolean;
    public permissionFlag: Boolean;
    public activeSIM: string;
    public actor: string[];
    public singleContractFlag: boolean;
    public singleCardFlag: boolean;
    public contactPhoneNumber: string;
    public otherAdminMboId?: string;

    public partyRoleId: string;

    constructor () { 
    }
}


