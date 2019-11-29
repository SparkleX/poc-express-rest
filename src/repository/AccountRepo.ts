import { CrudRepository, CrudRepositoryAdapter } from "core-repository-crud"
import { Account } from '../models/Account';
import { RepositoryHandler, Query } from "core-repository";
import { injectable, unmanaged } from "inversify";

@injectable()
export class AccountRepo extends CrudRepository<Account, Number> 
{
	@Query(`select * from "Account" where "firstName"=?`)
	public async findByFirstName(firstName:string):Promise<Account[]> {return [];}
}