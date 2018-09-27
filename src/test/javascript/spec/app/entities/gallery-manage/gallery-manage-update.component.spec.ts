/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { GalleryManageUpdateComponent } from 'app/entities/gallery-manage/gallery-manage-update.component';
import { GalleryManageService } from 'app/entities/gallery-manage/gallery-manage.service';
import { GalleryManage } from 'app/shared/model/gallery-manage.model';

describe('Component Tests', () => {
    describe('GalleryManage Management Update Component', () => {
        let comp: GalleryManageUpdateComponent;
        let fixture: ComponentFixture<GalleryManageUpdateComponent>;
        let service: GalleryManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryManageUpdateComponent]
            })
                .overrideTemplate(GalleryManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GalleryManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GalleryManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gallery = entity;
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
                    const entity = new GalleryManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gallery = entity;
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
