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
  parseHierarchicDesignatorFactory,
} from "../utils";

export function parsePID(
  segment: string,
  opt?: {
    encodingCharacters?: MSH["encodingCharacters"];
    hasSegmentHeader?: boolean;
  }
): PID {
  const hasSegmentHeader = opt?.hasSegmentHeader ?? false;
  const encodingCharacters = opt?.encodingCharacters;
  const rootName = "PID";
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  const pid = segment.split(fieldSeparator);
  if (hasSegmentHeader) {
    pid.shift();
  }

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
      externalPatientId: (field, elementPath) =>
        parseExtendedCompositeIdWithCheckDigit(field, `${elementPath}`),
      internalPatientId: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field, repetitionInd) =>
            parseExtendedCompositeIdWithCheckDigit(
              field,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      alternatePatientId: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field, repetitionInd) =>
            parseExtendedCompositeIdWithCheckDigit(
              field,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      patientName: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          ?.map(
            (name, repetitionInd) =>
              parseExtendPersonName(name, `${elementPath}[${repetitionInd}]`) ??
              ""
          ),
      mothersMaidenName: (field, elementPath) =>
        parseExtendPersonName(field, `${elementPath}`),
      dateOfBirth: (field) => hl7StringEscaper(field),
      sex: (field) => field,
      patientAlias: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          ?.map((name, repetitionInd) =>
            parseExtendPersonName(name, `${elementPath}[${repetitionInd}]`)
          ),
      patientRace: (field) => hl7StringEscaper(field),
      patientAddress: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          ?.map((address, repetitionInd) =>
            parseExtendedAddress(address, `${elementPath}[${repetitionInd}]`)
          ),
      countyCode: (field) => hl7StringEscaper(field),
      homePhoneNumber: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((number, repetitionInd) =>
            parseExtendedTelecommunicationNumber(
              number,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      businessPhoneNumber: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          ?.map((number, repetitionInd) =>
            parseExtendedTelecommunicationNumber(
              number,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      primaryLanguage: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      maritalStatus: (field) => field,
      religion: (field) => field,
      patientAccountNumber: (field, elementPath) =>
        parseExtendedCompositeIdWithCheckDigit(field, `${elementPath}`),
      patientSocialSecurityNumber: (field) => field,
      driversLicenseNumber: (field, elementPath) =>
        parseDriversLicenseNumber(field, `${elementPath}`),
      mothersIdentifier: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field, repetitionInd) =>
            parseCodedWithExceptions(field, `${elementPath}[${repetitionInd}]`)
          ),
      ethnicGroup: (field) => hl7StringEscaper(field),
      birthPlace: (field) => hl7StringEscaper(field),
      multipleBirthIndicator: (field) => field,
      birthOrder: (field) => (field ? parseInt(field, 10) : undefined),
      citizenship: (field) =>
        field
          ?.split(repetitionSeparator)
          ?.map((field) => hl7StringEscaper(field) ?? ""),
      veteransMilitaryStatus: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      nationality: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      patientDeathDateAndTime: (field) => hl7StringEscaper(field),
      patientDeathIndicator: (field) => hl7StringEscaper(field),
      identityUnknownIndicator: (field) => hl7StringEscaper(field),
      identityReliabilityCode: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((id, repetitionInd) =>
            parseCodedWithExceptions(id, `${elementPath}[${repetitionInd}]`)
          ),
      lastUpdateDateTime: (field) => hl7StringEscaper(field),
      lastUpdateFacility: (field, elementPath) =>
        parseHierarchicDesignator(field, `${elementPath}`),
      taxonomicClassificationCode: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      breedCode: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      strain: (field) => hl7StringEscaper(field),
      productionClassCode: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((id, repetitionInd) =>
            parseCodedWithExceptions(id, `${elementPath}[${repetitionInd}]`)
          ),
      tribalCitizenship: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((id, repetitionInd) =>
            parseCodedWithExceptions(id, `${elementPath}[${repetitionInd}]`)
          ),
      patientTelecommunicationInformation: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((tel, repetitionInd) =>
            parseExtendedTelecommunicationNumber(
              tel,
              `${elementPath}[${repetitionInd}]`
            )
          ),
    },
    { rootName }
  );
}

export function isPID(unk: unknown): unk is PID {
  if (typeof unk != "object") return false;
  if (unk == null) {
    return false;
  }
  if (!("patientName" in (unk as PID))) {
    return false;
  }

  if (
    typeof (unk as PID)["patientName"] !== "object" ||
    (unk as PID).patientName == null
  ) {
    return false;
  }

  return true;
}
