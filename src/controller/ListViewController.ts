import { controller, BaseHttpController,requestParam,httpGet } from "inversify-express-utils";

@controller("/api/list")
export class ListViewController extends BaseHttpController{
	
	@httpGet("")
	public async get(@requestParam("table") table: string): Promise<any> {
		return {
			column:[
				"id",
				"code",
				"name"
			]
		};
	}

}