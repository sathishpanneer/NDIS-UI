export interface TripTypeInput{
    tripTypeID: number;
    description: string;
    customerRequired: boolean;
    vehicleType: number;
    billableToSalesForce: boolean;
    costCenterType: number;
    defaultCostCenter: string;

}