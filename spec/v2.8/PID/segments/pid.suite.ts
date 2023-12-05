import "mocha";
import { expect, should } from "chai";
import fs from "node:fs";

import { parsePID } from "../../../../src/v2.8";
export function PID_SUITE_1() {
  describe("Given a PID Segment Should Parse Fields and Components", () => {
    it("Simple Example, assuming basic |^&~\\ encoding characters", () => {
      const raw = fs.readFileSync(
        `${process.cwd()}/spec/v2.8/hl7-fragments/pid.hl7`,
        {
          encoding: "ascii",
        }
      );
      const pid = parsePID(raw, { hasSegmentHeader: true });
      expect(pid.dateOfBirth).to.equal("19610615");
      expect(pid.sex).to.equal("M");
      expect(pid.patientName[0].familyName).to.equal("DOE");
      expect(pid.patientAddress?.[0].streetAddress).to.equal(
        "123 MAIN & CLARK STREET"
      );
    });
  });
}
