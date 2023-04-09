import { MSH, PID } from "../../../typings";
import {
  parseCodedElementFactory,
  parseDriversLicenseNumberFactory,
  parseExtendedAddressFactory,
  parseExtendedCompositeIdWithCheckDigitFactory,
  hl7StringEscaperFactory,
  hl7ElementMapper,
  parseExtendPersonNameFactory,
  parseExtendedTelecommunicationNumberFactory,
} from "../utils";

export const parsePID = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): PID => {
  const {
    fieldSeparator,
    escapeCharacter,
    subComponentSeparator,
    componentSeparator,
    repetitionSeparator,
  } = encodingCharacters;

  const pid = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseCodedElement = parseCodedElementFactory(encodingCharacters);
  const parseExtendedCompositeIdWithCheckDigit =
    parseExtendedCompositeIdWithCheckDigitFactory(encodingCharacters);
  const parseExtendedAddress = parseExtendedAddressFactory(encodingCharacters);
  const parseDriversLicenseNumber =
    parseDriversLicenseNumberFactory(encodingCharacters);

  const parseExtendPersonName =
    parseExtendPersonNameFactory(encodingCharacters);
  const parseExtendedTelecommunicationNumber =
    parseExtendedTelecommunicationNumberFactory(encodingCharacters);

  return hl7ElementMapper<PID>(
    pid,
    {
      setId: (field) => (field ? parseInt(field, 10) : undefined),
      externalPatientId: (field) =>
        parseExtendedCompositeIdWithCheckDigit(field),
      internalPatientId: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field) => parseExtendedCompositeIdWithCheckDigit(field)),
      alternatePatientId: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field) => parseExtendedCompositeIdWithCheckDigit(field)),
      patientName: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((name) => parseExtendPersonName(name) ?? ""),
      mothersMaidenName: (field) => parseExtendPersonName(field),
      dateOfBirth: (field) => hl7StringEscaper(field),
      sex: (field) => field,
      patientAlias: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((name) => parseExtendPersonName(name)),
      patientRace: (field) => hl7StringEscaper(field),
      patientAddress: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((address) => parseExtendedAddress(address)),
      countyCode: (field) => hl7StringEscaper(field),
      homePhoneNumber: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((number) => parseExtendedTelecommunicationNumber(number)),
      businessPhoneNumber: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((number) => parseExtendedTelecommunicationNumber(number)),
      primaryLanguage: (field) => parseCodedElement(field),
      maritalStatus: (field) => field,
      religion: (field) => field,
      patientAccountNumber: (field) =>
        parseExtendedCompositeIdWithCheckDigit(field),
      patientSocialSecurityNumber: (field) => field,
      driversLicenseNumber: (field) => parseDriversLicenseNumber(field),
      mothersIdentifier: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field) => parseCodedElement(field)),
      ethnicGroup: (field) => hl7StringEscaper(field),
      birthPlace: (field) => hl7StringEscaper(field),
      multipleBirthIndicator: (field) => field,
      birthOrder: (field) => (field ? parseInt(field, 10) : undefined),
      citizenship: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field) => hl7StringEscaper(field) ?? ""),
      veteransMilitaryStatus: (field) => parseCodedElement(field),
      nationalityCode: (field) => parseCodedElement(field),
      patientDeathDateAndTime: (field) => field,
      patientDeathIndicator: (field) => field,
    },
    { rootName: "PID" }
  );
};