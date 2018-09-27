/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { GalleryManageDetailComponent } from 'app/entities/gallery-manage/gallery-manage-detail.component';
import { GalleryManage } from 'app/shared/model/gallery-manage.model';

describe('Component Tests', () => {
    describe('GalleryManage Management Detail Component', () => {
        let comp: GalleryManageDetailComponent;
        let fixture: ComponentFixture<GalleryManageDetailComponent>;
        const route = ({ data: of({ gallery: new GalleryManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GalleryManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GalleryManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gallery).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
