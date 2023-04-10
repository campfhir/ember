import { MSH, PV1 } from "../../../typings";
import {
  parsePersonLocationFactory,
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
  parseExtendedCompositeIdNumberAndNameFactory,
  parseExtendedCompositeIdWithCheckDigitFactory,
  parseFinancialFactory,
  parseDischargeToLocationFactory,
} from "../utils";

export const parsePV1 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): PV1 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const pv1 = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseExtendedCompositeIdNumberAndName =
    parseExtendedCompositeIdNumberAndNameFactory(encodingCharacters);
  const parseExtendedCompositeIdWithCheckDigit =
    parseExtendedCompositeIdWithCheckDigitFactory(encodingCharacters);
  const parsePersonLocation = parsePersonLocationFactory(encodingCharacters);
  const parseFinancial = parseFinancialFactory(encodingCharacters);
  const parseDischargeToLocation =
    parseDischargeToLocationFactory(encodingCharacters);

  return hl7ElementMapper(
    pv1,
    {
      setId: (field) => (field ? parseInt(field, 10) : undefined),
      patientClass: (field) => hl7StringEscaper(field) ?? "",
      assignedPatientLocation: (field) => parsePersonLocation(field),
      admissionType: (field) => hl7StringEscaper(field),
      preadmitNumber: (field) => parseCodedWithExceptions(field),
      priorPatientLocation: (field) => parsePersonLocation(field),
      attendingDoctor: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor) => parseExtendedCompositeIdNumberAndName(doctor)),
      referringDoctor: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor) => parseExtendedCompositeIdNumberAndName(doctor)),
      consultingDoctor: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor) => parseExtendedCompositeIdNumberAndName(doctor)),
      hospitalService: (field) => hl7StringEscaper(field),
      temporaryLocation: (field) => parsePersonLocation(field),
      preadmitTestIndicator: (field) => hl7StringEscaper(field),
      readmissionIndicator: (field) => hl7StringEscaper(field),
      admitSource: (field) => hl7StringEscaper(field),
      ambulatoryStatus: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((status) => hl7StringEscaper(status) ?? ""),
      vipIndicator: (field) => hl7StringEscaper(field),
      admittingDoctor: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor) => parseExtendedCompositeIdNumberAndName(doctor)),
      patientType: (field) => hl7StringEscaper(field),
      visitNumber: (field) => parseExtendedCompositeIdWithCheckDigit(field),
      financial: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((financial) => parseFinancial(financial) ?? ""),
      chargePriceIndicator: (field) => hl7StringEscaper(field),
      courtesyCode: (field) => hl7StringEscaper(field),
      creditRating: (field) => hl7StringEscaper(field),
      contractCode: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((code) => hl7StringEscaper(code) ?? ""),
      contractEffectiveDate: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((code) => hl7StringEscaper(code) ?? ""),
      contractAmount: (field) =>
        field
          ?.split(repetitionSeparator)
          .filter((number) => !isNaN(parseInt(number, 10)))
          .map((number) => parseInt(number)),
      contractPeriod: (field) =>
        field
          ?.split(repetitionSeparator)
          .filter((number) => !isNaN(parseInt(number, 10)))
          .map((number) => parseInt(number)),
      interestCode: (field) => hl7StringEscaper(field),
      transferToBadDebtCode: (field) => hl7StringEscaper(field),
      transferToBadDebtDate: (field) => hl7StringEscaper(field),
      badDebtAgencyCode: (field) => hl7StringEscaper(field),
      badDebtTransferAmount: (field) =>
        field ? parseInt(field, 10) : undefined,
      badDebRecoveryAmount: (field) =>
        field ? parseInt(field, 10) : undefined,
      deleteAccountIndicator: (field) => hl7StringEscaper(field),
      deleteAccountDate: (field) => hl7StringEscaper(field),
      dischargeDisposition: (field) => hl7StringEscaper(field),
      dischargedTo: (field) => parseDischargeToLocation(field),
      dietType: (field) => hl7StringEscaper(field),
      servicingFacility: (field) => hl7StringEscaper(field),
      bedStatus: (field) => hl7StringEscaper(field),
      accountStatus: (field) => hl7StringEscaper(field),
      pendingLocation: (field) => parsePersonLocation(field),
      priorTemporaryLocation: (field) => parsePersonLocation(field),
      admitDateTime: (field) => hl7StringEscaper(field),
      dischargeDateTime: (field) => hl7StringEscaper(field),
      currentPatientBalance: (field) =>
        field ? parseInt(field, 10) : undefined,
      totalCharges: (field) => (field ? parseInt(field, 10) : undefined),
      totalAdjustments: (field) => (field ? parseInt(field, 10) : undefined),
      totalPayments: (field) => (field ? parseInt(field, 10) : undefined),
      alternateVisitId: (field) =>
        parseExtendedCompositeIdWithCheckDigit(field),
      visitIndicator: (field) => hl7StringEscaper(field),
      otherHealthcareProvider: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor) => parseExtendedCompositeIdNumberAndName(doctor)),
      serviceEpisodeDescription: (field) => hl7StringEscaper(field),
      serviceEpisodeIdentifier: (field) =>
        parseExtendedCompositeIdWithCheckDigit(field),
    },
    { rootName: "PV1" }
  );
};
