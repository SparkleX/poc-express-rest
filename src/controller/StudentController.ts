import {controller,httpGet, httpPost, httpPut, httpDelete, requestParam, BaseHttpController, request} from "inversify-express-utils";
import {Transaction} from "../user/Transaction"
import {StudentRepo } from "../repository/StudentRepo";
import { Student } from "../domain/Student";
import * as express from "express"
import { inject} from "inversify";
import {TYPES} from "../Types"

@controller("/student")
export class StudentController extends BaseHttpController{
	
	@inject(TYPES.StudentRepo) private repoStudent: StudentRepo;


	@httpGet("/", Transaction)
	public async findAll(): Promise<Student[]> {
		return await this.repoStudent.findAll();
	}

	@httpGet("/:id", Transaction)
	public async get(@requestParam("id") id: Number): Promise<Student> {
		return await this.repoStudent.findById(id);
	} 
	@httpPost("/", Transaction)
	public async create(@request() req: express.Request): Promise<any> {
		var data = req.body;
		await this.repoStudent.insert(data);
		return "OK";
	} 
	@httpPut("/:id", Transaction)
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
