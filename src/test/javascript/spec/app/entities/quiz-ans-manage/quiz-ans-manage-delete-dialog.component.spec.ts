/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { QuizAnsManageDeleteDialogComponent } from 'app/entities/quiz-ans-manage/quiz-ans-manage-delete-dialog.component';
import { QuizAnsManageService } from 'app/entities/quiz-ans-manage/quiz-ans-manage.service';

describe('Component Tests', () => {
    describe('QuizAnsManage Management Delete Component', () => {
        let comp: QuizAnsManageDeleteDialogComponent;
        let fixture: ComponentFixture<QuizAnsManageDeleteDialogComponent>;
        let service: QuizAnsManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizAnsManageDeleteDialogComponent]
            })
                .overrideTemplate(QuizAnsManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QuizAnsManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizAnsManageService);
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
