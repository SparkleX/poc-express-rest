import {controller,httpGet, httpPost, httpPut, httpDelete, requestParam, request} from "inversify-express-utils";
import {Transaction, RepoHandlerImpl} from "../user/Transaction"
import {CrudRepositoryAdapter, AnsiAdapter } from "core-repository-crud";
import {StudentRepo } from "../repository/StudentRepo";
import {RepositoryFactory } from "core-repository";
import { Student } from "../domain/Student";
import * as express from "express"


@controller("/student")
export class StudentController{

	private repoStudent:StudentRepo;
	constructor () {
		var handler = new RepoHandlerImpl();
		var adapter:CrudRepositoryAdapter = new AnsiAdapter();
		this.repoStudent = RepositoryFactory.newRepository(StudentRepo, handler, [handler, adapter]);
	}

	@httpGet("/", Transaction)
	public async findAll(): Promise<any> {
		return await this.repoStudent.findAll();
	}

	@httpGet("/:id", Transaction)
	public async get(@requestParam("id") id: Number): Promise<any> {
		return await this.repoStudent.findById(id);
	} 
	@httpPost("/", Transaction)
	public async create(@request() req: express.Request): Promise<any> {
		var data = req.body;
		await this.repoStudent.insert(data);
		return "OK";
	} 
	@httpPut("/api/student/:id", Transaction)
	public async update(@requestParam("id") id: Number, @request() req: express.Request): Promise<any> {
		await this.repoStudent.updateById(id, req.body);
		return "OK";
	}
	@httpDelete("/:id", Transaction)
	public async delete(@requestParam("id") id: Number): Promise<any> {
		await this.repoStudent.deleteById(1);
		return "deleted";
	}			
}
