import { MSH, PV1 } from "../../../typings";
import {
  parsePersonLocationFactory,
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
  parseExtendedCompositeIdNumberAndNameForPersonFactory,
  parseExtendedCompositeIdWithCheckDigitFactory,
  parseFinancialFactory,
  parseDischargeToLocationFactory,
} from "../utils";

export function parsePV1(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): PV1 {
  const rootName = "PV1";
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const pv1 = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseExtendedCompositeIdNumberAndNameForPerson =
    parseExtendedCompositeIdNumberAndNameForPersonFactory(encodingCharacters);
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
      assignedPatientLocation: (field, elementPath) =>
        parsePersonLocation(field, `${elementPath}`),
      admissionType: (field) => hl7StringEscaper(field),
      preadmitNumber: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      priorPatientLocation: (field, elementPath) =>
        parsePersonLocation(field, `${elementPath}`),
      attendingDoctor: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor, repetitionInd) =>
            parseExtendedCompositeIdNumberAndNameForPerson(
              doctor,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      referringDoctor: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor, repetitionInd) =>
            parseExtendedCompositeIdNumberAndNameForPerson(
              doctor,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      consultingDoctor: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor, repetitionInd) =>
            parseExtendedCompositeIdNumberAndNameForPerson(
              doctor,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      hospitalService: (field) => hl7StringEscaper(field),
      temporaryLocation: (field, elementPath) =>
        parsePersonLocation(field, `${elementPath}`),
      preadmitTestIndicator: (field) => hl7StringEscaper(field),
      readmissionIndicator: (field) => hl7StringEscaper(field),
      admitSource: (field) => hl7StringEscaper(field),
      ambulatoryStatus: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((status) => hl7StringEscaper(status) ?? ""),
      vipIndicator: (field) => hl7StringEscaper(field),
      admittingDoctor: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor, repetitionInd) =>
            parseExtendedCompositeIdNumberAndNameForPerson(
              doctor,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      patientType: (field) => hl7StringEscaper(field),
      visitNumber: (field, elementPath) =>
        parseExtendedCompositeIdWithCheckDigit(field, `${elementPath}`),
      financial: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map(
            (financial, repetitionInd) =>
              parseFinancial(financial, `${elementPath}[${repetitionInd}]`) ??
              ""
          ),
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
      dischargedTo: (field, elementPath) =>
        parseDischargeToLocation(field, `${elementPath}`),
      dietType: (field) => hl7StringEscaper(field),
      servicingFacility: (field) => hl7StringEscaper(field),
      bedStatus: (field) => hl7StringEscaper(field),
      accountStatus: (field) => hl7StringEscaper(field),
      pendingLocation: (field, elementPath) =>
        parsePersonLocation(field, `${elementPath}`),
      priorTemporaryLocation: (field, elementPath) =>
        parsePersonLocation(field, `${elementPath}`),
      admitDateTime: (field) => hl7StringEscaper(field),
      dischargeDateTime: (field) => hl7StringEscaper(field),
      currentPatientBalance: (field) =>
        field ? parseInt(field, 10) : undefined,
      totalCharges: (field) => (field ? parseInt(field, 10) : undefined),
      totalAdjustments: (field) => (field ? parseInt(field, 10) : undefined),
      totalPayments: (field) => (field ? parseInt(field, 10) : undefined),
      alternateVisitId: (field, elementPath) =>
        parseExtendedCompositeIdWithCheckDigit(field, `${elementPath}`),
      visitIndicator: (field) => hl7StringEscaper(field),
      otherHealthcareProvider: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((doctor, repetitionInd) =>
            parseExtendedCompositeIdNumberAndNameForPerson(
              doctor,
              `${elementPath}[${repetitionInd}]`
            )
          ),
      serviceEpisodeDescription: (field) => hl7StringEscaper(field),
      serviceEpisodeIdentifier: (field, elementPath) =>
        parseExtendedCompositeIdWithCheckDigit(field, `${elementPath}`),
    },
    { rootName }
  );
}
