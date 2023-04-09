import { MSH, DG1 } from "../../../typings";

export const parseDG1 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): DG1 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const dg1 = segment.split(fieldSeparator);
  throw new Error("DG1 Not implemented");
};
