import { MSH, IN1 } from "../../../typings";

export const parseIN1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): IN1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const in1 = segment.split(fieldSeparator);
  return {};
};
