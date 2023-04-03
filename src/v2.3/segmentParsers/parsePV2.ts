import { MSH, PV2 } from "../../../typings";

export const parsePV2 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): PV2 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const pv2 = segment.split(fieldSeparator);
  return {};
};
