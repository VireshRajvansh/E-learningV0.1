/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { UserSignUpByReferralCodeManageUpdateComponent } from 'app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage-update.component';
import { UserSignUpByReferralCodeManageService } from 'app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.service';
import { UserSignUpByReferralCodeManage } from 'app/shared/model/user-sign-up-by-referral-code-manage.model';

describe('Component Tests', () => {
    describe('UserSignUpByReferralCodeManage Management Update Component', () => {
        let comp: UserSignUpByReferralCodeManageUpdateComponent;
        let fixture: ComponentFixture<UserSignUpByReferralCodeManageUpdateComponent>;
        let service: UserSignUpByReferralCodeManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [UserSignUpByReferralCodeManageUpdateComponent]
            })
                .overrideTemplate(UserSignUpByReferralCodeManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserSignUpByReferralCodeManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSignUpByReferralCodeManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserSignUpByReferralCodeManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userSignUpByReferralCode = entity;
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
                    const entity = new UserSignUpByReferralCodeManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userSignUpByReferralCode = entity;
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
