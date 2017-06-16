
export class Standard {
    
    public hasStatus:string;
    public norm:string;
    public hasPublicationDate:Date;

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
    
    public static ConvertFromJson(jsonData:any) :Standard
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
            else if(prop == "isPartOf"){}
            else if(prop == "relatedto"){}
            else if(prop == "developer"){
                standard.developer = new SDO();
            }
            else if(prop == "publisher"){}
            else if(prop == "scope"){}
            else if(prop == "hasISA95Level"){}
            else if(prop == "licence"){}
            else if(prop == "ramiHierarchyLevel"){}
            else if(prop == "hasRAMIITLayer"){}
            else if(prop == "hasAdminShellSubmodel"){}

        }    

        return standard;
    }
}

export class SDO{

    public orgName:string;
    public formationDate:Date;
    public abbreviation:String[];

    public static ConvertFromJson(jsonData:string) :SDO
    {
        let sdo = new SDO();
        
        for(let prop of jsonData.split("|"))
        {
            for(let value of )
        }

        return sdo;
    }
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
