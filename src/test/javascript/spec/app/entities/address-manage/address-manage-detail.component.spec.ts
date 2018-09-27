/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { AddressManageDetailComponent } from 'app/entities/address-manage/address-manage-detail.component';
import { AddressManage } from 'app/shared/model/address-manage.model';

describe('Component Tests', () => {
    describe('AddressManage Management Detail Component', () => {
        let comp: AddressManageDetailComponent;
        let fixture: ComponentFixture<AddressManageDetailComponent>;
        const route = ({ data: of({ address: new AddressManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [AddressManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AddressManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.address).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
