import { MSH, PV1 } from "../../../typings";
import {
  parseCodedElement,
  parseDischargeToLocation,
  parseExtendedCompositeIdNumberAndName,
  parseExtendedCompositeIdWithCheckDigit,
  parseFinancial,
  parsePersonLocation,
  unescapeStrings,
} from "../utils";

export const parsePV1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): PV1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const pv1 = segment.split(fieldSeparator);

  const pv1Segment: PV1 = {
    setId: pv1[1] ? parseInt(pv1[1], 10) : undefined,
    patientClass: unescapeStrings(pv1[2], controlCharacters),
    assignedPatientLocation: parsePersonLocation(pv1[3], controlCharacters),
    admissionType: unescapeStrings(pv1[4], controlCharacters),
    preadmitNumber: parseCodedElement(pv1[5], controlCharacters),
    priorPatientLocation: parsePersonLocation(pv1[6], controlCharacters),
    attendingDoctor: pv1[7]
      ?.split(repetitionSeparator)
      .map((doctor) =>
        parseExtendedCompositeIdNumberAndName(doctor, controlCharacters)
      ),
    referringDoctor: pv1[8]
      ?.split(repetitionSeparator)
      .map((doctor) =>
        parseExtendedCompositeIdNumberAndName(doctor, controlCharacters)
      ),
    consultingDoctor: pv1[9]
      ?.split(repetitionSeparator)
      .map((doctor) =>
        parseExtendedCompositeIdNumberAndName(doctor, controlCharacters)
      ),
    hospitalService: unescapeStrings(pv1[10], controlCharacters),
    temporaryLocation: parsePersonLocation(pv1[11], controlCharacters),
    preadmitTestIndicator: unescapeStrings(pv1[12], controlCharacters),
    readmissionIndicator: unescapeStrings(pv1[13], controlCharacters),
    admitSource: unescapeStrings(pv1[14], controlCharacters),
    ambulatoryStatus: pv1[15]
      ?.split(repetitionSeparator)
      .map((status) => unescapeStrings(status, controlCharacters)),
    vipIndicator: unescapeStrings(pv1[16], controlCharacters),
    admittingDoctor: pv1[17]
      ?.split(repetitionSeparator)
      .map((doctor) =>
        parseExtendedCompositeIdNumberAndName(doctor, controlCharacters)
      ),
    patientType: unescapeStrings(pv1[18], controlCharacters),
    visitNumber: parseExtendedCompositeIdWithCheckDigit(
      pv1[19],
      controlCharacters
    ),
    financial: pv1[20]
      .split(repetitionSeparator)
      .map((financial) => parseFinancial(financial, controlCharacters)),
    chargePriceIndicator: unescapeStrings(pv1[21], controlCharacters),
    courtesyCode: unescapeStrings(pv1[22], controlCharacters),
    creditRating: unescapeStrings(pv1[23], controlCharacters),
    contractCode: pv1[24]
      ?.split(repetitionSeparator)
      .map((code) => unescapeStrings(code, controlCharacters)),
    contractEffectiveDate: pv1[25]
      ?.split(repetitionSeparator)
      .map((code) => unescapeStrings(code, controlCharacters)),
    contractAmount: pv1[26]
      ?.split(repetitionSeparator)
      .filter((number) => !isNaN(parseInt(number, 10)))
      .map((number) => parseInt(number)),
    contractPeriod: pv1[27]
      ?.split(repetitionSeparator)
      .filter((number) => !isNaN(parseInt(number, 10)))
      .map((number) => parseInt(number)),
    interestCode: unescapeStrings(pv1[28], controlCharacters),
    transferToBadDebtCode: unescapeStrings(pv1[29], controlCharacters),
    transferToBadDebtDate: unescapeStrings(pv1[30], controlCharacters),
    badDebtAgencyCode: unescapeStrings(pv1[31], controlCharacters),
    badDebtTransferAmount: pv1[32] ? parseInt(pv1[32], 10) : undefined,
    badDebRecoveryAmount: pv1[33] ? parseInt(pv1[33], 10) : undefined,
    deleteAccountIndicator: unescapeStrings(pv1[34], controlCharacters),
    deleteAccountDate: unescapeStrings(pv1[35], controlCharacters),
    dischargeDisposition: unescapeStrings(pv1[36], controlCharacters),
    dischargedTo: parseDischargeToLocation(pv1[37], controlCharacters),
    dietType: unescapeStrings(pv1[38], controlCharacters),
    servicingFacility: unescapeStrings(pv1[39], controlCharacters),
    bedStatus: unescapeStrings(pv1[40], controlCharacters),
    accountStatus: unescapeStrings(pv1[41], controlCharacters),
    pendingLocation: parsePersonLocation(pv1[42], controlCharacters),
    priorTemporaryLocation: parsePersonLocation(pv1[43], controlCharacters),
    admitDateTime: unescapeStrings(pv1[44], controlCharacters),
    dischargeDateTime: unescapeStrings(pv1[45], controlCharacters),
    currentPatientBalance: pv1[46] ? parseInt(pv1[46], 10) : undefined,
    totalCharges: pv1[47] ? parseInt(pv1[47], 10) : undefined,
    totalAdjustments: pv1[48] ? parseInt(pv1[48], 10) : undefined,
    totalPayments: pv1[49] ? parseInt(pv1[49], 10) : undefined,
    alternateVisitId: parseExtendedCompositeIdWithCheckDigit(
      pv1[50],
      controlCharacters
    ),
    visitIndicator: unescapeStrings(pv1[51], controlCharacters),
    otherHealthcareProvider: pv1[52]
      ?.split(repetitionSeparator)
      .map((doctor) =>
        parseExtendedCompositeIdNumberAndName(doctor, controlCharacters)
      ),
  };

  return pv1Segment;
};
