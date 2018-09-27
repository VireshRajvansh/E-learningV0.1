/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { TeacherManageUpdateComponent } from 'app/entities/teacher-manage/teacher-manage-update.component';
import { TeacherManageService } from 'app/entities/teacher-manage/teacher-manage.service';
import { TeacherManage } from 'app/shared/model/teacher-manage.model';

describe('Component Tests', () => {
    describe('TeacherManage Management Update Component', () => {
        let comp: TeacherManageUpdateComponent;
        let fixture: ComponentFixture<TeacherManageUpdateComponent>;
        let service: TeacherManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TeacherManageUpdateComponent]
            })
                .overrideTemplate(TeacherManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TeacherManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TeacherManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.teacher = entity;
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
                    const entity = new TeacherManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.teacher = entity;
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
