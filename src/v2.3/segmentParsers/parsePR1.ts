import { MSH, PR1 } from "../../../typings";

export const parsePR1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): PR1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const pr1 = segment.split(fieldSeparator);
  return {};
};
