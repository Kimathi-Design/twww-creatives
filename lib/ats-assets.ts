/** Brand assets for the deck viewer  -  same shape as ATS profile. */

import { IMAGES, CLIENTS, CONTACT } from "@/lib/ats-content";

export const ATS_ASSETS = {
  logoColor: IMAGES.coke,
  logoWhite: IMAGES.coke,
  mediapal: IMAGES.mediapal,
  icon: IMAGES.icon,
  appleIcon: IMAGES.appleIcon,
  crispPdf: `/${"TWWW_MediaPal_Proposal.pdf"}`,
  editablePdf: `/${"TWWW_MediaPal_Proposal_Editable.pdf"}`,
  images: {
    cover: IMAGES.cover,
    glance: IMAGES.kenya,
    corporate: IMAGES.next,
    contact: IMAGES.ctv,
  },
  awards: {
    wta2026: IMAGES.wta2026,
    wta2025: IMAGES.wta2025,
    wta2024: IMAGES.wta2024,
  },
  clients: [] as { name: string; src: string }[],
} as const;

void CLIENTS;

export const ATS_CONTACT = {
  phones: [...CONTACT.phones],
  email: CONTACT.email,
  address: [...CONTACT.address],
  eldoret: CONTACT.eldoret,
  website: CONTACT.website,
} as const;
