import { MSH, IN3 } from "../../../typings";

export const parseIN3 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): IN3 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const in3 = segment.split(fieldSeparator);
  throw new Error("Not implemented");
};
