import { LoadMoreBtn } from ".";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<LoadMoreBtn />", () => {
  it('should render the button with the text "LOAD MORE"', () => {
    const fn = jest.fn();
    render(<LoadMoreBtn text="LoAd mOrE" onClicky={fn} />);
    expect.assertions(1); // numero de resultados

    // .query = não levanta error, se, não encontrar o elemento
    // .get = geralmente usado já que se sabe que vai ter elemento
    const btn = screen.getByRole("button", { name: /load more/i });
    expect(btn).toBeInTheDocument();
    // expect(btn).toHaveAttribute("class", 'btn');
  });

  it("should call function on button click", () => {
    const fn = jest.fn();
    render(<LoadMoreBtn text="LoAd mOrE" onClicky={fn} />);

    const btn = screen.getByRole("button", { name: /load more/i });
    fireEvent.click(btn); // menos natural
    userEvent.click(btn); // mais natural
    // expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should be disabled when disabled is true", () => {
    const fn = jest.fn();
    render(<LoadMoreBtn text="LoAd mOrE" isDisabled={true} onClicky={fn} />);

    const btn = screen.getByRole("button", { name: /load more/i });
    expect(btn).toBeDisabled();
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(
      <LoadMoreBtn text="LoAd mOrE" isDisabled={true} onClicky={fn} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
