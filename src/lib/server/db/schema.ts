import {
  sqliteTable,
  text,
  integer,
  customType,
} from "drizzle-orm/sqlite-core";

const json = customType<any>({
  dataType() {
    return "json";
  },
  fromDriver(value: string) {
    return JSON.parse(value);
  },
  toDriver(value: any) {
    return JSON.stringify(value);
  },
});

export const songs = sqliteTable("songs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").notNull().unique(),
  title: text("title").notNull(),
  meta: text("meta"),
  extraFiles: json("extra_files").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
