"use client";

import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import useNotification from "@/app/_hooks/useNotification";
import { getCurrentDomain } from "@/app/_utils/http.util";
import RequestLibrary from "@/app/_libraries/request.library";
import { AppShell, Burger, Divider, Group, Image, NavLink, Text, rem } from "@mantine/core";
import LogoutButton from "./LogoutButton/LogoutButton";
import Footer from "./Footer/Footer";
import { useAuthStore } from "@/app/_store/auth.store";
import useToken from "@/app/_hooks/useToken";
import NewButton from "./NewButton/NewButton";
import { IconHome2 } from "@tabler/icons-react";
import classes from "./AppLayout.module.css";
import NotesList from "./NotesList/NotesList";

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = function ({ children }) {
  const { removeToken } = useToken();
  const router = useRouter();
  const pathname = usePathname();
  const { success, error } = useNotification();
  const auth = useAuthStore((state) => state);
  const [opened, { toggle }] = useDisclosure();

  function handleNavClick(e: React.MouseEvent, href: string) {
    e.preventDefault();
    router.push(href);
  }

  async function handleLogoutClick() {
    const response = await requestLogout();
    if (!response) {
      error("Logout failed.");
      return;
    }

    success("Logged out successfully!");
    auth.logoutUser();
    removeToken();
    router.push("/");
  }

  async function requestLogout(): Promise<boolean> {
    try {
      const response = await RequestLibrary.request<{ data: string }>(
        `${getCurrentDomain()}/api/auth/logout`,
        { method: "POST" },
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      // aside={{ width: 300, breakpoint: "md", collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <Image src="/logo.png" alt="logo" width={30} height={30} className={classes.logo} /> */}
          <Text size="lg">Notes</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        p="md"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <NewButton onClick={() => router.push('/app/notes/create')} />
          <div style={{ marginTop: rem(20) }}>
            <NavLink
              active={pathname === "/app"}
              href=""
              label="Home"
              leftSection={<IconHome2 size={20} />}
              onClick={(e) => handleNavClick(e, "/app")}
            />
          </div>
          <Divider className={classes.divider} />
          <NotesList />
        </div>
        <div>
          <LogoutButton onLogout={handleLogoutClick} />
        </div>
      </AppShell.Navbar>
      <AppShell.Main className={classes.main}>{children}</AppShell.Main>
      <AppShell.Footer p="sm" className={classes.footer}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export default AppLayout;