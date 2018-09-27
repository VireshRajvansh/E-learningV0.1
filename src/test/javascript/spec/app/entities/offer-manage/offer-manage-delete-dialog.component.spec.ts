/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { OfferManageDeleteDialogComponent } from 'app/entities/offer-manage/offer-manage-delete-dialog.component';
import { OfferManageService } from 'app/entities/offer-manage/offer-manage.service';

describe('Component Tests', () => {
    describe('OfferManage Management Delete Component', () => {
        let comp: OfferManageDeleteDialogComponent;
        let fixture: ComponentFixture<OfferManageDeleteDialogComponent>;
        let service: OfferManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [OfferManageDeleteDialogComponent]
            })
                .overrideTemplate(OfferManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OfferManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferManageService);
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
