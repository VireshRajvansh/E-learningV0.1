/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { GalleryManageDeleteDialogComponent } from 'app/entities/gallery-manage/gallery-manage-delete-dialog.component';
import { GalleryManageService } from 'app/entities/gallery-manage/gallery-manage.service';

describe('Component Tests', () => {
    describe('GalleryManage Management Delete Component', () => {
        let comp: GalleryManageDeleteDialogComponent;
        let fixture: ComponentFixture<GalleryManageDeleteDialogComponent>;
        let service: GalleryManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryManageDeleteDialogComponent]
            })
                .overrideTemplate(GalleryManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GalleryManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryManageService);
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
