import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserSignUpByReferralCodeManage } from 'app/shared/model/user-sign-up-by-referral-code-manage.model';

@Component({
    selector: 'jhi-user-sign-up-by-referral-code-manage-detail',
    templateUrl: './user-sign-up-by-referral-code-manage-detail.component.html'
})
export class UserSignUpByReferralCodeManageDetailComponent implements OnInit {
    userSignUpByReferralCode: IUserSignUpByReferralCodeManage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userSignUpByReferralCode }) => {
            this.userSignUpByReferralCode = userSignUpByReferralCode;
        });
    }

    previousState() {
        window.history.back();
    }
}
