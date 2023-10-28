"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({
  display,
  ...props
}: {
  display: string;
  href: string;
}) => {
  const path = usePathname();
  const isActive = path === props.href;

  return (
    <Link {...props} className={isActive ? "underline" : ""}>
      {display}
    </Link>
  );
};

export default ActiveLink;
