import { MSH, PV2 } from "../../../typings";
import {
  hl7StringEscaper,
  parseCodedElement,
  parseExtendedCompositeIdNumberAndName,
  parseExtendedCompositeNameAndIdForOrganizations,
  parsePersonLocation,
} from "../utils";

export const parsePV2 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): PV2 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const pv2 = segment.split(fieldSeparator);

  return {
    priorPendingLocation: parsePersonLocation(pv2[1], controlCharacters),
    accommodationCode: parseCodedElement(pv2[2], controlCharacters),
    admitReason: parseCodedElement(pv2[3], controlCharacters),
    transferReason: parseCodedElement(pv2[4], controlCharacters),
    patientValuables: pv2[5]
      ?.split(repetitionSeparator)
      .map((valuable) => hl7StringEscaper(valuable, controlCharacters)),
    patientValuablesLocation: hl7StringEscaper(pv2[6], controlCharacters),
    visitUserCode: hl7StringEscaper(pv2[7], controlCharacters),
    expectedAdmitDate: hl7StringEscaper(pv2[8], controlCharacters),
    expectedDischargeDate: hl7StringEscaper(pv2[9], controlCharacters),
    estimatedLengthOfInpatientStay: pv2[10] ? parseInt(pv2[10], 10) : undefined,
    actualLengthOfInpatientStay: pv2[11] ? parseInt(pv2[11], 10) : undefined,
    visitDescription: hl7StringEscaper(pv2[12], controlCharacters),
    referralSourceCode: parseExtendedCompositeIdNumberAndName(
      pv2[13],
      controlCharacters
    ),
    previousServiceDate: hl7StringEscaper(pv2[14], controlCharacters),
    employmentIllnessRelatedIndicator: hl7StringEscaper(
      pv2[15],
      controlCharacters
    ),
    purgeStatusCode: hl7StringEscaper(pv2[16], controlCharacters),
    purgeStatusDate: hl7StringEscaper(pv2[17], controlCharacters),
    specialProgramCode: hl7StringEscaper(pv2[18], controlCharacters),
    retentionIndicator: hl7StringEscaper(pv2[19], controlCharacters),
    expectedNumberOfInsurancePlans: pv2[20] ? parseInt(pv2[20], 10) : undefined,
    visitPublicityCode: hl7StringEscaper(pv2[21], controlCharacters),
    visitProtectionIndicator: hl7StringEscaper(pv2[22], controlCharacters),
    clinicOrganizationName: pv2[23]
      ?.split(repetitionSeparator)
      .map((org) =>
        parseExtendedCompositeNameAndIdForOrganizations(org, controlCharacters)
      ),
    patientStatusCode: hl7StringEscaper(pv2[24], controlCharacters),
    visitPriorityCode: hl7StringEscaper(pv2[25], controlCharacters),
    previousTreatmentDate: hl7StringEscaper(pv2[26], controlCharacters),
    expectedDischargeDisposition: hl7StringEscaper(pv2[27], controlCharacters),
    signatureOnFileDate: hl7StringEscaper(pv2[28], controlCharacters),
    firstSimilarIllnessDate: hl7StringEscaper(pv2[29], controlCharacters),
    patientChargeAdjustmentCode: hl7StringEscaper(pv2[30], controlCharacters),
    recurringServiceCode: hl7StringEscaper(pv2[31], controlCharacters),
    billingMediaCode: hl7StringEscaper(pv2[32], controlCharacters),
    expectedSurgeryDateTime: hl7StringEscaper(pv2[33], controlCharacters),
    militaryPartnershipCode: hl7StringEscaper(pv2[34], controlCharacters),
    militaryNonAvailabilityCode: hl7StringEscaper(pv2[35], controlCharacters),
    newbornBabyIndicator: hl7StringEscaper(pv2[36], controlCharacters),
    babyDetainedIndicator: hl7StringEscaper(pv2[37], controlCharacters),
  };

  throw new Error("Not implemented");
};
