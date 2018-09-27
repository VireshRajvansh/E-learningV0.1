import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserSignUpByReferralCodeManage } from 'app/shared/model/user-sign-up-by-referral-code-manage.model';
import { UserSignUpByReferralCodeManageService } from './user-sign-up-by-referral-code-manage.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-user-sign-up-by-referral-code-manage-update',
    templateUrl: './user-sign-up-by-referral-code-manage-update.component.html'
})
export class UserSignUpByReferralCodeManageUpdateComponent implements OnInit {
    private _userSignUpByReferralCode: IUserSignUpByReferralCodeManage;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userSignUpByReferralCodeService: UserSignUpByReferralCodeManageService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userSignUpByReferralCode }) => {
            this.userSignUpByReferralCode = userSignUpByReferralCode;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userSignUpByReferralCode.id !== undefined) {
            this.subscribeToSaveResponse(this.userSignUpByReferralCodeService.update(this.userSignUpByReferralCode));
        } else {
            this.subscribeToSaveResponse(this.userSignUpByReferralCodeService.create(this.userSignUpByReferralCode));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserSignUpByReferralCodeManage>>) {
        result.subscribe(
            (res: HttpResponse<IUserSignUpByReferralCodeManage>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get userSignUpByReferralCode() {
        return this._userSignUpByReferralCode;
    }

    set userSignUpByReferralCode(userSignUpByReferralCode: IUserSignUpByReferralCodeManage) {
        this._userSignUpByReferralCode = userSignUpByReferralCode;
    }
}
