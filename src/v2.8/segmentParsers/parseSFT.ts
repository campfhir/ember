import { MSH, SFT } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
  parseDriversLicenseNumberFactory,
  parseExtendedAddressFactory,
  parseExtendedCompositeIdWithCheckDigitFactory,
  parseExtendPersonNameFactory,
  parseExtendedTelecommunicationNumberFactory,
  parseHierarchicDesignatorFactory,
  parseDischargeToLocationFactory,
  parseFinancialFactory,
  parseJobCodeClassFactory,
  parsePersonLocationFactory,
  parseExtendedCompositeNameAndIdForOrganizationsFactory,
} from "../utils";

const rootName = "SFT";

export const parseSFT = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): SFT => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const sft = segment.split(fieldSeparator);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseExtendedCompositeIdWithCheckDigit =
    parseExtendedCompositeIdWithCheckDigitFactory(encodingCharacters);
  const parseExtendedAddress = parseExtendedAddressFactory(encodingCharacters);
  const parseDriversLicenseNumber =
    parseDriversLicenseNumberFactory(encodingCharacters);
  const parseHierarchicDesignator =
    parseHierarchicDesignatorFactory(encodingCharacters);
  const parseExtendPersonName =
    parseExtendPersonNameFactory(encodingCharacters);
  const parseExtendedTelecommunicationNumber =
    parseExtendedTelecommunicationNumberFactory(encodingCharacters);
  const parseDischargeToLocation =
    parseDischargeToLocationFactory(encodingCharacters);
  const parseFinancial = parseFinancialFactory(encodingCharacters);
  const parseJobCodeClass = parseJobCodeClassFactory(encodingCharacters);
  const parsePersonLocation = parsePersonLocationFactory(encodingCharacters);
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
    },
    { rootName: rootName }
  );
};
