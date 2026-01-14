import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/core/ui/sidebar";
import { Link } from "react-router-dom";
import type { NavigationSection } from "@/core/types/navigation.types";

export function NavMain({ sections }: { sections: NavigationSection[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {sections.map((section) => (
            <Collapsible key={section.id} className="group">
              <SidebarMenuItem>
                <CollapsibleTrigger className="w-full">
                  <SidebarMenuButton className="flex justify-between">
                    <span className="font-semibold">{section.trigger}</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  {section.columns.map((column) => (
                    <div key={column.title} className="mt-3">
                      <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">
                        {column.title}
                      </div>

                      <SidebarMenuSub>
                        {column.links.map((link) => (
                          <SidebarMenuSubItem key={link.label}>
                            <SidebarMenuSubButton>
                              <Link to={link.href}>
                                <span>{link.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </div>
                  ))}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
