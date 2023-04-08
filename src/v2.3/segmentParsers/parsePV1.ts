import { MSH, PV1 } from "../../../typings";
import {
  parseCodedElement,
  parseDischargeToLocation,
  parseExtendedCompositeIdNumberAndName,
  parseExtendedCompositeIdWithCheckDigit,
  parseFinancial,
  parsePersonLocation,
  hl7StringEscaper,
} from "../utils";

export const parsePV1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): PV1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const pv1 = segment.split(fieldSeparator);

  return {
    setId: pv1[1] ? parseInt(pv1[1], 10) : undefined,
    patientClass: hl7StringEscaper(pv1[2], controlCharacters),
    assignedPatientLocation: parsePersonLocation(pv1[3], controlCharacters),
    admissionType: hl7StringEscaper(pv1[4], controlCharacters),
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
    hospitalService: hl7StringEscaper(pv1[10], controlCharacters),
    temporaryLocation: parsePersonLocation(pv1[11], controlCharacters),
    preadmitTestIndicator: hl7StringEscaper(pv1[12], controlCharacters),
    readmissionIndicator: hl7StringEscaper(pv1[13], controlCharacters),
    admitSource: hl7StringEscaper(pv1[14], controlCharacters),
    ambulatoryStatus: pv1[15]
      ?.split(repetitionSeparator)
      .map((status) => hl7StringEscaper(status, controlCharacters)),
    vipIndicator: hl7StringEscaper(pv1[16], controlCharacters),
    admittingDoctor: pv1[17]
      ?.split(repetitionSeparator)
      .map((doctor) =>
        parseExtendedCompositeIdNumberAndName(doctor, controlCharacters)
      ),
    patientType: hl7StringEscaper(pv1[18], controlCharacters),
    visitNumber: parseExtendedCompositeIdWithCheckDigit(
      pv1[19],
      controlCharacters
    ),
    financial: pv1[20]
      .split(repetitionSeparator)
      .map((financial) => parseFinancial(financial, controlCharacters)),
    chargePriceIndicator: hl7StringEscaper(pv1[21], controlCharacters),
    courtesyCode: hl7StringEscaper(pv1[22], controlCharacters),
    creditRating: hl7StringEscaper(pv1[23], controlCharacters),
    contractCode: pv1[24]
      ?.split(repetitionSeparator)
      .map((code) => hl7StringEscaper(code, controlCharacters)),
    contractEffectiveDate: pv1[25]
      ?.split(repetitionSeparator)
      .map((code) => hl7StringEscaper(code, controlCharacters)),
    contractAmount: pv1[26]
      ?.split(repetitionSeparator)
      .filter((number) => !isNaN(parseInt(number, 10)))
      .map((number) => parseInt(number)),
    contractPeriod: pv1[27]
      ?.split(repetitionSeparator)
      .filter((number) => !isNaN(parseInt(number, 10)))
      .map((number) => parseInt(number)),
    interestCode: hl7StringEscaper(pv1[28], controlCharacters),
    transferToBadDebtCode: hl7StringEscaper(pv1[29], controlCharacters),
    transferToBadDebtDate: hl7StringEscaper(pv1[30], controlCharacters),
    badDebtAgencyCode: hl7StringEscaper(pv1[31], controlCharacters),
    badDebtTransferAmount: pv1[32] ? parseInt(pv1[32], 10) : undefined,
    badDebRecoveryAmount: pv1[33] ? parseInt(pv1[33], 10) : undefined,
    deleteAccountIndicator: hl7StringEscaper(pv1[34], controlCharacters),
    deleteAccountDate: hl7StringEscaper(pv1[35], controlCharacters),
    dischargeDisposition: hl7StringEscaper(pv1[36], controlCharacters),
    dischargedTo: parseDischargeToLocation(pv1[37], controlCharacters),
    dietType: hl7StringEscaper(pv1[38], controlCharacters),
    servicingFacility: hl7StringEscaper(pv1[39], controlCharacters),
    bedStatus: hl7StringEscaper(pv1[40], controlCharacters),
    accountStatus: hl7StringEscaper(pv1[41], controlCharacters),
    pendingLocation: parsePersonLocation(pv1[42], controlCharacters),
    priorTemporaryLocation: parsePersonLocation(pv1[43], controlCharacters),
    admitDateTime: hl7StringEscaper(pv1[44], controlCharacters),
    dischargeDateTime: hl7StringEscaper(pv1[45], controlCharacters),
    currentPatientBalance: pv1[46] ? parseInt(pv1[46], 10) : undefined,
    totalCharges: pv1[47] ? parseInt(pv1[47], 10) : undefined,
    totalAdjustments: pv1[48] ? parseInt(pv1[48], 10) : undefined,
    totalPayments: pv1[49] ? parseInt(pv1[49], 10) : undefined,
    alternateVisitId: parseExtendedCompositeIdWithCheckDigit(
      pv1[50],
      controlCharacters
    ),
    visitIndicator: hl7StringEscaper(pv1[51], controlCharacters),
    otherHealthcareProvider: pv1[52]
      ?.split(repetitionSeparator)
      .map((doctor) =>
        parseExtendedCompositeIdNumberAndName(doctor, controlCharacters)
      ),
  };
};
