import { AccountManagementRoutingModule } from './../app/account-management/account-management-routing.module';
export let config = {
    'authentication': {
        'name': 'authentication',
        'route': '/authentication',
        'loadChildren': '../app/authentication/authentication.module#AuthenticationModule',
        'login': {
            'name': 'login',
            'route': '/authorization/login'
        },
        'forget': {
            'name': 'forget',
            'route': '/authorization/forget' 
        }
    },
    'accountManagement': {
        'name': 'accountManagement',
        'route': '/accountManagement',
        'loadChildren': '../app/account-management/account-management.module#AccountManagementModule',
        'accountOverview': {
            'name': 'accountOverview',
            'route': '/accountManagement/accountOverview'
        }
    },
    'generalError': {
        'name': 'generalError',
        'route': '/generalError'
    }
}

