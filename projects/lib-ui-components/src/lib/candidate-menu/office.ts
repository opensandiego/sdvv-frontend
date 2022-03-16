import { ActiveMenuPath, CandidateMenuItem } from "../lib-ui-components.models";
import { CandidateUtil } from "./candidate-util";

export class Office {
  id: string;
  title: string;
  label: string;
  icon: string;
  year: string;
  district: string = '';
  candidates: CandidateMenuItem[] = null;
  disabled: boolean = true;
  activeItem: ActiveMenuPath;

  constructor(title: string, icon: string, candidates: CandidateMenuItem[] = null) {
    this.id = title.toLowerCase().split(' ').join('-');
    this.title = title.toLowerCase().split(' ').join('-');
    this.label = title.toUpperCase();
    this.icon = icon;
    this.candidates = candidates;
  }

  setDisabled() {
    this.disabled = true;
  }

  setEnabled() {
    this.disabled = false;
  }

  setCandidates(candidates: CandidateMenuItem[]) {
    this.candidates = candidates;
  }

  addRouterLinks(detailsActive: boolean) {
    this.candidates = CandidateUtil.addRouterLinks(this.candidates, detailsActive);
  }

  getItems() {
    const hasSeats = CandidateUtil.hasSeats(this.candidates);
    if (hasSeats) {
      const distinctSeats = CandidateUtil.getDistinctSeats(this.candidates);

      return distinctSeats.map(seat => {
        const seeAllCandidatesItem = CandidateUtil.getSeeAllCandidatesItem(this.title, this.year, seat);

        const candidatesMenuItems = this.candidates
          .filter(candidate => candidate.district === seat)
          .map(candidate => CandidateUtil.getCandidateItem(candidate));

        return {
          id: seat,
          label: `District ${seat}`,
          icon: 'fa fa-fw fa-map-marker',
          items: [ seeAllCandidatesItem, ...candidatesMenuItems, ],
          expanded: 
            this.activeItem?.districtNumber?.toUpperCase() === seat.toUpperCase(),
        }
      });

    } else {
      const seeAllCandidatesItem = CandidateUtil.getSeeAllCandidatesItem(this.title, this.year, this.district)

      const candidatesMenuItems = CandidateUtil.getCandidateItems(this.candidates);

      return [ seeAllCandidatesItem, ...candidatesMenuItems, ];
    }
  }

  toMenuItem(activeItem?: ActiveMenuPath) {
    this.activeItem = activeItem;

    const subItems = this.candidates && !this.disabled 
      ? this.getItems()
      : null;

    return {
      id: this.id,
      label: this.label,
      disabled: this.disabled,
      items: subItems,
      expanded: 
        activeItem?.officeTitle?.toUpperCase() === this.title?.toUpperCase(),
    }
  }
};
