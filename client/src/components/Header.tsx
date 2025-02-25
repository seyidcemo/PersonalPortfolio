import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Settings } from "lucide-react";

const navigation = [
  { name: "Software", href: "/software" },
  { name: "Music", href: "/music" },
  { name: "Game Reviews", href: "/game-reviews" },
  { name: "Blog", href: "/blog" }
];

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <Button variant="link" className="text-xl font-bold">
            Portfolio
          </Button>
        </Link>

        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            {navigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href}>
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location === item.href && "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <Link href="/admin">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location === "/admin" && "bg-accent text-accent-foreground"
                  )}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Yönetim
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}