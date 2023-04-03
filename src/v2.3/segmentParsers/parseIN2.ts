import { MSH, IN2 } from "../../../typings";

export const parseIN2 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): IN2 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const in2 = segment.split(fieldSeparator);
  return {};
};
