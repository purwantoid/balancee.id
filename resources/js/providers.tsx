import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SearchProvider } from '@/context/search-context';
import { ThemeProvider } from '@/context/theme-context';
import { NuqsAdapter } from '@/lib/nuqs';
import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster as SonnerToaster } from 'sonner';

export function Providers({ children }: any) {
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <SearchProvider>
                    <ThemeProvider defaultTheme="light" storageKey="app-ui-theme">
                        <TooltipProvider>{children}</TooltipProvider>

                        <Toaster />
                        <SonnerToaster position="bottom-right" />
                    </ThemeProvider>
                </SearchProvider>
                {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
        </NuqsAdapter>
    );
}
