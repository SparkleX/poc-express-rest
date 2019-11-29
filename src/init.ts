import { SqlJsConnectionPool, SqlJsConnection, SqlJsDdlBuilder, initSqlJs } from 'db-conn-sqljs';
import { Connection, ConnectionPool, DdlBuilder, Metadata, MdTable } from "db-conn"
import * as fs from 'fs'

export async function initDatabase ():Promise<ConnectionPool> {
	var SQL = await initSqlJs();
	var pool:ConnectionPool = new SqlJsConnectionPool();
	await pool.open(SQL);
	var conn:Connection = await pool.getConnection();


	var table:MdTable = await Metadata.load("resources/table/Account.table.json");
	var ddlBuilder:DdlBuilder = new SqlJsDdlBuilder();
	var sqls = ddlBuilder.createTable(table);
	await conn.execute(sqls[0]);

	var sql = ddlBuilder.insertSql(table);
	console.dir(sql);
	let rawdata = fs.readFileSync("resources/data/Account.data.json").toString();
	var data = JSON.parse(rawdata);
	var paramsArray = ddlBuilder.insertData(table, data);
	for(let param of paramsArray) {
		await conn.execute(sql, param);		
	}
	conn.setAutoCommit(false);
	console.dir(await conn.executeQuery("select * from Account", undefined));
	conn.commit();
	return pool;
}


