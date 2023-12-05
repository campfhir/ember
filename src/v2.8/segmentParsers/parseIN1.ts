import { MSH, IN1 } from "../../../typings";

export function parseIN1(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): IN1 {
  const rootName = "IN1";
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const in1 = segment.split(fieldSeparator);
  throw new Error("IN1 Not implemented");
}
