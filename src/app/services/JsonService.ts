import { Standard,SDO,Domain,ISA95Level,StandardLicence,StandardParts,RAMIITLayer,RAMIHierarchyLevel,AdminShellSubmodel } from '../model/STO';

export class JsonUtilityService{
  
	public static parseJsonDetailsResponse(jsonResponse: any): Standard {
		
		let standard = new Standard();       
		
		for (let property in jsonResponse) {	
		    if (property == "hasStatus"){
                standard[property] = jsonResponse[property]["value"];
            }
            else if(property == "norm") {
                Standard.setPropertyDataForSplit(standard.norm,jsonResponse[property]["value"])
            }
            else if (property == "hasPublicationDate") {
                standard[property] = new Date(jsonResponse[property]["value"]);
            }
            else if (property == "pubformationDate") {
                Standard.setPropertyDataWithManyToOne(standard,"publisher","formationDate",jsonResponse[property]["value"],SDO,Date)
            }
            else if (property == "pubabbreviation") {
                Standard.setPropertyForSplitDataWithManyToOne(standard,"publisher","abbreviation",jsonResponse[property]["value"],SDO)
            }
            else if (property == "puborgName") {
                Standard.setPropertyForSplitDataWithManyToOne(standard,"publisher","orgName",jsonResponse[property]["value"],SDO)
            }
            else if (property == "devformationDate") {
                Standard.setPropertyDataWithManyToOne(standard,"developer","formationDate",jsonResponse[property]["value"],SDO,Date)
            }
            else if (property == "devabbreviation") {
                Standard.setPropertyForSplitDataWithManyToOne(standard,"developer","abbreviation",jsonResponse[property]["value"],SDO)
            }
            else if (property == "devorgName") {
                Standard.setPropertyForSplitDataWithManyToOne(standard,"developer","orgName",jsonResponse[property]["value"],SDO)
            }
        }
        return standard;
    }

	public static parseJsonFromGraphNodes(jsonResponse: any): any {
		
        if(jsonResponse["publisher"]["value"] === "" || jsonResponse["norm"]["value"] === "") return null;
        let standard:any = {};
        standard.name = jsonResponse["publisher"]["value"].split("|")[0]+ "_" + jsonResponse["norm"]["value"].split("|")[0];
        standard.label = jsonResponse["publisher"]["value"].split("|")[0]+ "_" + jsonResponse["norm"]["value"].split("|")[0];
        var getTempVal = jsonResponse["x"]["value"].split("/")[4].split("#");
        standard.id = getTempVal[0] + ":" + getTempVal[1];
        return standard;
    }
   
   
   
    public static parseJsonSerachResponse(jsonResponse: any): Standard {

        var standard = new Standard();
        if(jsonResponse["std"] === null || jsonResponse["std"] === undefined) return null;
        if(String(jsonResponse["std"]["value"]).replace(" ","") === "") return null;   
			standard.uri = "sto:" + jsonResponse["std"]["value"].split("#")[1];
		
		for (let property in jsonResponse){
			
            if (property == "hasStatus"){
                standard[property] = jsonResponse[property]["value"];
            }
            else if(property == "norm") {
                Standard.setPropertyDataForSplit(standard[property],jsonResponse[property]["value"])
            }
            else if (property == "hasPublicationDate") {
                standard[property] = new Date(jsonResponse[property]["value"]);
            }
            else if (property == "publisher") {
                Standard.setPropertyForSplitDataWithManyToOne(standard,"publisher","abbreviation",jsonResponse[property]["value"],SDO)
            }
        }

        return standard;
    }
   
   
}