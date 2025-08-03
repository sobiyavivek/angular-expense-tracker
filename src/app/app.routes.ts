import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './login/login';
import { App } from './app';
import { Home } from './home/home';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { AuthGuard } from './auth-guard-guard';
import { NotFound } from './not-found/not-found';
import { TransactionForm } from './transaction-form/transaction-form';
import { TransactionList } from './transaction-list/transaction-list';

export const routes: Routes = [
    {
        path : "home" ,
        component : Home
    },
    {
        path:'',
        redirectTo : 'home',
        pathMatch : "full"
    },
    {
        path : "login",
        component : Login
    },
    {
        path : "register",
        component : Register
    },
    {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard], 
    },
    {
        path : 'transaction-form',
        component : TransactionForm,
        canActivate : [AuthGuard],
    },
   
    {
  path: 'transaction-list',
  component: TransactionList,
  canActivate: [AuthGuard]
},
    { 
    path: '**', 
    component: NotFound
   
    }
    
];
