import type { HL7Message, WrappedResult } from "../typings";
import d from "debug";

import { parseAdt, parseMSH } from "./v2.3";

const debug = d("parseHL7");

export const parseHL7 = (message: string): WrappedResult<HL7Message> => {
  debug("Attempting to parse a message of %d characters", message.length);
  const segments = message.split("\n");
  debug("Message split into %d segments", segments.length);
  const mshSegment = segments.shift();
  const msh = parseMSH(mshSegment);
  if (!msh.ok) return { ...msh, val: {} };
  if (msh.val.message.type === "ADT") {
    return parseAdt(msh.val, segments);
  }

  return { ok: false, err: new Error("Not Implemented") };
};
