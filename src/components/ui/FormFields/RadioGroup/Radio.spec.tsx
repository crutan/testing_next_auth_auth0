import { render, RenderResult } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { RadioContext } from "./context";
import Radio from "./Radio";

export enum RADIO_ELEM {
  container = "RadioContainer",
  input = "RadioInput",
  button = "RadioButton",
}

const onChange = vi.fn();

describe.each`
  value         | checked      | groupName
  ${"Option A"} | ${undefined} | ${"g1"}
  ${"Option B"} | ${true}      | ${"g2"}
  ${"Option C"} | ${false}     | ${"g3"}
`(
  "describe value=$value, checked=$checked, groupName=$groupName",
  ({ value, checked, groupName }) => {
    let result: RenderResult;
    beforeEach(() => {
      onChange.mockClear();
      result = render(
        <RadioContext.Provider
          value={{
            groupName,
          }}
        >
          <Radio checked={checked} onChange={onChange}>
            {value}
          </Radio>
        </RadioContext.Provider>
      );
    });

    test(`input.name === '${groupName}'`, () => {
      expect(result.getByTestId(RADIO_ELEM.input)).toHaveAttribute(
        "name",
        groupName
      );
    });

    test(`input.value === '${value}'`, () => {
      expect(result.getByTestId(RADIO_ELEM.input)).toHaveAttribute(
        "value",
        value
      );
    });

    test(`input is ${checked ? "" : "NOT "}checked`, () => {
      checked
        ? expect(result.getByTestId(RADIO_ELEM.input)).toBeChecked()
        : expect(result.getByTestId(RADIO_ELEM.input)).not.toBeChecked();
    });

    test(`onChange is ${
      checked ? "NOT " : ""
    }called after clicking the radio`, () => {
      result.getByTestId(RADIO_ELEM.container).click();
      expect(onChange).toHaveBeenCalledTimes(checked ? 0 : 1);
    });
  }
);

describe.each`
  groupDisabled | disabled
  ${false}      | ${false}
  ${false}      | ${true}
  ${true}       | ${false}
  ${true}       | ${true}
`(
  "describe groupDisabled=$groupDisabled, disabled=$disabled",
  ({ groupDisabled, disabled }) => {
    test(`input is${groupDisabled || disabled ? "" : " NOT"} disabled`, () => {
      const result = render(
        <RadioContext.Provider
          value={{
            groupName: "sampleGroup",
            disabled: groupDisabled,
          }}
        >
          <Radio disabled={disabled} onChange={onChange}>
            Some Option
          </Radio>
        </RadioContext.Provider>
      );

      groupDisabled || disabled
        ? expect(result.getByTestId(RADIO_ELEM.input)).toBeDisabled()
        : expect(result.getByTestId(RADIO_ELEM.input)).not.toBeDisabled();
    });
  }
);
