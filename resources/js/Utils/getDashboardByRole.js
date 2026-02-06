export function getDashboardPath(role) {
    switch (role) {
        case 'admin':
            return '/admin/dashboard';
        case 'cashier':
            return '/cashier/dashboard';
        case 'marketing':
            return '/marketing/dashboard';
        default:
            console.error('Role tidak dikenali:', role);
            return '/';
    }
}
