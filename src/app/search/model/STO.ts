
export class Standard {
    constructor(
        public hasStatus:string,
        public hasNorm:string,
        public hasPublicationDate:Date,
        public developer:SDO,
        public publisher:SDO,
        public scope:Domain,
        public hasISA95Level:ISA95Level,
        public licence:StandardLicence,
        public isPartOf:StandardParts[],
        public relatedto:Standard[],
        public ramiHierarchyLevel:RAMIHierarchyLevel,
        public hasRAMIITLayer:RAMIITLayer,
        public hasAdminShellSubmodel:AdminShellSubmodel
        ){}
}

export class SDO{
    constructor(public orgName:string,
    public fomationDate:Date,
    public abbreviation:String){}
}

export class Domain{
    constructor(public domainName:String){}
}

export class ISA95Level{
    constructor(public hasObjective:String,
    public hasTask:String,
    public hasTimeFrame:String
    ){}
}

export class StandardLicence{
    constructor(public licenseTerms:String,
    public usageTypes:String){}
}

export class StandardParts{
    constructor(public stoPartName:String){}
}

export class RAMIITLayer{
    constructor(public Layer:String){}
}

export class RAMIHierarchyLevel{
    constructor(public Label:String){}
}

export class AdminShellSubmodel{
    constructor(public Label:String){}
}
