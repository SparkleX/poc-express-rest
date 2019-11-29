import { Container } from "inversify";
import { RepoHandlerImpl } from "./user/Transaction";
import {CrudRepositoryAdapter, AnsiAdapter } from "core-repository-crud";
import {RepositoryFactory } from "core-repository";
import { TYPES } from "./Types";
import "./repository"
import { AccountRepo } from "./repository/AccountRepo";
import { Account } from "./models/Account";
//


var handler = new RepoHandlerImpl();
var adapter:CrudRepositoryAdapter = new AnsiAdapter();

const container = new Container({skipBaseClassChecks: true});
//container.bind<Student>(TYPES.OCRDService).to(OCRDService);

//container.bind<StudentRepo>(TYPES.StudentRepo).to(StudentRepo).inSingletonScope();

//container.bind<StudentRepo>(TYPES.StudentRepo).to(StudentRepo);

container.bind<AccountRepo>(TYPES.AccountRepo).to(AccountRepo).onActivation( 
    (context, repo) => {
		var repoStudent = RepositoryFactory.newRepository(AccountRepo, handler);
		repoStudent.postConstruct(handler, adapter, Account);
        return repoStudent;
    }
);

export { container };