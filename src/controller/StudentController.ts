import {controller,httpGet} from "inversify-express-utils";
import {Transaction, RepoHandlerImpl} from "../user/Transaction"
import {CrudRepositoryAdapter, AnsiAdapter } from "core-repository-crud";
import {StudentRepo } from "../repository/StudentRepo";
import {RepositoryFactory } from "core-repository";
import { Student } from "../domain/Student";

@controller("/api/student")
export class StudentController{
	@httpGet("/get", Transaction)
	public async get(): Promise<any> {
		var handler = new RepoHandlerImpl();
		var adapter:CrudRepositoryAdapter = new AnsiAdapter();
		var repoStudent:StudentRepo = RepositoryFactory.newRepository(StudentRepo, handler, [handler, adapter]);
		return await repoStudent.findAll();
	} 
	@httpGet("/create", Transaction)
	public async create(): Promise<any> {
		var handler = new RepoHandlerImpl();
		var adapter:CrudRepositoryAdapter = new AnsiAdapter();
		var repoStudent:StudentRepo = RepositoryFactory.newRepository(StudentRepo, handler, [handler, adapter]);

		var student = new Student();
		student.id = 1;
		student.firstName = "3";
		student.lastName = "Zhang";
		await repoStudent.insert(student);		
		return "OK";
	} 	
}
