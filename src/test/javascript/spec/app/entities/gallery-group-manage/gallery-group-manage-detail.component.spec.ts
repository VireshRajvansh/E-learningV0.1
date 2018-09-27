/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ELearningTestModule } from '../../../test.module';
import { GalleryGroupManageDetailComponent } from 'app/entities/gallery-group-manage/gallery-group-manage-detail.component';
import { GalleryGroupManage } from 'app/shared/model/gallery-group-manage.model';

describe('Component Tests', () => {
    describe('GalleryGroupManage Management Detail Component', () => {
        let comp: GalleryGroupManageDetailComponent;
        let fixture: ComponentFixture<GalleryGroupManageDetailComponent>;
        const route = ({ data: of({ galleryGroup: new GalleryGroupManage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryGroupManageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GalleryGroupManageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GalleryGroupManageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.galleryGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
