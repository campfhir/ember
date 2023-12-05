import { MSH, OBX } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
  parseExtendedCompositeIdNumberAndNameForPersonFactory,
} from "../utils";

export function parseOBX(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): OBX {
  const rootName = "OBX";
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const obx = segment.split(fieldSeparator);

  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseExtendedCompositeIdNumberAndName =
    parseExtendedCompositeIdNumberAndNameForPersonFactory(encodingCharacters);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);

  return hl7ElementMapper(
    obx,
    {
      setId: (field) => hl7StringEscaper(field) ?? "",
      valueType: (field) => hl7StringEscaper(field),
      observationIdentifier: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
      observationSubId: (field) => hl7StringEscaper(field),
      observationValue: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((value) => hl7StringEscaper(value) ?? ""),
      units: (field, elementPath) =>
        parseCodedWithExceptions(field, `${elementPath}`),
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
      responsibleObserver: (field, elementPath) =>
        parseExtendedCompositeIdNumberAndName(field, `${elementPath}`),
      observationMethod: (field, elementPath) =>
        field
          ?.split(repetitionSeparator)
          .map((method, repetitionInd) =>
            parseCodedWithExceptions(method, `${elementPath}[${repetitionInd}]`)
          ),
    },
    { rootName }
  );
}
