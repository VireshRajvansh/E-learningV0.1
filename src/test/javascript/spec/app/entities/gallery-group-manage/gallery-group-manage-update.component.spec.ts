/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { GalleryGroupManageUpdateComponent } from 'app/entities/gallery-group-manage/gallery-group-manage-update.component';
import { GalleryGroupManageService } from 'app/entities/gallery-group-manage/gallery-group-manage.service';
import { GalleryGroupManage } from 'app/shared/model/gallery-group-manage.model';

describe('Component Tests', () => {
    describe('GalleryGroupManage Management Update Component', () => {
        let comp: GalleryGroupManageUpdateComponent;
        let fixture: ComponentFixture<GalleryGroupManageUpdateComponent>;
        let service: GalleryGroupManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryGroupManageUpdateComponent]
            })
                .overrideTemplate(GalleryGroupManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GalleryGroupManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryGroupManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GalleryGroupManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.galleryGroup = entity;
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
                    const entity = new GalleryGroupManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.galleryGroup = entity;
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
