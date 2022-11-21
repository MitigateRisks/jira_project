import React, { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { AuthProvider } from "./auth-context"

export const AppProviders = ({ children }: { children: ReactNode }) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
)

export default AppProviders
