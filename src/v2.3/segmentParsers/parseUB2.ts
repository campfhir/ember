import { MSH, UB2 } from "../../../typings";

export const parseUB2 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): UB2 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const ub2 = segment.split(fieldSeparator);
  throw new Error("Not implemented");
};
