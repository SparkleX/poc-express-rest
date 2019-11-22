import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import "reflect-metadata";
import {InversifyExpressServer} from "inversify-express-utils";
import { container } from "./inversify.config";
import "./controller"
import {initDatabase} from "./init"
import {global} from "./global"


async function main() {
	global.pool = await initDatabase();
	let server = new InversifyExpressServer(container);
	server.setConfig(app => {
		app.use(morgan("tiny"));
		app.use(
			bodyParser.urlencoded({
			extended: true
			})
	  );
	  app.use(bodyParser.json());
	});
	
	let app = server.build();
	app.listen(3000);
	console.info('server start at port:3000');
}

main();