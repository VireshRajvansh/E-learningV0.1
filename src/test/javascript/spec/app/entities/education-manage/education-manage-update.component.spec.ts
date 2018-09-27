/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { EducationManageUpdateComponent } from 'app/entities/education-manage/education-manage-update.component';
import { EducationManageService } from 'app/entities/education-manage/education-manage.service';
import { EducationManage } from 'app/shared/model/education-manage.model';

describe('Component Tests', () => {
    describe('EducationManage Management Update Component', () => {
        let comp: EducationManageUpdateComponent;
        let fixture: ComponentFixture<EducationManageUpdateComponent>;
        let service: EducationManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationManageUpdateComponent]
            })
                .overrideTemplate(EducationManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EducationManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EducationManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.education = entity;
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
                    const entity = new EducationManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.education = entity;
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
