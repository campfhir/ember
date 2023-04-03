import { MSH, ACC } from "../../../typings";

export const parseACC = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): ACC => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const acc = segment.split(fieldSeparator);
  return {};
};
