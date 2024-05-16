import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ResultComponent } from '../../app.model';
import { DataPipe } from '../../pipes/data.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DataPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data: ResultComponent;
  @Output() onClick = new EventEmitter()

  clickEmit() {
    this.onClick.emit(this.data.code);
  }
}
