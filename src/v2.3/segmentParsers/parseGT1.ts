import { MSH, GT1 } from "../../../typings";

export const parseGT1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): GT1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const gt1 = segment.split(fieldSeparator);
  throw new Error("Not implemented");
};
