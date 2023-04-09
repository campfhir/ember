import { MSH, UB1 } from "../../../typings";

export const parseUB1 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): UB1 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const ub1 = segment.split(fieldSeparator);
  throw new Error("UB1 Not implemented");
};
