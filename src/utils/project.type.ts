export type ProjectResearchQuestion = {
    project: string,
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Project =  {
    _id: string;
    name: string;
    description: string;
    timeFrame: {
        start: Date,
        end: Date
    };
    status: string;
    createdAt: Date;
    updatedAt: Date;
}