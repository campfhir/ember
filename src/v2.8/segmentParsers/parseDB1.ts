import { MSH, DB1 } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseExtendedCompositeIdWithCheckDigitFactory,
} from "../utils";

const rootName = "DB1";
export const parseDB1 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): DB1 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const db1 = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseExtendedCompositeIdWithCheckDigit =
    parseExtendedCompositeIdWithCheckDigitFactory(encodingCharacters);

  return hl7ElementMapper(
    db1,
    {
      setId: (field) => hl7StringEscaper(field) ?? "",
      disabledPersonCode: (field) => hl7StringEscaper(field),
      disabledPersonIdentifier: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((person, repetitionInd) =>
            parseExtendedCompositeIdWithCheckDigit(
              person,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      disabledIndicator: (field) => hl7StringEscaper(field),
      disabledStartDate: (field) => hl7StringEscaper(field),
      disabledEndDate: (field) => hl7StringEscaper(field),
      disabilityReturnToWorkDate: (field) => hl7StringEscaper(field),
      disabilityUnableToWorkDate: (field) => hl7StringEscaper(field),
    },
    { rootName }
  );
};
