import { Injectable } from '@angular/core';

import { DatabaseService } from './database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignCalculationService {
  localDB;
  databaseService;

  constructor( ) {
    this.database();
  }

  async database() {
    this.databaseService = new DatabaseService();
    this.localDB = await this.databaseService.getInstance();
  }


}
