import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DatabaseService } from '../database/database.service';
import { Committee, CommitteeDB } from '../models/committee.interface';
import { EFileDownloadService } from './efile.download.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignCommitteeService {

  constructor(
    private databaseService: DatabaseService,
    private eFileDownloadService: EFileDownloadService,
  ) { }

  getCommitteesFromEFile(): Observable<Committee[]> {
    return this.eFileDownloadService.getCommitteesFromEFile();
  }

  deleteCommittees() {
    return this.databaseService.deleteAllItemsInCollection(this.databaseService.collections.committees);
  }
}
