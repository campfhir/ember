import { MSH, ROL } from "../../../typings";

export const parseROL = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): ROL => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const rol = segment.split(fieldSeparator);
  return {};
};
