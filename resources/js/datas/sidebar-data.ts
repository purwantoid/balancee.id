import { type SidebarData } from '@/types/nav-group';
import { Bell, LayoutGrid, Monitor, Rat, Settings, ShieldCheck, UserCog, Users, Vote, WandSparkles, Wrench } from 'lucide-react';

export const sidebarData: SidebarData = {
    navGroups: [
        {
            title: 'General',
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard',
                    icon: LayoutGrid,
                },
            ],
        },
        {
            title: 'Administration',
            items: [
                {
                    title: 'Priority',
                    url: '/dashboard/priority',
                    icon: Vote,
                },
            ],
        },
        {
            title: 'Access Control',
            items: [
                {
                    title: 'Roles',
                    url: '/dashboard/roles',
                    icon: ShieldCheck,
                },
                {
                    title: 'Users',
                    url: '/dashboard/users',
                    icon: Users,
                },
            ],
        },
        {
            title: 'Other',
            items: [
                {
                    title: 'Settings',
                    icon: Settings,
                    items: [
                        {
                            title: 'Profile',
                            url: '/dashboard/settings',
                            icon: UserCog,
                        },
                        {
                            title: 'Account',
                            url: '/dashboard/settings/account',
                            icon: Wrench,
                        },
                        {
                            title: 'Appearance',
                            url: '/dashboard/settings/appearance',
                            icon: WandSparkles,
                        },
                        {
                            title: 'Notifications',
                            url: '/dashboard/settings/notifications',
                            icon: Bell,
                        },
                        {
                            title: 'Display',
                            url: '/dashboard/settings/display',
                            icon: Monitor,
                        },
                    ],
                },
                {
                    title: 'Help Center',
                    url: '/dashboard/help-center',
                    icon: Rat,
                },
            ],
        },
    ],
};
