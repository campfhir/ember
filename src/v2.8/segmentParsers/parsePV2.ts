import { MSH, PV2 } from "../../../typings";
import {
  parsePersonLocationFactory,
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedElementFactory,
  parseExtendedCompositeIdNumberAndNameFactory,
  parseExtendedCompositeNameAndIdForOrganizationsFactory,
} from "../utils";

export const parsePV2 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): PV2 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const pv2 = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseCodedElement = parseCodedElementFactory(encodingCharacters);
  const parseExtendedCompositeIdNumberAndName =
    parseExtendedCompositeIdNumberAndNameFactory(encodingCharacters);
  const parsePersonLocation = parsePersonLocationFactory(encodingCharacters);
  const parseExtendedCompositeNameAndIdForOrganizations =
    parseExtendedCompositeNameAndIdForOrganizationsFactory(encodingCharacters);

  return hl7ElementMapper(
    pv2,
    {
      priorPendingLocation: (field) => parsePersonLocation(field),
      accommodationCode: (field) => parseCodedElement(field),
      admitReason: (field) => parseCodedElement(field),
      transferReason: (field) => parseCodedElement(field),
      patientValuables: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((valuable) => hl7StringEscaper(valuable) ?? ""),
      patientValuablesLocation: (field) => hl7StringEscaper(field),
      visitUserCode: (field) => hl7StringEscaper(field),
      expectedAdmitDate: (field) => hl7StringEscaper(field),
      expectedDischargeDate: (field) => hl7StringEscaper(field),
      estimatedLengthOfInpatientStay: (field) =>
        field ? parseInt(field, 10) : undefined,
      actualLengthOfInpatientStay: (field) =>
        field ? parseInt(field, 10) : undefined,
      visitDescription: (field) => hl7StringEscaper(field),
      referralSourceCode: (field) =>
        parseExtendedCompositeIdNumberAndName(field),
      previousServiceDate: (field) => hl7StringEscaper(field),
      employmentIllnessRelatedIndicator: (field) => hl7StringEscaper(field),
      purgeStatusCode: (field) => hl7StringEscaper(field),
      purgeStatusDate: (field) => hl7StringEscaper(field),
      specialProgramCode: (field) => hl7StringEscaper(field),
      retentionIndicator: (field) => hl7StringEscaper(field),
      expectedNumberOfInsurancePlans: (field) =>
        field ? parseInt(field, 10) : undefined,
      visitPublicityCode: (field) => hl7StringEscaper(field),
      visitProtectionIndicator: (field) => hl7StringEscaper(field),
      clinicOrganizationName: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((org) => parseExtendedCompositeNameAndIdForOrganizations(org)),
      patientStatusCode: (field) => hl7StringEscaper(field),
      visitPriorityCode: (field) => hl7StringEscaper(field),
      previousTreatmentDate: (field) => hl7StringEscaper(field),
      expectedDischargeDisposition: (field) => hl7StringEscaper(field),
      signatureOnFileDate: (field) => hl7StringEscaper(field),
      firstSimilarIllnessDate: (field) => hl7StringEscaper(field),
      patientChargeAdjustmentCode: (field) => hl7StringEscaper(field),
      recurringServiceCode: (field) => hl7StringEscaper(field),
      billingMediaCode: (field) => hl7StringEscaper(field),
      expectedSurgeryDateTime: (field) => hl7StringEscaper(field),
      militaryPartnershipCode: (field) => hl7StringEscaper(field),
      militaryNonAvailabilityCode: (field) => hl7StringEscaper(field),
      newbornBabyIndicator: (field) => hl7StringEscaper(field),
      babyDetainedIndicator: (field) => hl7StringEscaper(field),
    },
    { rootName: "PV2" }
  );
};