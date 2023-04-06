import { act, render, RenderResult } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import Radio from "./Radio";
import { RADIO_ELEM } from "./Radio.spec";
import RadioGroup from "./RadioGroup";

enum ELEM {
  fieldset = "RadioGroupFieldset",
  legend = "RadioGroupLegend",
}

const onChange = vi.fn();

const assertIsChecked = (result: RenderResult, selectedIndex: number) => {
  expect(result.getAllByTestId(RADIO_ELEM.input)[selectedIndex]).toBeChecked();
};

const assertAreUnchecked = (
  result: RenderResult,
  childrenLength: number,
  selectedIndex?: number
) => {
  for (let i = 0; i < childrenLength; i++) {
    if (i !== selectedIndex) {
      expect(result.getAllByTestId(RADIO_ELEM.input)[i]).not.toBeChecked();
    }
  }
};

describe.each`
  defaultCheckedIndex | legend                        | children
  ${undefined}        | ${undefined}                  | ${["1", "2"]}
  ${0}                | ${"Morning or night person?"} | ${["Morning", "Night"]}
  ${1}                | ${"Pineapple on pizza?"}      | ${["Yes", "No"]}
  ${2}                | ${"Favorite season"}          | ${["Spring", "Summer", "Fall", "Winter"]}
  ${3}                | ${"Favorite color"}           | ${["Red", "Orange", "Yellow", "Green", "Blue", "Purple"]}
`(
  "describe defaultCheckedIndex=$defaultCheckedIndex, legend=$legend, children=$children",
  ({ defaultCheckedIndex, legend, children }) => {
    let result: RenderResult;
    beforeEach(() => {
      onChange.mockClear();
      result = render(
        <RadioGroup groupName="sampleGroup" legend={legend} onChange={onChange}>
          {(children as string[]).map((child, idx) => (
            <Radio
              defaultChecked={
                defaultCheckedIndex !== undefined
                  ? defaultCheckedIndex === idx
                  : undefined
              }
              key={idx}
            >
              {child}
            </Radio>
          ))}
        </RadioGroup>
      );
    });

    test(`legend is ${legend ? "" : "NOT "}shown`, () => {
      const legendElem = result.queryByTestId(ELEM.legend);
      if (legend) {
        expect(legendElem).toBeVisible();
        expect(legendElem).toHaveTextContent(legend);
      } else {
        expect(legendElem).not.toBeInTheDocument();
      }
    });

    if (defaultCheckedIndex !== undefined) {
      test(`the '${children[defaultCheckedIndex]}' radio is checked`, () => {
        assertIsChecked(result, defaultCheckedIndex);
      });
    }

    test(`All radios${
      defaultCheckedIndex !== undefined
        ? `, except for the '${children[defaultCheckedIndex]}' radio,`
        : ""
    } are unchecked`, () => {
      assertAreUnchecked(result, children.length, defaultCheckedIndex);
    });

    const newIdx = defaultCheckedIndex ? 0 : 1;
    describe(`change selection to the '${children[newIdx]}' radio`, () => {
      beforeEach(() => {
        onChange.mockClear();
        act(() => result.getAllByTestId(RADIO_ELEM.input)[newIdx].click());
      });

      test(`onChange is called with '${children[newIdx]}'`, () => {
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({ value: children[newIdx] }),
          })
        );
      });

      test(`the '${children[newIdx]}' radio is checked`, () => {
        assertIsChecked(result, newIdx);
      });

      test(`All radios, except for the '${children[newIdx]}' radio, are unchecked`, () => {
        assertAreUnchecked(result, children.length, newIdx);
      });
    });
  }
);
