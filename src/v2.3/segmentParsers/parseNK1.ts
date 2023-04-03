import { MSH, NK1 } from "../../../typings";

export const parseNK1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): NK1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const NK1 = segment.split(fieldSeparator);
  throw new Error("Not implemented");
};
