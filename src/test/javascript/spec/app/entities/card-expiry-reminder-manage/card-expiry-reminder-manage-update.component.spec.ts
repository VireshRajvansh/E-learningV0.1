/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { CardExpiryReminderManageUpdateComponent } from 'app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage-update.component';
import { CardExpiryReminderManageService } from 'app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage.service';
import { CardExpiryReminderManage } from 'app/shared/model/card-expiry-reminder-manage.model';

describe('Component Tests', () => {
    describe('CardExpiryReminderManage Management Update Component', () => {
        let comp: CardExpiryReminderManageUpdateComponent;
        let fixture: ComponentFixture<CardExpiryReminderManageUpdateComponent>;
        let service: CardExpiryReminderManageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CardExpiryReminderManageUpdateComponent]
            })
                .overrideTemplate(CardExpiryReminderManageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CardExpiryReminderManageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardExpiryReminderManageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CardExpiryReminderManage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cardExpiryReminder = entity;
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
                    const entity = new CardExpiryReminderManage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cardExpiryReminder = entity;
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
