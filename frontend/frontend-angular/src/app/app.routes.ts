import { Routes } from '@angular/router';

import { BooksList } from './pages/books-list/books-list';
import { NewBook } from './pages/new-book/new-book';

export const routes: Routes = [
    { path: '', component: BooksList },
    { path: 'new-book', component: NewBook }
];
