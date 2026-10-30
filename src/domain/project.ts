export const RARITY = ["legendary", "epic", "rare"] as const;
export type Rarity = (typeof RARITY)[number];

export const PROJECT_STATUS = ["released", "in-progress"] as const;
export type ProjectStatus = (typeof PROJECT_STATUS)[number];

export const STATUS_LABEL: Record<ProjectStatus, string | null> = {
  released: null,
  "in-progress": "in progress",
};

export const byOrder = <T extends { data: { order: number } }>(a: T, b: T): number => a.data.order - b.data.order;
