import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/contexts/AuthContext";
import { MenusProvider } from "@/contexts/MenusContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import theme from "@/theme";

const queryClient = new QueryClient({
    defaultOptions: {
    }
});

export default function ({ children }: React.PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <SettingsProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <MenusProvider>{children}</MenusProvider>
            </AuthProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </SettingsProvider>
    </AppRouterCacheProvider>
  );
}
