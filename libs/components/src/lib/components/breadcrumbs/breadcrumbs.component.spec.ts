import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizmBreadcrumbsComponent } from './breadcrumbs.component';
import { PrizmDropdownHostModule } from '../dropdowns/dropdown-host/dropdown-host.module';
import { PrizmIconModule } from '../icon/icon.module';

describe('BreadcrumbsComponent', () => {
  let component: PrizmBreadcrumbsComponent<unknown>;
  let fixture: ComponentFixture<PrizmBreadcrumbsComponent<unknown>>;
  class ResizeObserver {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public disconnect(): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public observe(): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public unobserve(): void {}
  }

  window.ResizeObserver = ResizeObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrizmBreadcrumbsComponent],
      imports: [PrizmDropdownHostModule, PrizmIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizmBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when current breadcrumb was changed', () => {
    let result = false;
    const idx = 1;

    component.breadcrumbs = [{ name: '0' }, { name: '1' }, { name: '2' }, { name: '3' }];
    fixture.detectChanges();
    component.breadcrumbChange.subscribe((item: unknown) => (result = item === component.breadcrumbs[idx]));
    component.changeBreadcrumb(idx);

    expect(result).toBeTruthy();
  });

  it('should filter breadcrumbs list when current breadcrumb was changed', () => {
    const idx = 1;

    component.breadcrumbs = [{ name: '0' }, { name: '1' }, { name: '2' }, { name: '3' }];
    fixture.detectChanges();
    component.changeBreadcrumb(idx);

    expect(component.breadcrumbs.length).toBe(idx + 1);
  });
});
