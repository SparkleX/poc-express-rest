import { CoreTransaction, getConnection } from "../core/Transaction";
import {createNamespace, getNamespace,Namespace } from 'cls-hooked';
import { Connection } from "db-conn";
import { NextFunction, Request, Response } from 'express';

import { RepositoryHandler, RepositoryFactory } from "core-repository";


var session:Namespace = createNamespace('session-namespace');
var sessionRead:Namespace = getNamespace('session-namespace');

export async function Transaction(req:Request, res:Response, next:NextFunction) {
	return CoreTransaction(req, res, next, global['pool'], session );
}


export class RepoHandlerImpl implements RepositoryHandler {
    async execute(sql: string, ...params: any): Promise<any> {
		var conn:Connection = getConnection(sessionRead);
		console.log(sql);
		var rt = await conn.execute(sql, params[0]);
		return rt.recordset;
    }
}