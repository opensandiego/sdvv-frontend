import { InMemoryDbService, ParsedRequestUrl } from 'angular-in-memory-web-api';
import { candidateNavigationItems } from '../mocks/mock-candidate-navigation-2020';
import { officeSummaryItems } from '../mocks/mock-office-summary-2020';
import { officeItems } from '../mocks/mock-offices-2020';
import { candidateCardItems } from '../mocks/mock-candidate-cards-2020';
import { candidateQuickViewItems } from '../mocks/mock-candidate-quick-view-2020';
import { candidateItems } from '../mocks/mock-candidate-2020';
import { lastUpdateItems } from '../mocks/mock-last-updated';
import { candidateDetailsHeaderItems } from '../mocks/mock-candidate-details-headers';
import { candidateDetailsRaisedByIndustryItems } from '../mocks/mock-candidate-details-raised-by-industry';
import { candidateDetailsRaisedByLocationItems } from '../mocks/mock-candidate-details-raised-by-location';
import { candidateDetailsOutsideMoneyItems } from '../mocks/mock-candidate-details-raised-outside-money';
import { candidateDetailsRaisedSpentItems } from '../mocks/mock-candidate-details-raised-spent';
import { electionItems } from '../mocks/mock-elections';

export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    return { 
      'office-summary': officeSummaryItems,
      'offices': officeItems,
      'candidate-cards': candidateCardItems,
      // 'candidates': candidateItems, 
      'candidates-temp': candidateItems,
      'candidate-temp': candidateItems,
      // 'candidate-card': candidateCardItems,
      'candidate-quick-view': candidateQuickViewItems,
      'last-update': lastUpdateItems,
      'candidate-details-header': candidateDetailsHeaderItems,
      'candidate-details-raised-by-industry': candidateDetailsRaisedByIndustryItems,
      'candidate-details-raised-by-location': candidateDetailsRaisedByLocationItems,
      'candidate-details-raised-outside-money': candidateDetailsOutsideMoneyItems,
      'candidate-details-raised-spent': candidateDetailsRaisedSpentItems,
      'elections': electionItems,
    };
  }
}