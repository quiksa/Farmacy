import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { ActivateGuard } from '../../services/activate-guard.service';

const childRoutes: Routes = [
    {
        path: '',
        component: IndexComponent,
        canActivate: [ActivateGuard]
    }
];

export const routing = RouterModule.forChild(childRoutes);
