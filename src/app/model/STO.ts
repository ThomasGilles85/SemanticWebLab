
export class Standard {

    public hasStatus: string;
    public norm: string[];
    public hasPublicationDate: Date;
    public uri:String;

    constructor() {
        this.hasStatus = "No data";
        this.norm = ["No data"];
        this.hasPublicationDate = new Date(1, 1, 1);

        this.developer  = [new SDO()];
        this.publisher  = [new SDO()];
        this.scope = new Domain("No data");
        this.licence = new StandardLicence("No data","No data")
        this.ramiHierarchyLevel = [new RAMIHierarchyLevel("No data")];
        this.hasRAMIITLayer = new RAMIITLayer("No data");
        this.hasAdminShellSubmodel = new AdminShellSubmodel("No data");
        this.relatedto = [];
        this.isPartOf = [new StandardParts("No Data")];



    }

    public developer: SDO[];
    public publisher: SDO[];
    public scope: Domain;
    public hasISA95Level: ISA95Level;
    public licence: StandardLicence;
    public isPartOf: StandardParts[];
    public relatedto: Standard[];
    public ramiHierarchyLevel: RAMIHierarchyLevel[];
    public hasRAMIITLayer: RAMIITLayer;
    public hasAdminShellSubmodel: AdminShellSubmodel;

    public static setPropertyForSplitDataWithManyToOne(refObject:Standard, targetObjectProperty:string,propertyName:string, splitData:string, typeObject:any)
    {
        var data = splitData.split("#");

        if (refObject[targetObjectProperty] === undefined) refObject[targetObjectProperty] = new Array(data.length);

        var index = 0;
        while (index < data.length) {
            if (refObject[targetObjectProperty][index] === undefined) refObject[targetObjectProperty][index] = new typeObject();
            var splitLabels = data[index].split("|");
            var indexLabels = 0;
            while (indexLabels < splitLabels.length) {               
                refObject[targetObjectProperty][index][propertyName][indexLabels] = splitLabels[indexLabels];
                indexLabels++;
            }
            index++;
        }
    }

    public static setPropertyDataWithManyToOne(refObject:Standard, targetObjectProperty:string,propertyName:string, splitData:any, typeObject:any,DataType:any=String)
    {
        var data = splitData.split("#");

        if (refObject[targetObjectProperty] === undefined) refObject[targetObjectProperty] = new Array(data.length);
        var index = 0;
        while (index < data.length) {
            if(refObject[targetObjectProperty][index] === undefined) refObject[targetObjectProperty][index] = new typeObject();   
            try{     
                refObject[targetObjectProperty][index][propertyName] = new DataType(data[index]);
            }
            catch(ex)
            {}
            index++;
        }
    }

    public static setPropertyDataForSplit(refObject:any,splitData:string)
    {
        var data = splitData.split("|");

        var index = 0;
        refObject[index] = [];
        while (index < data.length) {
            refObject[index] = data[index];
            index++;
        }
    }

   
}



export class SDO {
    public orgName: string[];
    public abbreviation: String[];

    constructor(orgName: string[] = ["No data"], formationDate: Date = new Date(), abbreviation: string[] = ["No data"]) {
        this.orgName = orgName;
        this._formationDate = formationDate;
        this.abbreviation = abbreviation;
    }

    private _formationDate: Date;
    public get formationDate() : Date {
        return this._formationDate;
    }
    public set formationDate(v : Date) {
        if(!isNaN(v.getTime())){this._formationDate = v;}
    }
    


}

export class Domain {
    constructor(public domainName: String) { }
}

export class ISA95Level {
    constructor(public hasObjective: String,
        public hasTask: String,
        public hasTimeFrame: String
    ) { }
}

export class StandardLicence {
    constructor(public licenseTerms: String,
        public usageTypes: String) { }
}

export class StandardParts {
    constructor(public stoPartName: String) { }
}

export class RAMIITLayer {
    constructor(public Layer: String) { }
}

export class RAMIHierarchyLevel {
    constructor(public Label: String) { }
}

export class AdminShellSubmodel {
    constructor(public Label: String) { }
}
