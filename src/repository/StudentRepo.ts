import { CrudRepository, CrudRepositoryAdapter } from "core-repository-crud"
import { Student } from '../models/Student';
import { RepositoryHandler, Query } from "core-repository";
import { injectable, unmanaged } from "inversify";

@injectable()
export class StudentRepo extends CrudRepository<Student, Number> 
{
	@Query(`select * from "Student" where "firstName"=?`)
	public async findByFirstName(firstName:string):Promise<Student[]> {return [];}
}