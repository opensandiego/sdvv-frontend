import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class TitleMetaTagService {
  constructor(private titleService: Title, private metaService: Meta) {}

  public setTitle(items) {
    let pageTitle = '';
    let year = '';
    let office = '';
    let candidate = '';
    let imageFileName = '';

    if (items.length > 0) {
      year = items[0].label;
    }
    if (items.length > 1) {
      office = items[1].label;
    }
    if (items.length > 2) {
      candidate = items[2].label;
    }

    if (items.length === 0) {
      pageTitle = `Choose a Year | ${globals.pageTitleSuffix}`;
      imageFileName = 'years_preview.png';
    } else if (items.length === 1) {
      pageTitle = `Candidate Offices for ${year} | ${globals.pageTitleSuffix}`;
      imageFileName = 'offices_preview.png';
    } else if (items.length === 2) {
      pageTitle = `${office} Candidates ${year} | ${globals.pageTitleSuffix}`;
      imageFileName = 'candidates_preview.png';
    } else if (items.length === 3) {
      pageTitle = `${candidate}, Summary, ${office}, Candidate ${year} | ${globals.pageTitleSuffix}`;
      imageFileName = 'candidate_summary_preview.png';
    }

    if (items.length === 4) {
      pageTitle = `${candidate}, Details, ${office}, Candidate ${year} | ${globals.pageTitleSuffix}`;
      imageFileName = 'candidate_details_preview.png';
    }
    this.titleService.setTitle(pageTitle);

    this.metaService.addTags([
      { property: 'og:url', content: location.href },
      { property: 'og:title', content: pageTitle },
      {
        property: 'og:image',
        content: `${location.origin}/assets/preview-images/${imageFileName}`,
      },
      // {property: 'og:description', content: this.caption},
    ]);
  }
}
