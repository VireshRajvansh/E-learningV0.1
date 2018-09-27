/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { UserSignUpByReferralCodeManageDetailComponent } from 'app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage-detail.component';
import { UserSignUpByReferralCodeManage } from 'app/shared/model/user-sign-up-by-referral-code-manage.model';

describe('Component Tests', () => {
    describe('UserSignUpByReferralCodeManage Management Detail Component', () => {
        let comp: UserSignUpByReferralCodeManageDetailComponent;
        let fixture: ComponentFixture<UserSignUpByReferralCodeManageDetailComponent>;
        const route = ({ data: of({ userSignUpByReferralCode: new UserSignUpByReferralCodeManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [UserSignUpByReferralCodeManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserSignUpByReferralCodeManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserSignUpByReferralCodeManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userSignUpByReferralCode).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
