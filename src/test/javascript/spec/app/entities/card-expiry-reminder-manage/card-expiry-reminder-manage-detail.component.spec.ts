/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { CardExpiryReminderManageDetailComponent } from 'app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage-detail.component';
import { CardExpiryReminderManage } from 'app/shared/model/card-expiry-reminder-manage.model';

describe('Component Tests', () => {
    describe('CardExpiryReminderManage Management Detail Component', () => {
        let comp: CardExpiryReminderManageDetailComponent;
        let fixture: ComponentFixture<CardExpiryReminderManageDetailComponent>;
        const route = ({ data: of({ cardExpiryReminder: new CardExpiryReminderManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CardExpiryReminderManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CardExpiryReminderManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardExpiryReminderManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cardExpiryReminder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
