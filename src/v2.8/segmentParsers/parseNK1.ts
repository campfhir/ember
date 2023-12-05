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

export function parseNK1(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): NK1 {
  const rootName = "NK1";
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
      name: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((person, repetitionInd) =>
            parseExtendPersonName(person, `${elementPath}[${repetitionInd}]`)
          ),
      relationship: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      address: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((address, repetitionInd) =>
            parseExtendedAddress(address, `${elementPath}[${repetitionInd}]`)
          ),
      phoneNumber: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((phone, repetitionInd) =>
            parseExtendedTelecommunicationNumber(
              phone,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      businessPhoneNumber: (field, elementPath) =>
        field
          .split(repetitionSeparator)
          .map((phone, repetitionInd) =>
            parseExtendedTelecommunicationNumber(
              phone,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      contactRole: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      startDate: (field) => hl7StringEscaper(field),
      endDate: (field) => hl7StringEscaper(field),
      associatedPartiesJobTitle: (field) => hl7StringEscaper(field),
      jobAssociatedPartiesCodeClass: (field, elementPath) =>
        parseJobCodeClass(field, `${elementPath}`),
      associatedPartiesEmployeeNumber: (field, elementPath) =>
        parseExtendedCompositeIdWithCheckDigit(field, `${elementPath}`),
      organizationName: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((org, repetitionInd) =>
            parseExtendedCompositeNameAndIdForOrganizations(
              org,
              `${elementPath}[${repetitionInd}]`
            )
          ),
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
      primaryLanguage: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      livingArrangement: (field) => hl7StringEscaper(field),
      publicityIndicator: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      protectionIndicator: (field) => hl7StringEscaper(field),
      studentIndicator: (field) => hl7StringEscaper(field),
      religion: (field) => hl7StringEscaper(field),
      mothersMaidenName: (field, elementPath) =>
        parseExtendPersonName(field, `${elementPath}`),
      nationalityCode: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      ethnicGroup: (field) => hl7StringEscaper(field),
      contactReason: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((reason, repetitionInd) =>
            parseCodedWithExceptions(reason, `${elementPath}[${repetitionInd}]`)
          ),
      contactPersonName: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((name, repetitionInd) =>
            parseExtendPersonName(name, `${elementPath}[${repetitionInd}]`)
          ),
      contactPersonTelephoneNumber: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((phone, repetitionInd) =>
            parseExtendedTelecommunicationNumber(
              phone,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      contactPersonAddress: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((address, repetitionInd) =>
            parseExtendedAddress(address, `${elementPath}[${repetitionInd}]`)
          ),
      associatedPartyIdentifiers: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((id, repetitionInd) =>
            parseExtendedCompositeIdWithCheckDigit(
              id,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      jobStatus: (field) => hl7StringEscaper(field),
      race: (field) => hl7StringEscaper(field),
      handicap: (field) => hl7StringEscaper(field),
      contactPersonSocialSecurityNumber: (field) => hl7StringEscaper(field),
    },
    { rootName }
  );
}
