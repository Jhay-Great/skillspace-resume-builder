import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import primeng modules needed
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
// import career creation form component
import { TagComponent } from '@src/app/shared/components/tag/tag.component';
// import interface
import {
  mockDetails,
  Programme,
  TabMenuList,
} from '../../../core/interfaces/interfaces';
import { ButtonModule } from 'primeng/button';
// import programme service
import { DateSuffixPipe } from '@src/app/core/pipes/datesuffix/date-suffix.pipe';
// import { ProgrammeCardComponent } from '@src/app/shared/components/programme-card/programme-card.component';

@Component({
  selector: 'app-programme-application',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    TabMenuModule,
    RippleModule,
    BadgeModule,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    OverlayPanelModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    DateSuffixPipe,
    TagComponent
  ],
  templateUrl: './programme-application.component.html',
  styleUrl: './programme-application.component.scss',
})
export class ProgrammeApplicationComponent {}
