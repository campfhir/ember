import { MSH, GT1 } from "../../../typings";

export const parseGT1 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): GT1 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const gt1 = segment.split(fieldSeparator);
  throw new Error("GT1 Not implemented");
};
