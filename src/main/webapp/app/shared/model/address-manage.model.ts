export interface IAddressManage {
    id?: number;
    type?: string;
    addressLine1?: string;
    addressLine2?: string;
    zipCode?: string;
    city?: string;
    state?: string;
    landmark?: string;
    country?: string;
    lat?: number;
    lng?: number;
}

export class AddressManage implements IAddressManage {
    constructor(
        public id?: number,
        public type?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public zipCode?: string,
        public city?: string,
        public state?: string,
        public landmark?: string,
        public country?: string,
        public lat?: number,
        public lng?: number
    ) {}
}
