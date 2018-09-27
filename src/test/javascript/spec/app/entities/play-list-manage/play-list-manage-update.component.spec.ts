/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { PlayListManageUpdateComponent } from 'app/entities/play-list-manage/play-list-manage-update.component';
import { PlayListManageService } from 'app/entities/play-list-manage/play-list-manage.service';
import { PlayListManage } from 'app/shared/model/play-list-manage.model';

describe('Component Tests', () => {
    describe('PlayListManage Management Update Component', () => {
        let comp: PlayListManageUpdateComponent;
        let fixture: ComponentFixture<PlayListManageUpdateComponent>;
        let service: PlayListManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [PlayListManageUpdateComponent]
            })
                .overrideTemplate(PlayListManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlayListManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayListManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PlayListManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.playList = entity;
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
                    const entity = new PlayListManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.playList = entity;
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
