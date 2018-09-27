/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { EducationManageDeleteDialogComponent } from 'app/entities/education-manage/education-manage-delete-dialog.component';
import { EducationManageService } from 'app/entities/education-manage/education-manage.service';

describe('Component Tests', () => {
    describe('EducationManage Management Delete Component', () => {
        let comp: EducationManageDeleteDialogComponent;
        let fixture: ComponentFixture<EducationManageDeleteDialogComponent>;
        let service: EducationManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationManageDeleteDialogComponent]
            })
                .overrideTemplate(EducationManageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EducationManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationManageService);
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
