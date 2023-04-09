import { MSH, NK1 } from "../../../typings";
import {
  parseCodedWithExceptionsFactory,
  parseExtendPersonNameFactory,
  parseExtendedCompositeIdWithCheckDigitFactory,
  parseExtendedCompositeNameAndIdForOrganizationsFactory,
  hl7StringEscaperFactory,
  hl7ElementMapper,
  parseExtendedAddressFactory,
  parseExtendedTelecommunicationNumberFactory,
  parseJobCodeClassFactory,
} from "../utils";

export const parseNK1 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): NK1 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const nk1 = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);

  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseExtendPersonName =
    parseExtendPersonNameFactory(encodingCharacters);
  const parseExtendedAddress = parseExtendedAddressFactory(encodingCharacters);
  const parseExtendedTelecommunicationNumber =
    parseExtendedTelecommunicationNumberFactory(encodingCharacters);
  const parseExtendedCompositeNameAndIdForOrganizations =
    parseExtendedCompositeNameAndIdForOrganizationsFactory(encodingCharacters);
  const parseJobCodeClass = parseJobCodeClassFactory(encodingCharacters);
  const parseExtendedCompositeIdWithCheckDigit =
    parseExtendedCompositeIdWithCheckDigitFactory(encodingCharacters);

  return hl7ElementMapper<NK1>(
    nk1,
    {
      setID: (field) => hl7StringEscaper(field) ?? "",
      name: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((person) => parseExtendPersonName(person)),
      relationship: (field) => parseCodedWithExceptions(field),
      address: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((address) => parseExtendedAddress(address)),
      phoneNumber: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((phone) => parseExtendedTelecommunicationNumber(phone)),
      businessPhoneNumber: (field) =>
        field
          .split(repetitionSeparator)
          .map((phone) => parseExtendedTelecommunicationNumber(phone)),
      contactRole: (field) => parseCodedWithExceptions(field),
      startDate: (field) => hl7StringEscaper(field),
      endDate: (field) => hl7StringEscaper(field),
      associatedPartiesJobTitle: (field) => hl7StringEscaper(field),
      jobAssociatedPartiesCodeClass: (field) => parseJobCodeClass(field),
      associatedPartiesEmployeeNumber: (field) =>
        parseExtendedCompositeIdWithCheckDigit(field),
      organizationName: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((org) => parseExtendedCompositeNameAndIdForOrganizations(org)),
      maritalStatus: (field) => hl7StringEscaper(field),
      sex: (field) => hl7StringEscaper(field),
      dateOfBirth: (field) => hl7StringEscaper(field),
      livingDependency: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((dep) => hl7StringEscaper(dep) ?? ""),
      ambulatoryStatus: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((ambulatoryStatus) => hl7StringEscaper(ambulatoryStatus) ?? ""),
      citizenship: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((citizenship) => hl7StringEscaper(citizenship) ?? ""),
      primaryLanguage: (field) => parseCodedWithExceptions(field),
      livingArrangement: (field) => hl7StringEscaper(field),
      publicityIndicator: (field) => parseCodedWithExceptions(field),
      protectionIndicator: (field) => hl7StringEscaper(field),
      studentIndicator: (field) => hl7StringEscaper(field),
      religion: (field) => hl7StringEscaper(field),
      mothersMaidenName: (field) => parseExtendPersonName(field),
      nationalityCode: (field) => parseCodedWithExceptions(field),
      ethnicGroup: (field) => hl7StringEscaper(field),
      contactReason: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((reason) => parseCodedWithExceptions(reason)),
      contactPersonName: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((name) => parseExtendPersonName(name)),
      contactPersonTelephoneNumber: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((phone) => parseExtendedTelecommunicationNumber(phone)),
      contactPersonAddress: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((address) => parseExtendedAddress(address)),
      associatedPartyIdentifiers: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((id) => parseExtendedCompositeIdWithCheckDigit(id)),
      jobStatus: (field) => hl7StringEscaper(field),
      race: (field) => hl7StringEscaper(field),
      handicap: (field) => hl7StringEscaper(field),
      contactPersonSocialSecurityNumber: (field) => hl7StringEscaper(field),
    },
    { rootName: "NK1" }
  );
};
