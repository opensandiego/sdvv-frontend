import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CandidateCardComponent } from "./candidate-card.component";
import { environment } from "@environments/environment";

describe("CandidateCardComponent", () => {
  let component: CandidateCardComponent;
  let fixture: ComponentFixture<CandidateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
