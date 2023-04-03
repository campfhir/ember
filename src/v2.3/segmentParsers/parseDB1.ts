import { MSH, DB1 } from "../../../typings";

export const parseDB1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): DB1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const db1 = segment.split(fieldSeparator);
  throw new Error("Not implemented");
};
