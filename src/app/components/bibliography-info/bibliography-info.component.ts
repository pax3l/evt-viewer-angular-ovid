import { Component, Input } from '@angular/core';
import { BibliographicStyle } from 'src/app/app.config';
import { BibliographicEntry, BibliographicStructEntry, BibliographyInfo } from 'src/app/models/evt-models';
import { register } from 'src/app/services/component-register.service';

@Component({
  selector: 'evt-bibliography-info',
  templateUrl: './bibliography-info.component.html',
  styleUrls: ['./bibliography-info.component.scss'],
})

@register(BibliographyInfo)
export class BibliographyInfoComponent {
  biblList : Array<BibliographicEntry | BibliographicStructEntry>;
  currentStyle : BibliographicStyle;

  @Input() set data(bd : BibliographyInfo){
    this.biblList=bd.bibliographicEntries;
  };

  setCurrentStyle(s: BibliographicStyle){
    this.currentStyle = s;
  }
}
