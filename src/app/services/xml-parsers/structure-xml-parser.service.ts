import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { PageData, EditionStructure } from '../../models/evt-models';
import { Map } from '../../utils/jsUtils';
import { getElementsBetweenTreeNode, getElementsAfterTreeNode } from 'src/app/utils/domUtils';
import { EditionDataService } from '../edition-data.service';

@Injectable({
  providedIn: 'root'
})
export class StructureXmlParserService {
  public readonly editionStructure$ = this.editionDataService.parsedEditionSource$
    .pipe(
      map((source) => this.init(source)),
      shareReplay(1)
    );

  constructor(
    private editionDataService: EditionDataService
  ) {

  }

  getPages() {
    return this.editionStructure$.pipe(
      map(editionStructure => editionStructure.pagesIndexes.map(pageId => editionStructure.pages[pageId])));
  }

  init(document: HTMLElement) {
    const pages: Map<PageData> = {};
    const pagesIndexes: string[] = [];
    const pageTagName = 'pb';

    if (document) {
      const pageElements = document.querySelectorAll(pageTagName);
      const l = pageElements.length;
      if (l > 0) {
        for (let i = 0; i < l; i++) {
          const element = pageElements[i];
          let pageContent: any[] = [];
          if (i < l - 1) { // TODO: handle last page
            pageContent = getElementsBetweenTreeNode(element, pageElements[i + 1]);
          } else {
            pageContent = getElementsAfterTreeNode(element);
          }
          const page: PageData = {
            id: element.getAttribute('xml:id') || 'page_' + (pagesIndexes.length + 1),
            label: element.getAttribute('n') || 'Page ' + (pagesIndexes.length + 1),
            xmlSource: element,
            content: pageContent
          };
          pages[page.id] = page;
          pagesIndexes.push(page.id);
        }
      } else {
        // No <pb> used => TODO: Decide how to handle text division
        console.warn('TODO: Decide how to handle text division when there are no <pb>s');
        const mainText = document.querySelector('text');
        const page: PageData = {
          id: `page_${new Date().getTime()}`,
          label: 'Main Text',
          xmlSource: mainText,
          content: Array.from(mainText.childNodes)
        };
        pages[page.id] = page;
        pagesIndexes.push(page.id);
      }
      console.log(pages);
    }
    return {
      pages,
      pagesIndexes
    };
  }
}
