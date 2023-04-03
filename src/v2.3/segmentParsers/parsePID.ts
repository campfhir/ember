import { MSH, PID } from "../../../typings";
import {
  parseCodedElement,
  parseDriversLicenseNumber,
  parseExtendedAddress,
  parseExtendedCompositeIdWithCheckDigit,
  parseExtendedTelecommunicationNumber,
  parseExtendPersonName,
  unescapeStrings,
} from "../utils";

export const parsePID = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): PID => {
  const {
    fieldSeparator,
    escapeCharacter,
    subComponentSeparator,
    componentSeparator,
    repetitionSeparator,
  } = controlCharacters;

  const pid = segment.split(fieldSeparator);

  const pidSegment: PID = {
    setId: pid[1] ? parseInt(pid[0], 10) : undefined,
    externalPatientId: parseExtendedCompositeIdWithCheckDigit(
      pid[2],
      controlCharacters
    ),
    internalPatientId: pid[3]
      ?.split(repetitionSeparator)
      ?.map((field) =>
        parseExtendedCompositeIdWithCheckDigit(field, controlCharacters)
      ),
    alternatePatientId: pid[4]
      ?.split(repetitionSeparator)
      ?.map((field) =>
        parseExtendedCompositeIdWithCheckDigit(field, controlCharacters)
      ),
    patientName: pid[5]
      ?.split(repetitionSeparator)
      ?.map((name) => parseExtendPersonName(name, controlCharacters)),
    mothersMaidenName: parseExtendPersonName(pid[6], controlCharacters),
    dateOfBirth: unescapeStrings(pid[7], controlCharacters),
    sex: pid[8],
    patientAlias: pid[9]
      ?.split(repetitionSeparator)
      ?.map((name) => parseExtendPersonName(name, controlCharacters)),
    patientRace: unescapeStrings(pid[10], controlCharacters),
    patientAddress: pid[11]
      ?.split(repetitionSeparator)
      ?.map((address) => parseExtendedAddress(address, controlCharacters)),
    countyCode: unescapeStrings(pid[12], controlCharacters),
    homePhoneNumber: pid[13]
      ?.split(repetitionSeparator)
      .map((number) =>
        parseExtendedTelecommunicationNumber(number, controlCharacters)
      ),
    businessPhoneNumber: pid[14]
      ?.split(repetitionSeparator)
      ?.map((number) =>
        parseExtendedTelecommunicationNumber(number, controlCharacters)
      ),
    primaryLanguage: parseCodedElement(pid[15], controlCharacters),
    maritalStatus: pid[16],
    religion: pid[17],
    patientAccountNumber: parseExtendedCompositeIdWithCheckDigit(
      pid[18],
      controlCharacters
    ),
    patientSocialSecurityNumber: pid[19],
    driversLicenseNumber: parseDriversLicenseNumber(pid[20], controlCharacters),
    mothersIdentifier: pid[21]
      ?.split(repetitionSeparator)
      ?.map((field) => parseCodedElement(field, controlCharacters)),
    ethnicGroup: unescapeStrings(pid[22], controlCharacters),
    birthPlace: unescapeStrings(pid[23], controlCharacters),
    multipleBirthIndicator: pid[24],
    birthOrder: pid[25] ? parseInt(pid[25], 10) : undefined,
    citizenship: pid[26]
      ?.split(repetitionSeparator)
      ?.map((field) => unescapeStrings(field, controlCharacters)),
    veteransMilitaryStatus: parseCodedElement(pid[27], controlCharacters),
    nationalityCode: parseCodedElement(pid[28], controlCharacters),
    patientDeathDateAndTime: pid[29],
    patientDeathIndicator: pid[30],
  };
  return pidSegment;
};
