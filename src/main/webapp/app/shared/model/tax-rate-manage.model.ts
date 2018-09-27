export interface ITaxRateManage {
    id?: number;
    displayName?: string;
    totalTaxInPct?: number;
    stateId?: number;
}

export class TaxRateManage implements ITaxRateManage {
    constructor(public id?: number, public displayName?: string, public totalTaxInPct?: number, public stateId?: number) {}
}
