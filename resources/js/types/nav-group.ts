import { LinkProps } from '@tanstack/react-router';

interface BaseNavItem {
    title: string;
    badge?: string;
    icon?: React.ElementType;
}

type NavLink = BaseNavItem & {
    url: LinkProps['to'];
    items?: never;
};

type NavCollapsible = BaseNavItem & {
    items: (BaseNavItem & { url: LinkProps['to'] })[];
    url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
    title: string;
    items: NavItem[];
}

interface SidebarData {
    navGroups: NavGroup[];
}

export type { NavCollapsible, NavGroup, NavItem, NavLink, SidebarData };
export function isNavLink(item: NavItem): item is NavLink {
    return 'url' in item && typeof item.url === 'string';
}

export function isNavCollapsible(item: NavItem): item is NavCollapsible {
    return 'items' in item && Array.isArray(item.items);
}

type MaybeUrl = string | { url: string };

function resolveUrl(u?: MaybeUrl): string | undefined {
    if (!u) return undefined;
    return typeof u === 'string' ? u : u.url;
}

export function checkIsActive(href: string, item: NavCollapsible | NavLink, mainNav = false): boolean {
    const baseHref = href.split('?')[0];
    const itemUrl = resolveUrl((item as any).url);
    const isNavLink = (i: NavCollapsible | NavLink): i is NavLink => 'url' in i;

    if (isNavLink(item) && itemUrl) {
        if (href === itemUrl || baseHref === itemUrl) return true;

        if (mainNav && baseHref.split('/')[1] && baseHref.split('/')[1] === itemUrl.split('/')[1]) {
            return true;
        }
    }

    if ('items' in item && Array.isArray(item.items)) {
        return item.items.some((i) => {
            const childUrl = resolveUrl(i.url);
            return childUrl === href || childUrl === baseHref;
        });
    }

    return false;
}
