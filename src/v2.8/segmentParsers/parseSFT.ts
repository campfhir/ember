import { MSH, SFT } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseExtendedCompositeNameAndIdForOrganizationsFactory,
} from "../utils";

export function parseSFT(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): SFT {
  const rootName = "SFT";
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const sft = segment.split(fieldSeparator);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseExtendedCompositeNameAndIdForOrganizations =
    parseExtendedCompositeNameAndIdForOrganizationsFactory(encodingCharacters);

  return hl7ElementMapper(
    sft,
    {
      vendorOrganization: (field, elementPath) =>
        parseExtendedCompositeNameAndIdForOrganizations(
          field,
          `${elementPath}`
        ),
      certifiedVersionOrReleaseNumber: (field) => hl7StringEscaper(field) ?? "",
      productName: (field) => hl7StringEscaper(field) ?? "",
      binaryId: (field) => hl7StringEscaper(field) ?? "",
      productInformation: (field) => hl7StringEscaper(field),
      installDate: (field) => hl7StringEscaper(field),
    },
    { rootName }
  );
}
