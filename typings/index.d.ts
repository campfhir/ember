export * from "./v2.8";
export type HL7MappingDefinition<T> = {
  [P in keyof K]: ((element: string) => K[P]) | K[P];
};
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
