import { Routes } from '@angular/router';

import { BooksList } from './pages/books-list/books-list';
import { NewBook } from './pages/new-book/new-book';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: '', component: BooksList },
    { path: 'new-book', component: NewBook },
    { path: 'new-book/:id', component: NewBook },
    { path: 'login', component: Login }
];
