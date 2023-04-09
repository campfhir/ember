import { MSH, DRG } from "../../../typings";

export const parseDRG = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): DRG => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const drg = segment.split(fieldSeparator);
  throw new Error("DRG Not implemented");
};
