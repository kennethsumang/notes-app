import AppLayout from "@/app/_components/layout/AppLayout/AppLayout";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = function ({ children }) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}

export default Layout;