/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { GalleryGroupManageDeleteDialogComponent } from 'app/entities/gallery-group-manage/gallery-group-manage-delete-dialog.component';
import { GalleryGroupManageService } from 'app/entities/gallery-group-manage/gallery-group-manage.service';

describe('Component Tests', () => {
    describe('GalleryGroupManage Management Delete Component', () => {
        let comp: GalleryGroupManageDeleteDialogComponent;
        let fixture: ComponentFixture<GalleryGroupManageDeleteDialogComponent>;
        let service: GalleryGroupManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryGroupManageDeleteDialogComponent]
            })
                .overrideTemplate(GalleryGroupManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GalleryGroupManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryGroupManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
