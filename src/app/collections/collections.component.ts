import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionsService } from './collections.service';
import { Card } from '../app.model';
import { CardComponent } from './card/card.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CardComponent, ToastModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
  providers: [CollectionsService]
})
export class CollectionsComponent {
  listCards: Card[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private collectionsService: CollectionsService,
    private messageService: MessageService,
  ) {}
  
  get code() { return this.route.snapshot.paramMap.get('code') }

  async ngOnInit() {
    await this.getCards(this.code)
  }

  async getCards(code: string) {
    this.isLoading = true;

    try {
      await this.fetchCards(code);
    } catch(error) {
      this.messageService.add({ severity: 'error', summary:'API Error', detail: 'Falha ao carregar dados da API' });
    } finally {
      this.isLoading = false;
    }
  }
  
  private async fetchCards(code: string) {
    if (this.listCards.length === 30) {
      return;
    }
  
    try {
      const cards = await new Promise<Card[]>((resolve, reject) => {
        this.collectionsService.getCollections(code)?.subscribe({ 
          next: (cards) => {
            resolve(cards); 
          }, 
          error: (error) => {
            reject(error); 
          }
        });
      });
  
      let cardsCreature = cards.filter((card: Card) => card?.types.includes('Creature'));
  
      if (this.listCards.length + cardsCreature.length > 30) {
        cardsCreature = cardsCreature.slice(0, 30 - this.listCards.length);
      }
  
      if(cardsCreature.length) {
        this.listCards.push(...cardsCreature);
      }
  
      await this.fetchCards(code);
    } catch (error) {
      throw error;
    }
  }
  


    
  
}
