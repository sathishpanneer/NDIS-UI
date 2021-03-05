export interface BillingLine{
    billingID: number;
    tripID: number;
    serviceAgreementID: string;
    serviceAgreementItemID: string;
    rate: number;
    unitOfMeasure: number;
    dateCreated: Date;
    dateTransferred: Date;
    approved: boolean;
}