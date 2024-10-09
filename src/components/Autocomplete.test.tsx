import { render, screen, fireEvent } from "@testing-library/react";
import { AutoComplete } from "./Autocomplete";
import "@testing-library/jest-dom/extend-expect";

describe("AutoComplete Component", () => {
  const items = [
    { value: "1", label: "Item 1" },
    { value: "2", label: "Item 2" },
    { value: "3", label: "Item 3" },
  ];

  it("should render the input field", () => {
    render(
      <AutoComplete
        selectedValue=""
        onSelectedValueChange={() => {}}
        searchValue=""
        onSearchValueChange={() => {}}
        items={items}
      />
    );
    const inputElement = screen.getByPlaceholderText("Search...");
    expect(inputElement).toBeInTheDocument();
  });

  it("should display items when input is focused", () => {
    render(
      <AutoComplete
        selectedValue=""
        onSelectedValueChange={() => {}}
        searchValue=""
        onSearchValueChange={() => {}}
        items={items}
      />
    );
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.focus(inputElement);
    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("should call onSelectedValueChange when an item is selected", () => {
    const onSelectedValueChange = jest.fn();
    render(
      <AutoComplete
        selectedValue=""
        onSelectedValueChange={onSelectedValueChange}
        searchValue=""
        onSearchValueChange={() => {}}
        items={items}
      />
    );
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.focus(inputElement);
    fireEvent.click(screen.getByText(items[0].label));
    expect(onSelectedValueChange).toHaveBeenCalledWith(items[0].value);
  });

  it("should reset the input when an item is selected", () => {
    const onSearchValueChange = jest.fn();
    render(
      <AutoComplete
        selectedValue=""
        onSelectedValueChange={() => {}}
        searchValue="Item"
        onSearchValueChange={onSearchValueChange}
        items={items}
      />
    );
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.focus(inputElement);
    fireEvent.click(screen.getByText(items[0].label));
    expect(onSearchValueChange).toHaveBeenCalledWith(items[0].label);
  });

  it("should display empty message when no items are found", () => {
    render(
      <AutoComplete
        selectedValue=""
        onSelectedValueChange={() => {}}
        searchValue=""
        onSearchValueChange={() => {}}
        items={[]}
        emptyMessage="No items found."
      />
    );
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.focus(inputElement);
    expect(screen.getByText("No items found.")).toBeInTheDocument();
  });
});
