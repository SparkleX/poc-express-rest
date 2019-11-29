import {controller,httpGet, httpPost, httpPut, httpDelete, requestParam, BaseHttpController, request} from "inversify-express-utils";
import {Transaction} from "../user/Transaction"
import {AccountRepo as AccountRepo } from "../repository/AccountRepo";
import { Account } from "../models/Account";
import * as express from "express"
import { inject} from "inversify";
import {TYPES} from "../Types"

@controller("/api/Account")
export class AccountController extends BaseHttpController{
	
	@inject(TYPES.AccountRepo) private repoAccount: AccountRepo;


	@httpGet("/", Transaction)
	public async findAll(): Promise<Account[]> {
		
		var rt:Account[] =  await this.repoAccount.findAll();
		return rt;
	}

	@httpGet("/:id", Transaction)
	public async get(@requestParam("id") id: Number): Promise<Account> {
		return await this.repoAccount.findById(id);
	} 
	@httpPost("/", Transaction)
	public async create(@request() req: express.Request): Promise<any> {
		var data = req.body;
		await this.repoAccount.insert(data);
		return "OK";
	} 
	@httpPut("/:id", Transaction)
	public async update(@requestParam("id") id: Number, @request() req: express.Request): Promise<any> {
		await this.repoAccount.updateById(id, req.body);
		return "OK";
	}
	@httpDelete("/:id", Transaction)
	public async delete(@requestParam("id") id: Number): Promise<any> {
		await this.repoAccount.deleteById(1);
		return "deleted";
	}
}
