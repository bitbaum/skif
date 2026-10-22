import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Link, redirect and usePathname that keep the reader's language. */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
