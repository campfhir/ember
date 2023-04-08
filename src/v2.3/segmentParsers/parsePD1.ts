import { MSH, PD1 } from "../../../typings";
import {
  hl7StringEscaper,
  parseCodedElement,
  parseExtendedCompositeIdNumberAndName,
  parseExtendedCompositeIdWithCheckDigit,
  parseExtendedCompositeNameAndIdForOrganizations,
} from "../utils";

export const parsePD1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): PD1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const pd1 = segment.split(fieldSeparator);
  return {
    livingDependency: hl7StringEscaper(pd1[1], controlCharacters),
    livingArrangement: hl7StringEscaper(pd1[2], controlCharacters),
    patientPrimaryFacility: pd1[3]
      ?.split(repetitionSeparator)
      .map((facility) =>
        parseExtendedCompositeNameAndIdForOrganizations(
          facility,
          controlCharacters
        )
      ),
    patientPrimaryCareProviderNameAndIdNumber: pd1[4]
      ?.split(repetitionSeparator)
      .map((provider) =>
        parseExtendedCompositeIdNumberAndName(provider, controlCharacters)
      ),
    studentStatus: hl7StringEscaper(pd1[5], controlCharacters),
    handicap: hl7StringEscaper(pd1[6], controlCharacters),
    livingWill: hl7StringEscaper(pd1[7], controlCharacters),
    organDonor: hl7StringEscaper(pd1[8], controlCharacters),
    separateBill: hl7StringEscaper(pd1[9], controlCharacters),
    duplicatePatient: pd1[10]
      ?.split(repetitionSeparator)
      .map((patient) =>
        parseExtendedCompositeIdWithCheckDigit(patient, controlCharacters)
      ),
    publicityIndicator: parseCodedElement(pd1[11], controlCharacters),
    protectionIndicator: hl7StringEscaper(pd1[12], controlCharacters),
  };
};
