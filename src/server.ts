import "reflect-metadata"
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as express from "express"
import * as compression from "compression";
import {InversifyExpressServer} from "inversify-express-utils";
import {container} from "./inversify.config";
import {initDatabase} from "./init"
import "./controller"


async function main() {
	global['pool'] = await initDatabase();
	let server = new InversifyExpressServer(container);
	server.setConfig(app => {
		app.use('/public', express.static('public'));
		app.use(morgan("tiny"));
		app.use(compression());
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