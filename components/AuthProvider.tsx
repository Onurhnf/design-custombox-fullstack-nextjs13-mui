"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children, session }: any) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default AuthProvider;
