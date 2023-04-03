import { MSH, PD1 } from "../../../typings";

export const parsePD1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): PD1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const pd1 = segment.split(fieldSeparator);
  throw new Error("Not implemented");
};
