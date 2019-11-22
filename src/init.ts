import {SqlJsConnectionPool, initSqlJs} from 'db-conn-sqljs';
import {Connection, ConnectionPool} from "db-conn";


export async function initDatabase ():Promise<ConnectionPool> {
	var SQL = await initSqlJs();
	var pool:ConnectionPool = new SqlJsConnectionPool();
	await pool.open(SQL);
	var conn:Connection = await pool.getConnection();
	await conn.execute('create table Student (id integer primary key, firstName, lastName)');
	await conn.execute(`insert into Student(id, firstName, lastName) values(100, 'Wu', 'Wang')`);
	await conn.execute(`insert into Student(id, firstName, lastName) values(101, 'Liu', 'Liu')`);

	return pool;
}


