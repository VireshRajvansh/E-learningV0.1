/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { CardExpiryReminderManageDeleteDialogComponent } from 'app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage-delete-dialog.component';
import { CardExpiryReminderManageService } from 'app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage.service';

describe('Component Tests', () => {
    describe('CardExpiryReminderManage Management Delete Component', () => {
        let comp: CardExpiryReminderManageDeleteDialogComponent;
        let fixture: ComponentFixture<CardExpiryReminderManageDeleteDialogComponent>;
        let service: CardExpiryReminderManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CardExpiryReminderManageDeleteDialogComponent]
            })
                .overrideTemplate(CardExpiryReminderManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardExpiryReminderManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardExpiryReminderManageService);
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
