import { MSH, NK1 } from "../../../typings";
import {
  parseCodedElement,
  parseExtendPersonName,
  parseExtendedAddress,
  parseExtendedCompositeIdWithCheckDigit,
  parseExtendedCompositeNameAndIdForOrganizations,
  parseExtendedTelecommunicationNumber,
  parseJobCodeClass,
  hl7StringEscaper,
} from "../utils";

export const parseNK1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): NK1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const nk1 = segment.split(fieldSeparator);

  return {
    setID: hl7StringEscaper(nk1[1], controlCharacters) ?? "",
    name: nk1[2]
      ?.split(repetitionSeparator)
      .map((person) => parseExtendPersonName(person, controlCharacters)),
    relationship: parseCodedElement(nk1[3], controlCharacters),
    address: nk1[4]
      ?.split(repetitionSeparator)
      .map((address) => parseExtendedAddress(address, controlCharacters)),
    phoneNumber: nk1[5]
      ?.split(repetitionSeparator)
      .map((phone) =>
        parseExtendedTelecommunicationNumber(phone, controlCharacters)
      ),
    businessPhoneNumber: nk1[6]
      .split(repetitionSeparator)
      .map((phone) =>
        parseExtendedTelecommunicationNumber(phone, controlCharacters)
      ),
    contactRole: parseCodedElement(nk1[7], controlCharacters),
    startDate: hl7StringEscaper(nk1[8], controlCharacters),
    endDate: hl7StringEscaper(nk1[9], controlCharacters),
    associatedPartiesJobTitle: hl7StringEscaper(nk1[10], controlCharacters),
    jobAssociatedPartiesCodeClass: parseJobCodeClass(
      nk1[11],
      controlCharacters
    ),
    associatedPartiesEmployeeNumber: parseExtendedCompositeIdWithCheckDigit(
      nk1[12],
      controlCharacters
    ),
    organizationName: nk1[13]
      ?.split(repetitionSeparator)
      .map((org) =>
        parseExtendedCompositeNameAndIdForOrganizations(org, controlCharacters)
      ),
    maritalStatus: hl7StringEscaper(nk1[14], controlCharacters),
    sex: hl7StringEscaper(nk1[15], controlCharacters),
    dateOfBirth: hl7StringEscaper(nk1[16], controlCharacters),
    livingDependency: nk1[17]
      ?.split(repetitionSeparator)
      .map((dep) => hl7StringEscaper(dep, controlCharacters)),
    ambulatoryStatus: nk1[18]
      ?.split(repetitionSeparator)
      .map((ambulatoryStatus) =>
        hl7StringEscaper(ambulatoryStatus, controlCharacters)
      ),
    citizenship: nk1[19]
      ?.split(repetitionSeparator)
      .map((citizenship) => hl7StringEscaper(citizenship, controlCharacters)),
    primaryLanguage: parseCodedElement(nk1[20], controlCharacters),
    livingArrangement: hl7StringEscaper(nk1[21], controlCharacters),
    publicityIndicator: parseCodedElement(nk1[22], controlCharacters),
    protectionIndicator: hl7StringEscaper(nk1[23], controlCharacters),
    studentIndicator: hl7StringEscaper(nk1[24], controlCharacters),
    religion: hl7StringEscaper(nk1[25], controlCharacters),
    mothersMaidenName: parseExtendPersonName(nk1[26], controlCharacters),
    nationalityCode: parseCodedElement(nk1[27], controlCharacters),
    ethnicGroup: hl7StringEscaper(nk1[28], controlCharacters),
    contactReason: nk1[29]
      ?.split(repetitionSeparator)
      .map((reason) => parseCodedElement(reason, controlCharacters)),
    contactPersonName: nk1[30]
      ?.split(repetitionSeparator)
      .map((name) => parseExtendPersonName(name, controlCharacters)),
    contactPersonTelephoneNumber: nk1[31]
      ?.split(repetitionSeparator)
      .map((phone) =>
        parseExtendedTelecommunicationNumber(phone, controlCharacters)
      ),
    contactPersonAddress: nk1[32]
      ?.split(repetitionSeparator)
      .map((address) => parseExtendedAddress(address, controlCharacters)),
    associatedPartyIdentifiers: nk1[33]
      ?.split(repetitionSeparator)
      .map((id) =>
        parseExtendedCompositeIdWithCheckDigit(id, controlCharacters)
      ),
    jobStatus: hl7StringEscaper(nk1[34], controlCharacters),
    race: hl7StringEscaper(nk1[35], controlCharacters),
    handicap: hl7StringEscaper(nk1[36], controlCharacters),
    contactPersonSocialSecurityNumber: hl7StringEscaper(
      nk1[37],
      controlCharacters
    ),
  };
};
