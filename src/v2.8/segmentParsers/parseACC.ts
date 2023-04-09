import { MSH, ACC } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
} from "../utils";

export const parseACC = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): ACC => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const acc = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);

  return hl7ElementMapper<ACC>(
    acc,
    {
      accidentDateTime: (field) => hl7StringEscaper(field),
      accidentCode: (field) => parseCodedWithExceptions(field),
      accidentLocation: (field) => hl7StringEscaper(field),
      autoAccidentState: (field) => parseCodedWithExceptions(field),
      accidentJobRelatedIndicator: (field) => hl7StringEscaper(field),
      accidentDeathIndicator: (field) => hl7StringEscaper(field),
    },
    { rootName: "ACC" }
  );
};
