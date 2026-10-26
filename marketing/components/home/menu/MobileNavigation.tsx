import { AerosLogo } from "@marketing/components/home/AerosLogo";
import {
  Button,
  ChevronRight,
  Menu01,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  XClose,
} from "@dust-tt/sparkle";
import { menuConfig } from "@marketing/components/home/menu/config";
import { classNames } from "@marketing/lib/utils";
import type { LinkProps } from "next/link";
import Link from "next/link";
import * as React from "react";

export function MobileNavigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex xl:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            aria-label="Open menu"
            size="md"
            icon={Menu01}
            className="text-gray-900"
            variant="ghost-secondary"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border border-border bg-background py-0"
        >
          <SheetHeader
            className="border-b border-border bg-background"
            hideButton
          >
            <SheetTitle className="flex w-full items-center justify-between">
              <AerosLogo className="h-6 w-24" />
              <Button
                tooltip="Close menu"
                size="sm"
                variant="outline"
                icon={XClose}
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[100vh]">
            <div className="flex flex-col space-y-0 px-10 pb-4">
              {menuConfig.mobileNav.map((item, index) => (
                <div key={index} className="flex flex-col space-y-0 pt-4">
                  {item.href ? (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setOpen}
                      isExternal={item.isExternal}
                    >
                      {item.title}
                    </MobileLink>
                  ) : (
                    <div className="block select-none py-2 text-xs font-medium uppercase leading-none text-muted-foreground no-underline outline-hidden">
                      {item.title}
                    </div>
                  )}
                  {item?.items?.length &&
                    item.items
                      .filter((subItem) => subItem.title.trim() !== "")
                      .map((subItem, itemIndex) => (
                        <React.Fragment
                          key={subItem.href ?? `item-${itemIndex}`}
                        >
                          {subItem.href ? (
                            <MobileLink
                              href={subItem.href}
                              onOpenChange={setOpen}
                              isExternal={subItem.isExternal}
                            >
                              <ChevronRight className="h-5 w-5 text-slate-400" />{" "}
                              {subItem.title}
                            </MobileLink>
                          ) : (
                            <div className="block select-none py-2 pt-4 text-xs font-medium uppercase leading-none text-muted-foreground no-underline outline-hidden">
                              {subItem.title}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  isExternal,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      target={isExternal ? "_blank" : undefined}
      className={classNames(
        "flex select-none items-center gap-1 rounded-md py-3 font-semibold leading-none text-foreground no-underline outline-hidden transition-colors",
        "hover:bg-muted-background hover:text-foreground hover:underline hover:underline-offset-4 focus:bg-muted-background focus:text-foreground active:text-foreground"
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
