export const publicNav = [
  { label: "Home", href: "/" },
  { label: "Classes", href: "/classes" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Classes", href: "/admin/classes", icon: "GraduationCap" },
  { label: "Registrations", href: "/admin/registrations", icon: "Users" },
  { label: "Contacts", href: "/admin/contacts", icon: "Mail" },
] as const;
