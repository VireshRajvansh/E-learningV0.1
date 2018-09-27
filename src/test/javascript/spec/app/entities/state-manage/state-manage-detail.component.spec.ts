/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { StateManageDetailComponent } from 'app/entities/state-manage/state-manage-detail.component';
import { StateManage } from 'app/shared/model/state-manage.model';

describe('Component Tests', () => {
    describe('StateManage Management Detail Component', () => {
        let comp: StateManageDetailComponent;
        let fixture: ComponentFixture<StateManageDetailComponent>;
        const route = ({ data: of({ state: new StateManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StateManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StateManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StateManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.state).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
