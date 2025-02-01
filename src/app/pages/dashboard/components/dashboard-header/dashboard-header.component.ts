import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {
  @Input({alias: 'loading'}) isLoading = false;

  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;

  searchCtrl = new FormControl<string>('', {nonNullable: true});

  get searchValue(): string {
    return this.searchCtrl.value;
  }
}
