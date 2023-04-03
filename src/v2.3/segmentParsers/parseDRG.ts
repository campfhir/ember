import { MSH, DRG } from "../../../typings";

export const parseDRG = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): DRG => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const drg = segment.split(fieldSeparator);
  throw new Error("Not implemented");
};
