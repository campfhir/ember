export * from "./v2.3";
export type WrappedResult<T = any, E extends Error = Error> =
  | {
      ok: true;
      val: T;
      warnings: Error[];
    }
  | {
      ok: false;
      err: E;
      val?: Partial<T>;
    };
