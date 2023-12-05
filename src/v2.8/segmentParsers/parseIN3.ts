import { MSH, IN3 } from "../../../typings";

export function parseIN3(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): IN3 {
  const rootName = "IN3";
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const in3 = segment.split(fieldSeparator);
  throw new Error("IN3 Not implemented");
}
