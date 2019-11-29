import * as fs from "fs"
export class FsUtils{
	public static async readdir(path: fs.PathLike):Promise<string[]> {
		var rt:Promise<string[]> = new Promise(function (resolve, reject) {
			fs.readdir(path, function(err, files) {
				if(err) {
					reject(err);
				}else {
					resolve(files);
				}
			});
		});
		return rt;
	
	}

}