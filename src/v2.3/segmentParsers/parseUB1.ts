import { MSH, UB1 } from "../../../typings";

export const parseUB1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): UB1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const ub1 = segment.split(fieldSeparator);
  return {};
};
