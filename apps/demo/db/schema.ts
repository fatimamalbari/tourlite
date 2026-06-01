import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const tours = sqliteTable("tours", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  appUrl: text("app_url").notNull(),
  status: text("status").notNull(), // 'draft' | 'published' | 'generating'
  author: text("author").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const steps = sqliteTable("steps", {
  id: text("id").primaryKey(),
  tourId: text("tour_id").notNull().references(() => tours.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  selector: text("selector").notNull(),
  placement: text("placement").notNull(), // 'top' | 'bottom' | 'left' | 'right'
});

export const scans = sqliteTable("scans", {
  id: text("id").primaryKey(),
  appUrl: text("app_url").notNull(),
  elements: integer("elements").notNull(),
  status: text("status").notNull(), // 'complete' | 'running'
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
