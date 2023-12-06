import { MSH, ARV } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
  parseCodedWithNoExceptionsFactory,
  parseDriversLicenseNumberFactory,
  parseExtendedAddressFactory,
  parseExtendedCompositeIdWithCheckDigitFactory,
  parseExtendPersonNameFactory,
  parseExtendedTelecommunicationNumberFactory,
  parseHierarchicDesignatorFactory,
  parseDischargeToLocationFactory,
  parseFinancialFactory,
  parseJobCodeClassFactory,
  parsePersonLocationFactory,
  parseExtendedCompositeNameAndIdForOrganizationsFactory,
  parseDateRangeFactory,
} from "../utils";

export function parseARV(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): ARV {
  const rootName = "ARV";
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const ARV = segment.split(fieldSeparator);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseCodedWithNoExceptions =
    parseCodedWithNoExceptionsFactory(encodingCharacters);
  const parseDateRange = parseDateRangeFactory(encodingCharacters);

  return hl7ElementMapper(
    ARV,
    {
      setId: (field) => (field ? parseInt(field, 10) : undefined),
      accessRestrictionActionCode: (field, elementPath) =>
        parseCodedWithNoExceptions(field, elementPath),
      accessRestrictionValue: (field, elementPath) =>
        parseCodedWithExceptions(field, elementPath),
      accessRestrictionReason: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field, repetitionInd) =>
            parseCodedWithExceptions(field, `${elementPath}[${repetitionInd}]`)
          ),
      specialAccessRestrictionInstructions: (field) =>
        field?.split(repetitionSeparator),
      accessRestrictionDateRange: (field, element) =>
        parseDateRange(field, element),
    },
    { rootName }
  );
}
