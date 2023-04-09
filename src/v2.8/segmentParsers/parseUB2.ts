import { MSH, UB2 } from "../../../typings";

export const parseUB2 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): UB2 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const ub2 = segment.split(fieldSeparator);
  throw new Error("UB2 Not implemented");
};
