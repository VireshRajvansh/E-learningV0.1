/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { PlayListManageDetailComponent } from 'app/entities/play-list-manage/play-list-manage-detail.component';
import { PlayListManage } from 'app/shared/model/play-list-manage.model';

describe('Component Tests', () => {
    describe('PlayListManage Management Detail Component', () => {
        let comp: PlayListManageDetailComponent;
        let fixture: ComponentFixture<PlayListManageDetailComponent>;
        const route = ({ data: of({ playList: new PlayListManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [PlayListManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PlayListManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlayListManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.playList).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
