import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardHeaderComponent} from "./dashboard-header.component";

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should creat search control with empty default value', () => {
    expect(component.searchValue).toEqual('');
  });

  it('should return search value', () => {
    component.searchCtrl.setValue('testSearchString');
    expect(component.searchValue).toEqual('testSearchString');
  });
});
