import { MSH, ACC } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaper,
  parseCodedElement,
} from "../utils";

export const parseACC = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): ACC => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const acc = segment.split(fieldSeparator);
  return hl7ElementMapper<ACC>(acc, {
    accidentDateTime: (s) => hl7StringEscaper(s, controlCharacters),
    accidentCode: (s) => parseCodedElement(s, controlCharacters),
    accidentLocation: (s) => hl7StringEscaper(s, controlCharacters),
    autoAccidentState: (s) => parseCodedElement(s, controlCharacters),
    accidentJobRelatedIndicator: (s) => hl7StringEscaper(s, controlCharacters),
    accidentDeathIndicator: (s) => hl7StringEscaper(s, controlCharacters),
  });
};
