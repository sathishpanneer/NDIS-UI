export interface Rates{
    rateID: number;
    vehicleCategory: string;
    rate: number;
    unitOfMeasure: string;
    startDate: Date;
    endDate: Date;
    highlighted?: boolean;
    hovered?: boolean;
}