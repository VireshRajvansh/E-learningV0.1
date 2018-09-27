/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StateManageUpdateComponent } from 'app/entities/state-manage/state-manage-update.component';
import { StateManageService } from 'app/entities/state-manage/state-manage.service';
import { StateManage } from 'app/shared/model/state-manage.model';

describe('Component Tests', () => {
    describe('StateManage Management Update Component', () => {
        let comp: StateManageUpdateComponent;
        let fixture: ComponentFixture<StateManageUpdateComponent>;
        let service: StateManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StateManageUpdateComponent]
            })
                .overrideTemplate(StateManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StateManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StateManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.state = entity;
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
                    const entity = new StateManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.state = entity;
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
