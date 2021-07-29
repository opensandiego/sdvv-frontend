import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explorer-container',
  templateUrl: './explorer-container.component.html',
  styleUrls: ['./explorer-container.component.scss']
})
export class ExplorerContainerComponent implements OnInit {
  selectedElection = {
    id: '',
    name: '',
    selected: false,
  };

  constructor( ) { }

  ngOnInit(): void {
  }

  setId(event: string) {
    if(event === null) {
      this.selectedElection = {
        name: '',
        id: '',
        selected: false,
      };
    } else {
      this.selectedElection = {
        name: event['name'],
        id: event['id'],
        selected: true,
      };
    }
  }

}
