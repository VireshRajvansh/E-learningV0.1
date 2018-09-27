import { IStudentManage } from 'app/shared/model//student-manage.model';
import { ITeacherManage } from 'app/shared/model//teacher-manage.model';

export interface IEducationCollegeManage {
    id?: number;
    name?: string;
    students?: IStudentManage[];
    teachers?: ITeacherManage[];
}

export class EducationCollegeManage implements IEducationCollegeManage {
    constructor(public id?: number, public name?: string, public students?: IStudentManage[], public teachers?: ITeacherManage[]) {}
}
