import { controller, BaseHttpController,requestParam,httpGet } from "inversify-express-utils";
import { Metadata, MdTable } from "db-conn"


@controller("/metadata")
export class MetadataController extends BaseHttpController{
	
	@httpGet("/:table")
	public async get(@requestParam("table") table: string): Promise<MdTable> {
		var mdTable:MdTable = await Metadata.load(`resources/table/${table}.table.json`);
		return mdTable;
	} 

}