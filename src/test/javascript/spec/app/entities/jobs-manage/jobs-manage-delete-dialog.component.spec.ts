/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { JobsManageDeleteDialogComponent } from 'app/entities/jobs-manage/jobs-manage-delete-dialog.component';
import { JobsManageService } from 'app/entities/jobs-manage/jobs-manage.service';

describe('Component Tests', () => {
    describe('JobsManage Management Delete Component', () => {
        let comp: JobsManageDeleteDialogComponent;
        let fixture: ComponentFixture<JobsManageDeleteDialogComponent>;
        let service: JobsManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [JobsManageDeleteDialogComponent]
            })
                .overrideTemplate(JobsManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobsManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobsManageService);
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
