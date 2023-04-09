import { MSH, PR1 } from "../../../typings";

export const parsePR1 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): PR1 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const pr1 = segment.split(fieldSeparator);
  throw new Error("PR1 Not implemented");
};
