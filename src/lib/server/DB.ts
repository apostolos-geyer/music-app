import { createClient } from "@libsql/client";

import { type TransactionMode, type Transaction } from "@libsql/client";

/**
 * The turso database
 */
export const db = createClient({
  url: "http://127.0.0.1:8080",
});

/**
 * Wrap DB actions in a transaction, rollback if failed.
 */
export const transaction = async <T, ET>(
  mode: TransactionMode,
  cb: (db: Transaction) => Promise<T>,
): Promise<[T, undefined] | [T | undefined, ET]> => {
  let result: T | undefined = undefined;
  const tdb = await db.transaction(mode);
  try {
    result = await cb(tdb);
    await tdb.commit();
    return [result, undefined];
  } catch (e) {
    await tdb.rollback();
    return [result, e as ET];
  }
};
