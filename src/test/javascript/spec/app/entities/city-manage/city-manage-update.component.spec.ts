/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { CityManageUpdateComponent } from 'app/entities/city-manage/city-manage-update.component';
import { CityManageService } from 'app/entities/city-manage/city-manage.service';
import { CityManage } from 'app/shared/model/city-manage.model';

describe('Component Tests', () => {
    describe('CityManage Management Update Component', () => {
        let comp: CityManageUpdateComponent;
        let fixture: ComponentFixture<CityManageUpdateComponent>;
        let service: CityManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CityManageUpdateComponent]
            })
                .overrideTemplate(CityManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CityManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CityManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.city = entity;
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
                    const entity = new CityManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.city = entity;
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
