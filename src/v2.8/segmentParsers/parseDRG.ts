import { MSH, DRG } from "../../../typings";

export function parseDRG(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): DRG {
  const rootName = "DRG";
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const drg = segment.split(fieldSeparator);
  throw new Error("DRG Not implemented");
}
