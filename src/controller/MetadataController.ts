import { controller, BaseHttpController,requestParam,httpGet } from "inversify-express-utils";
import { Metadata, MdTable } from "db-conn";
import { FsUtils } from "../utils/FsUtil";
//import * as  readdir from "fs-readdir-promise";

@controller("/api/metadata")
export class MetadataController extends BaseHttpController{
	
	@httpGet("/")
	public async getAll(): Promise<any> {
		var rt = {};
		var files:string [] = await FsUtils.readdir('resources/table/');
		for(let file of files) {
			var mdTable:MdTable = await Metadata.load('resources/table/' + files);
			rt[mdTable.name] = mdTable;
		}		
		return rt;
	} 

	@httpGet("/:table")
	public async get(@requestParam("table") table: string): Promise<MdTable> {
		var mdTable:MdTable = await Metadata.load(`resources/table/${table}.table.json`);
		return mdTable;
	} 

}