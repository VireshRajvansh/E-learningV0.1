/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { OfferManageDetailComponent } from 'app/entities/offer-manage/offer-manage-detail.component';
import { OfferManage } from 'app/shared/model/offer-manage.model';

describe('Component Tests', () => {
    describe('OfferManage Management Detail Component', () => {
        let comp: OfferManageDetailComponent;
        let fixture: ComponentFixture<OfferManageDetailComponent>;
        const route = ({ data: of({ offer: new OfferManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [OfferManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OfferManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OfferManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.offer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
