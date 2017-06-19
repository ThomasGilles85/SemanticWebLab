
export class Standard {
    
    public hasStatus:string;
    public norm:string;
    public hasPublicationDate:Date;

    constructor() {
        this.hasStatus ="No data";
        this.norm = "No data";
        this.hasPublicationDate = new Date(1,1,1);
    }

    public developer:SDO;
    public publisher:SDO;
    public scope:Domain;
    public hasISA95Level:ISA95Level;
    public licence:StandardLicence;
    public isPartOf:StandardParts[];
    public relatedto:Standard[];
    public ramiHierarchyLevel:RAMIHierarchyLevel;
    public hasRAMIITLayer:RAMIITLayer;
    public hasAdminShellSubmodel:AdminShellSubmodel;
    
    public static ConvertFromJsonForSearch(jsonData:any) :Standard
    {

        let standard = new Standard();

         for(let prop in jsonData)
        {
            if(prop == "hasStatus" || prop == "norm")
            {
                standard[prop] = jsonData[prop]["value"];    
            }
            else if(prop == "hasPublicationDate"){
                standard[prop] = new Date(jsonData[prop]["value"]);    
            }
        }    

        return standard;
    }
}

export class SDO{
    public orgName:string;
    public formationDate:Date;
    public abbreviation:String[];    
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
