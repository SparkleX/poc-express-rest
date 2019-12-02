import { BaseService } from './BaseService';
import { injectable, inject } from 'inversify';
import { AccountRepo } from '../repository/AccountRepo';
import { TYPES } from "../Types";
import { Account } from '../models/Account';

@injectable()
export class AccountService extends BaseService{
	
	@inject(TYPES.AccountRepo)
	public repository:AccountRepo;

	public async test():Promise<Account[]> {
		var rt = this.repository.findByFirstName("123");
		return rt;
	}	
}