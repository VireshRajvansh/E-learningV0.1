/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { CourseManageDeleteDialogComponent } from 'app/entities/course-manage/course-manage-delete-dialog.component';
import { CourseManageService } from 'app/entities/course-manage/course-manage.service';

describe('Component Tests', () => {
    describe('CourseManage Management Delete Component', () => {
        let comp: CourseManageDeleteDialogComponent;
        let fixture: ComponentFixture<CourseManageDeleteDialogComponent>;
        let service: CourseManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CourseManageDeleteDialogComponent]
            })
                .overrideTemplate(CourseManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CourseManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseManageService);
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
