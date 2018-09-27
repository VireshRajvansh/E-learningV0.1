/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { ServicesManageUpdateComponent } from 'app/entities/services-manage/services-manage-update.component';
import { ServicesManageService } from 'app/entities/services-manage/services-manage.service';
import { ServicesManage } from 'app/shared/model/services-manage.model';

describe('Component Tests', () => {
    describe('ServicesManage Management Update Component', () => {
        let comp: ServicesManageUpdateComponent;
        let fixture: ComponentFixture<ServicesManageUpdateComponent>;
        let service: ServicesManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ServicesManageUpdateComponent]
            })
                .overrideTemplate(ServicesManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServicesManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ServicesManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.services = entity;
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
                    const entity = new ServicesManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.services = entity;
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
