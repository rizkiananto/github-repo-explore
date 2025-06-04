import { describe, it, expect } from "vitest";
import { render, fireEvent } from "../../../test/test-utils";
import InputText from "../inputUsername";
import { getClearButton, getSearchInput } from "../../../test/test-helpers";
import { TEST_DATA } from "../../../constants";

describe("Input Text (username) Component", () => {
  it("renders input field with correct placeholder", () => {
    render(<InputText/>);

    const input = getSearchInput();
    expect(input).toBeInTheDocument();
  });
  
  it("updates input value when user types", () => {
    render(<InputText/>);

    const input = getSearchInput() as HTMLInputElement;
    fireEvent.change(input, {target: {value: TEST_DATA.USERNAME}});
    expect(input.value).toBe(TEST_DATA.USERNAME)
  })

  it("shows clear button when input has value", () => {
    render(<InputText/>);

    const input = getSearchInput();
    fireEvent.change(input, {target: {value: TEST_DATA.USERNAME}});

    const clearButton = getClearButton();
    expect(clearButton).toBeVisible();
  })

  it("hides clear button when input empty", () => {
    render(<InputText/>);

    const clearButton = getClearButton();
    expect(clearButton).not.toBeVisible();
  })

  it("clears input when clear button is clicked", () => {
    render(<InputText/>);

    const input = getSearchInput() as HTMLInputElement;
    fireEvent.change(input, {target: {value: TEST_DATA.USERNAME}});

    const clearButton = getClearButton();
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
  })
})