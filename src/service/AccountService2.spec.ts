import {BaseService} from "./BaseService";
import { AccountService } from "./AccountService"
import { AccountRepo } from '../repository/AccountRepo';
import { Account } from '../models/Account';
import "reflect-metadata"
import { Container } from "inversify";
import {TYPES} from "../Types"
import * as mockito from "ts-mockito"

let repoAccount: AccountRepo;
let container: Container ;

beforeEach( function() {
	repoAccount = mockito.mock(AccountRepo);
	var handler = mockito.instance(repoAccount);
	container = new Container();
	container.bind<AccountService>(TYPES.AccountService).to(AccountService);
	container.bind<AccountRepo>(TYPES.AccountRepo).toConstantValue(handler);
});


test('test', async () => {
	var accounts:Account[] = [];
	mockito.when(repoAccount.findByFirstName('123')).thenResolve(accounts);

	var service:AccountService = container.get<AccountService>(TYPES.AccountService);

	var account = await service.test();

	mockito.verify(repoAccount.findByFirstName('123')).called();
	expect(account).toBe(accounts);		
});