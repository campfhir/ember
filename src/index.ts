import type { HL7Message, WrappedResult } from "../typings";

import { debugLogger, parseAdt, parseMSH } from "./v2.8";

const debug = debugLogger.extend("parseHL7");

export function parseHL7(message: string): WrappedResult<HL7Message> {
  debug("Attempting to parse a message of %d characters", message.length);
  const segments = message.split(/(?:\r\n|\n|\r)/g);
  debug("Message split into %d segments", segments.length);
  const mshSegment = segments.shift();
  const msh = parseMSH(mshSegment);
  if (!msh.ok) return { ...msh, val: {} };
  debug(
    "Message Type => %s Event => %s",
    msh.val.message.type,
    msh.val.message.event
  );
  if (msh.val.message.type === "ADT") {
    return parseAdt(msh.val, segments);
  }

  return { ok: false, err: new Error("Not Implemented") };
}
