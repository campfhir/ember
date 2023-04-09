import { MSH, PID } from "../../../typings";
import {
  parseCodedWithExceptionsFactory,
  parseDriversLicenseNumberFactory,
  parseExtendedAddressFactory,
  parseExtendedCompositeIdWithCheckDigitFactory,
  hl7StringEscaperFactory,
  hl7ElementMapper,
  parseExtendPersonNameFactory,
  parseExtendedTelecommunicationNumberFactory,
  parseHierarchicDesignator,
  parseHierarchicDesignatorFactory,
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
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseExtendedCompositeIdWithCheckDigit =
    parseExtendedCompositeIdWithCheckDigitFactory(encodingCharacters);
  const parseExtendedAddress = parseExtendedAddressFactory(encodingCharacters);
  const parseDriversLicenseNumber =
    parseDriversLicenseNumberFactory(encodingCharacters);
  const parseHierarchicDesignator =
    parseHierarchicDesignatorFactory(encodingCharacters);
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
      primaryLanguage: (field) => parseCodedWithExceptions(field),
      maritalStatus: (field) => field,
      religion: (field) => field,
      patientAccountNumber: (field) =>
        parseExtendedCompositeIdWithCheckDigit(field),
      patientSocialSecurityNumber: (field) => field,
      driversLicenseNumber: (field) => parseDriversLicenseNumber(field),
      mothersIdentifier: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field) => parseCodedWithExceptions(field)),
      ethnicGroup: (field) => hl7StringEscaper(field),
      birthPlace: (field) => hl7StringEscaper(field),
      multipleBirthIndicator: (field) => field,
      birthOrder: (field) => (field ? parseInt(field, 10) : undefined),
      citizenship: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field) => hl7StringEscaper(field) ?? ""),
      veteransMilitaryStatus: (field) => parseCodedWithExceptions(field),
      nationality: (field) => parseCodedWithExceptions(field),
      patientDeathDateAndTime: (field) => hl7StringEscaper(field),
      patientDeathIndicator: (field) => hl7StringEscaper(field),
      identityUnknownIndicator: (field) => hl7StringEscaper(field),
      identityReliabilityCode: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((id) => parseCodedWithExceptions(id)),
      lastUpdateDateTime: (field) => hl7StringEscaper(field),
      lastUpdateFacility: (field) => parseHierarchicDesignator(field),
      taxonomicClassificationCode: (field) => parseCodedWithExceptions(field),
      breedCode: (field) => parseCodedWithExceptions(field),
      strain: (field) => hl7StringEscaper(field),
      productionClassCode: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((id) => parseCodedWithExceptions(id)),
      tribalCitizenship: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((id) => parseCodedWithExceptions(id)),
      patientTelecommunicationInformation: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((tel) => parseExtendedTelecommunicationNumber(tel)),
    },
    { rootName: "PID" }
  );
};
