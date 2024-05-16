import { Routes } from '@angular/router';
import { FilterComponent } from './filtro/filter.component';
import { CollectionsComponent } from './collections/collections.component';

export const routes: Routes = [
  { path: '', component: FilterComponent },
  { path: 'collections/:code', component: CollectionsComponent },
];
