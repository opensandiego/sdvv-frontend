import { Component, OnInit } from '@angular/core';
import { CampaignDataChangesService } from '../services/campaign-data-changes.service';

@Component({
  selector: 'app-explorer-container',
  templateUrl: './explorer-container.component.html',
  styleUrls: ['./explorer-container.component.scss']
})
export class ExplorerContainerComponent implements OnInit {
  selectedElection = {
    id: null,
    name: null,
    selected: false,
  };

  constructor(
    // private campaignDataChangesService: CampaignDataChangesService,
  ) { }

  ngOnInit(): void {
  }

  setId(event: string) {
    if(event === null) {
      this.selectedElection = {
        name: '',
        id: '',
        selected: false,
      };
      // this.campaignDataChangesService.ElectionChanged.emit(null);
    } else {
      this.selectedElection = {
        name: event['name'],
        id: event['id'],
        selected: true,
      };
      // this.campaignDataChangesService.ElectionChanged.emit(this.selectedElection.id);
    }
  }

}
