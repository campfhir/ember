import { MSH, PD1 } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
  parseExtendedCompositeIdNumberAndNameFactory,
  parseExtendedCompositeIdWithCheckDigitFactory,
  parseExtendedCompositeNameAndIdForOrganizationsFactory,
} from "../utils";

const rootName = "PD1";

export const parsePD1 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): PD1 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const pd1 = segment.split(fieldSeparator);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseExtendedCompositeIdNumberAndName =
    parseExtendedCompositeIdNumberAndNameFactory(encodingCharacters);
  const parseExtendedCompositeIdWithCheckDigit =
    parseExtendedCompositeIdWithCheckDigitFactory(encodingCharacters);
  const parseExtendedCompositeNameAndIdForOrganizations =
    parseExtendedCompositeNameAndIdForOrganizationsFactory(encodingCharacters);

  return hl7ElementMapper(
    pd1,
    {
      livingDependency: (field) => hl7StringEscaper(field),
      livingArrangement: (field) => hl7StringEscaper(field),
      patientPrimaryFacility: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((facility, repetitionInd) =>
            parseExtendedCompositeNameAndIdForOrganizations(
              facility,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      patientPrimaryCareProviderNameAndIdNumber: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((provider, repetitionInd) =>
            parseExtendedCompositeIdNumberAndName(
              provider,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      studentStatus: (field) => hl7StringEscaper(field),
      handicap: (field) => hl7StringEscaper(field),
      livingWill: (field) => hl7StringEscaper(field),
      organDonor: (field) => hl7StringEscaper(field),
      separateBill: (field) => hl7StringEscaper(field),
      duplicatePatient: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((patient, repetitionInd) =>
            parseExtendedCompositeIdWithCheckDigit(
              patient,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      publicityIndicator: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      protectionIndicator: (field) => hl7StringEscaper(field),
    },
    { rootName }
  );
};
