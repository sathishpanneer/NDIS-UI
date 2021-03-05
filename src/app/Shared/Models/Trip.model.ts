export interface Trip{
    tripID: string;
    tripTypeID: string;
    tripDescription: string;
    registration: string;
    plannedKM: string;
    actualKM: string;
    startDate: Date;
    endDate : Date;
    plannedStartStreet: string;
    plannedStartCity: string;
    plannedStartState: string;
    plannedStartPostalCode: string;
    tripStatus: number;
    multiTrip: boolean;
    highlighted?: boolean;
    hovered?: boolean;
}