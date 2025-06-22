import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs-category',
  imports: [],
  templateUrl: './tabs-category.component.html',
  styleUrl: './tabs-category.component.css'
})
export class TabsCategoryComponent {
  @Input() selectedTab!: string;
  @Output() setTabCategory: EventEmitter<string> = new EventEmitter<string>()

  setTab(tab: string) {
    this.setTabCategory.emit(tab)
  }
}
