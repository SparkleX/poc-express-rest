import {ConnectionPool, Connection} from "db-conn"  
import { NextFunction, Request, Response } from 'express';
import { Namespace } from "cls-hooked";


const sessionKey = "1f4861aa-c532-428b-aa9b-c15212c62cc0";

export async function CoreTransaction(req:Request, res:Response, next:NextFunction, pool:ConnectionPool, session:Namespace) {
    var conn:Connection = await pool.getConnection();
    session.run(function () {
        session.set(sessionKey, conn);
        try{
			conn.setAutoCommit(false);
			next();
			conn.commit();
        }catch(err){
			console.error(err);
			conn.rollback();
			res.status(500).end(err.message);
		}
        finally{
			conn.close();
		}
	}); 
}

export function getConnection(session):Connection {
	return session.get(sessionKey);
}
