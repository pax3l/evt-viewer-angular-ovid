import { Component, Input } from '@angular/core';
import { AppConfig, BibliographicStyle } from 'src/app/app.config';
import { BibliographicEntry } from 'src/app/models/evt-models';

@Component({
  selector: 'evt-styled-biblio-entry',
  templateUrl: './biblio-styled.component.html',
  styleUrls: ['./biblio-styled.component.scss'],
})
export class StyledBiblioEntryComponent {
  @Input() data: BibliographicEntry;
  @Input() style: BibliographicStyle = 'chicago';

  public showList = AppConfig.evtSettings.edition.biblView.propsToShow;
  public showAttrNames = AppConfig.evtSettings.edition.biblView.showAttrNames;
  public showEmptyValues = AppConfig.evtSettings.edition.biblView.showEmptyValues;
  public inline = AppConfig.evtSettings.edition.biblView.inline;
  public isCommaSeparated = AppConfig.evtSettings.edition.biblView.commaSeparated;
  public showMainElemTextContent = AppConfig.evtSettings.edition.biblView.showMainElemTextContent;

  public styleProperties = AppConfig.evtSettings.ui.allowedBibliographicStyles[this.style]?.properties;


}

