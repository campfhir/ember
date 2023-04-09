import { MSH, IN2 } from "../../../typings";

export const parseIN2 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): IN2 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const in2 = segment.split(fieldSeparator);
  throw new Error("IN2 Not implemented");
};
