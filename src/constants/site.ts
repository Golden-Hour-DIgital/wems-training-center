export const SITE = {
  name: "Williamstown Area EMS Inc. Training Center",
  shortName: "WEMS Training Center",
  description:
    "PA Department of Health certified EMS training center offering EMT-B courses, continuing education, and professional development for pre-hospital providers in Williamstown, Pennsylvania.",
  email: "wemsstation24@gmail.com",
  location: "Williamstown, Pennsylvania",
  address: "Williamstown, PA 17098",
  phone: "",
  facebook: "https://facebook.com/wemstrainingcenter",
  instagram: "https://instagram.com/wemstrainingcenter",
  certification:
    "Certified by PA Department of Health, Bureau of EMS and Emergency Health Services Federation",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://wemstrainingcenter.com",
} as const;
