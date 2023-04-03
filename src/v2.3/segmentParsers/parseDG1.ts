import { MSH, DG1 } from "../../../typings";

export const parseDG1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): DG1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const dg1 = segment.split(fieldSeparator);
  throw new Error("Not implemented");
};
