import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@/core/ui/sidebar";
import { NavMain } from "./navMain";
import { HEADER_NAVIGATION } from "@/core/constant/navigation.constant";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton className="p-2 font-bold">
          House Price
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain sections={HEADER_NAVIGATION} />
      </SidebarContent>
    </Sidebar>
  );
}
