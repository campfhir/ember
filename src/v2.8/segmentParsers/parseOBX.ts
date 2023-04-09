import { MSH, OBX } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
  parseExtendedCompositeIdNumberAndNameFactory,
} from "../utils";

export const parseOBX = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): OBX => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const obx = segment.split(fieldSeparator);

  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseExtendedCompositeIdNumberAndName =
    parseExtendedCompositeIdNumberAndNameFactory(encodingCharacters);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);

  return hl7ElementMapper(
    obx,
    {
      setId: (field) => hl7StringEscaper(field) ?? "",
      valueType: (field) => hl7StringEscaper(field),
      observationIdentifier: (field) => parseCodedWithExceptions(field),
      observationSubId: (field) => hl7StringEscaper(field),
      observationValue: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((value) => hl7StringEscaper(value) ?? ""),
      units: (field) => parseCodedWithExceptions(field),
      referenceRange: (field) => hl7StringEscaper(field),
      abnormalFlags: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((flag) => hl7StringEscaper(flag) ?? ""),
      probability: (field) => (field ? parseInt(field, 10) : undefined),
      natureOfAbnormalTest: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((nature) => hl7StringEscaper(nature) ?? ""),
      observationResultStatus: (field) => hl7StringEscaper(field) ?? "",
      dateLastObservationNormalValue: (field) => hl7StringEscaper(field),
      userDefinedAccessChecks: (field) => hl7StringEscaper(field),
      dateTimeOfTheObservation: (field) => hl7StringEscaper(field),
      producersId: (field) => hl7StringEscaper(field),
      responsibleObserver: (field) =>
        parseExtendedCompositeIdNumberAndName(field),
      observationMethod: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((method) => parseCodedWithExceptions(method)),
    },
    { rootName: "OBX" }
  );
};
