/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StudentManageUpdateComponent } from 'app/entities/student-manage/student-manage-update.component';
import { StudentManageService } from 'app/entities/student-manage/student-manage.service';
import { StudentManage } from 'app/shared/model/student-manage.model';

describe('Component Tests', () => {
    describe('StudentManage Management Update Component', () => {
        let comp: StudentManageUpdateComponent;
        let fixture: ComponentFixture<StudentManageUpdateComponent>;
        let service: StudentManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StudentManageUpdateComponent]
            })
                .overrideTemplate(StudentManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StudentManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StudentManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.student = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StudentManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.student = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
