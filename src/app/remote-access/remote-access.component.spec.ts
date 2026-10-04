import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteAccessComponent } from './remote-access.component';

describe('RemoteAccessComponent', () => {
  let component: RemoteAccessComponent;
  let fixture: ComponentFixture<RemoteAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoteAccessComponent]
    });
    fixture = TestBed.createComponent(RemoteAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
