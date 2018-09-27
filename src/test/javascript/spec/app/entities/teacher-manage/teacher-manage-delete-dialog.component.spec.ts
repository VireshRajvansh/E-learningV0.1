/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { TeacherManageDeleteDialogComponent } from 'app/entities/teacher-manage/teacher-manage-delete-dialog.component';
import { TeacherManageService } from 'app/entities/teacher-manage/teacher-manage.service';

describe('Component Tests', () => {
    describe('TeacherManage Management Delete Component', () => {
        let comp: TeacherManageDeleteDialogComponent;
        let fixture: ComponentFixture<TeacherManageDeleteDialogComponent>;
        let service: TeacherManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TeacherManageDeleteDialogComponent]
            })
                .overrideTemplate(TeacherManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeacherManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherManageService);
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
