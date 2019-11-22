import { Container } from "inversify";
import { RepoHandlerImpl } from "./user/Transaction";
import {CrudRepositoryAdapter, AnsiAdapter } from "core-repository-crud";
import {RepositoryFactory } from "core-repository";
import { TYPES } from "./Types";
import "./repository"
import { StudentRepo } from "./repository/StudentRepo";
import { Student } from "./domain/Student";
//


var handler = new RepoHandlerImpl();
var adapter:CrudRepositoryAdapter = new AnsiAdapter();

const container = new Container({skipBaseClassChecks: true});
//container.bind<Student>(TYPES.OCRDService).to(OCRDService);

//container.bind<StudentRepo>(TYPES.StudentRepo).to(StudentRepo).inSingletonScope();

//container.bind<StudentRepo>(TYPES.StudentRepo).to(StudentRepo);

container.bind<StudentRepo>(TYPES.StudentRepo).to(StudentRepo).onActivation( 
    (context, repo) => {
		var repoStudent = RepositoryFactory.newRepository(StudentRepo, handler);
		repoStudent.postConstruct(handler, adapter, Student);
        return repoStudent;
    }
);

export { container };