import { MSH, ROL } from "../../../typings";

export const parseROL = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): ROL => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const rol = segment.split(fieldSeparator);
  throw new Error("ROL Not implemented");
};
