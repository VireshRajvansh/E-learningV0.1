/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { EducationCollegeManageUpdateComponent } from 'app/entities/education-college-manage/education-college-manage-update.component';
import { EducationCollegeManageService } from 'app/entities/education-college-manage/education-college-manage.service';
import { EducationCollegeManage } from 'app/shared/model/education-college-manage.model';

describe('Component Tests', () => {
    describe('EducationCollegeManage Management Update Component', () => {
        let comp: EducationCollegeManageUpdateComponent;
        let fixture: ComponentFixture<EducationCollegeManageUpdateComponent>;
        let service: EducationCollegeManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationCollegeManageUpdateComponent]
            })
                .overrideTemplate(EducationCollegeManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EducationCollegeManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationCollegeManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EducationCollegeManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.educationCollege = entity;
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
                    const entity = new EducationCollegeManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.educationCollege = entity;
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
