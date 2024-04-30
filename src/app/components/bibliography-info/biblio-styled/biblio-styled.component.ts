import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { BibliographicEntry } from 'src/app/models/evt-models';

@Component({
  selector: 'evt-styled-biblio-entry',
  templateUrl: './biblio-styled.component.html',
  styleUrls: ['./biblio-styled.component.scss'],
})
export class StyledBiblioEntryComponent implements OnChanges{
  @Input() data: BibliographicEntry;
  @Input() style: string = AppConfig.evtSettings.ui.defaultBibliographicStyle;

  public showList;
  public showAttrNames = AppConfig.evtSettings.edition.biblView.showAttrNames;
  public showEmptyValues = AppConfig.evtSettings.edition.biblView.showEmptyValues;
  public inline = AppConfig.evtSettings.edition.biblView.inline;
  public isCommaSeparated = AppConfig.evtSettings.edition.biblView.commaSeparated;
  public showMainElemTextContent = AppConfig.evtSettings.edition.biblView.showMainElemTextContent;
  public styleProperties;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.style){
      this.showList = AppConfig.evtSettings.ui.allowedBibliographicStyles[this.style].propsOrder;
      this.styleProperties = AppConfig.evtSettings.ui.allowedBibliographicStyles[this.style].properties;
    }
  }


}

