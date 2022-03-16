import { MenuItem } from "primeng/api";
import { CandidateMenuItem } from "../lib-ui-components.models";

export class CandidateUtil {
  static addRouterLinks(candidates: CandidateMenuItem[], detailsActive: boolean): CandidateMenuItem[] {
    if (candidates?.length > 0) {
      return candidates.map(candidate => this.addRouterLink(candidate, detailsActive));
    } else {
      return candidates;
    }
  }

  static addRouterLink(candidate: CandidateMenuItem, detailsActive: boolean): CandidateMenuItem {
    let linkPrefix = `/year/${candidate.electionYear}/office/`;
    linkPrefix = linkPrefix + candidate.office.toLowerCase().split(' ').join('-');
    const linkDistrict =  candidate.district 
      ? `/${candidate.district}`
      : `/0`;
    const linkSuffix = detailsActive ? `/details` : ``;
    candidate.routerLink = `${linkPrefix}${linkDistrict}/${candidate.id}${linkSuffix}`;
    return candidate;
  }


  static getCandidateItems(candidates: CandidateMenuItem[]): MenuItem[] {
    return candidates.map(candidate => this.getCandidateItem(candidate))
  }

  static getCandidateItem(candidate: CandidateMenuItem): MenuItem {
    return {
      id: candidate.id,
      label: candidate.fullName,
      icon: candidate.inGeneralElection ? 'pi pi-check-circle' : 'pi pi-user',
      routerLink: candidate.routerLink,
      routerLinkActiveOptions: { exact:true },
    }
  }


  static getSeeAllCandidatesItem(officeTitle: string, year: string, district: string = null): MenuItem {
    let linkPrefix = `/year/${year}/office/`;

    linkPrefix = linkPrefix + `${officeTitle.toLowerCase().split(' ').join('-')}`;

    const linkDistrict =  district 
      ? `/${district}`
      : `/0`;

    return {
      label: 'See All ',
      icon: 'pi pi-users',
      routerLink: `${linkPrefix}${linkDistrict}`,
      routerLinkActiveOptions: { exact:true },     
    }
  }

  // Districts/Seats
  static hasSeats(candidates: CandidateMenuItem[]): boolean {
    return candidates.some(candidate => candidate?.district);
  }

  static getDistinctSeats(candidates: CandidateMenuItem[]): string[] {
    const seats: string[] = candidates.map(candidate => candidate.district).sort();
    return [... new Set(seats)];
  }
}
