import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe("<PostCard />", () => {
  it("should render PostCard correctly", () => {
    // const {debug} = render(<PostCard {...mock} />);
    render(<PostCard {...props} />);

    expect(screen.getByAltText(/title 1/i)).toHaveAttribute(
      "src",
      "https://placeimg.com/640/480/any"
    );
    expect(screen.getByRole("img", { name: props.title })).toBeInTheDocument(); // name: 'title 1' | name: /title/i
    expect(
      screen.getByRole("heading", { name: /title 1/i })
    ).toBeInTheDocument();
    expect(screen.getByText("body 1")).toBeInTheDocument();
    // debug();
  });

  it("Should match snapshot", () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
