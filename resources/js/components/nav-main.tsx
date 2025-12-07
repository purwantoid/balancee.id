import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { NavCollapsible, NavGroup, NavLink, checkIsActive, isNavCollapsible, isNavLink, type SidebarData } from '@/types/nav-group';
import { Link, usePage } from '@inertiajs/react';
import { Badge, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

export function NavMain({ sidebar }: { sidebar: SidebarData }) {
    return sidebar.navGroups.map((group) => <NavGroupMenu key={group.title} title={group.title} items={group.items} />);
}

const NavGroupMenu = ({ title, items }: NavGroup) => {
    const { state } = useSidebar();
    // const href = useLocation({ select: (location) => location.href })
    const { url: href } = usePage();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const key = `${item.title}-${'url' in item ? item.url : item.title}`;

                    if (isNavLink(item)) {
                        return <SidebarMenuLink key={key} item={item} href={href} />;
                    }

                    if (state === 'collapsed' && isNavCollapsible(item)) {
                        return <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />;
                    }

                    return <SidebarMenuCollapsible key={key} item={item} href={href} />;
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
};

const NavBadge = ({ children }: { children: ReactNode }) => <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>;

const SidebarMenuLink = ({ item, href }: { item: NavLink; href: string }) => {
    const { setOpenMobile } = useSidebar();
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkIsActive(href, item)} tooltip={item.title}>
                <Link href={item.url} onClick={() => setOpenMobile(false)}>
                    {item.icon && <item.icon size={100} />}
                    <span>{item.title}</span>
                    {item.badge && <NavBadge>{item.badge}</NavBadge>}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

const SidebarMenuCollapsible = ({ item, href }: { item: NavCollapsible; href: string }) => {
    const { setOpenMobile } = useSidebar();
    return (
        <Collapsible asChild defaultOpen={checkIsActive(href, item, true)} className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon size={100} />}
                        <span>{item.title}</span>
                        {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="CollapsibleContent">
                    <SidebarMenuSub>
                        {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={checkIsActive(href, subItem)}>
                                    <Link href={subItem.url} onClick={() => setOpenMobile(false)}>
                                        {subItem.icon && <subItem.icon size={100} />}
                                        <span>{subItem.title}</span>
                                        {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
};

const SidebarMenuCollapsedDropdown = ({ item, href }: { item: NavCollapsible; href: string }) => {
    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={checkIsActive(href, item)}>
                        {item.icon && <item.icon size={100} />}
                        <span>{item.title}</span>
                        {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" sideOffset={4}>
                    <DropdownMenuLabel>
                        {item.title} {item.badge ? `(${item.badge})` : ''}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.items.map((sub) => (
                        <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
                            <Link href={sub.url} className={`${checkIsActive(href, sub) ? 'bg-secondary' : ''}`}>
                                {sub.icon && <sub.icon size={100} />}
                                <span className="max-w-52 text-wrap">{sub.title}</span>
                                {sub.badge && <span className="ml-auto text-xs">{sub.badge}</span>}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
};
