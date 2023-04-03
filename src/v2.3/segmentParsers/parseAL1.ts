import { MSH, AL1 } from "../../../typings";

export const parseAL1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): AL1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const al1 = segment.split(fieldSeparator);
  return {};
};
