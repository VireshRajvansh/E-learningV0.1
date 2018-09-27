/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { TaxRateManageUpdateComponent } from 'app/entities/tax-rate-manage/tax-rate-manage-update.component';
import { TaxRateManageService } from 'app/entities/tax-rate-manage/tax-rate-manage.service';
import { TaxRateManage } from 'app/shared/model/tax-rate-manage.model';

describe('Component Tests', () => {
    describe('TaxRateManage Management Update Component', () => {
        let comp: TaxRateManageUpdateComponent;
        let fixture: ComponentFixture<TaxRateManageUpdateComponent>;
        let service: TaxRateManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TaxRateManageUpdateComponent]
            })
                .overrideTemplate(TaxRateManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaxRateManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxRateManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TaxRateManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.taxRate = entity;
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
                    const entity = new TaxRateManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.taxRate = entity;
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
