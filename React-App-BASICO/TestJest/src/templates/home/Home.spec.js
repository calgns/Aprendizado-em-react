import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { Home } from "./index";

const handlers = [
  rest.get("*jsonplaceholder.typicode.com*", async (req, res, ctx) => {
    console.log("INTERCEPTED!");
    return res(
      ctx.json([
        // colocar a req de imagens e posts no mesmo lugar nem sempre funciona, mas, apenas nesse caso.
        {
          userId: 1,
          id: 1,
          title: "title 1",
          body: "body 1",
          url: "img1.jpg",
        },
        {
          userId: 2,
          id: 2,
          title: "title 2",
          body: "body 2",
          url: "img2.jpg",
        },
        {
          userId: 3,
          id: 3,
          title: "title 3",
          body: "body 3",
          url: "img3.jpg",
        },
      ])
    );
  }),

  // rest.get("https://jsonplaceholder.typicode.com/photos",async (req, res, ctx) => {console.log("INTERCEPTED!");return res(ctx.json([{url: "https://via.placeholder.com/600/92c952",},{url: "https://via.placeholder.com/600/92c952",},{url: "https://via.placeholder.com/600/92c952",},]));}),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.restoreHandlers());

  afterAll(() => {
    server.close();
  });

  it("should renders search, posts and load more", async () => {
    render(<Home />);
    const notFound = screen.getByText(/Search not found./i);
    await waitForElementToBeRemoved(notFound);

    // expect.assertions(3);

    const search = screen.getByPlaceholderText(/Type Your Search/i);
    // expect(search).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /title 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /title 2/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title 3" })
    ).not.toBeInTheDocument();

    userEvent.type(search, "title 1");
    expect(
      screen.getByRole("heading", { name: "title 1 1" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title 2 2" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title 3 3" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Search: title 1" })
    ).toBeInTheDocument();

    userEvent.clear(search);
    expect(
      screen.getByRole("heading", { name: "title 1 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "title 2 2" })
    ).toBeInTheDocument();

    userEvent.type(search, "post does not exist");
    expect(screen.getByText("Search not found.")).toBeInTheDocument();
  });

  it("should click on load more btn & load more posts", async () => {
    render(<Home />);
    const notFound = screen.getByText(/Search not found./i);
    await waitForElementToBeRemoved(notFound);

    const LMBtn = screen.getByRole("button", { name: /load more/i });

    expect(
      screen.queryByRole("heading", { name: "title 3 3" })
    ).not.toBeInTheDocument();

    userEvent.click(LMBtn);

    expect(
      screen.getByRole("heading", { name: "title 3 3" })
    ).toBeInTheDocument();

    screen.debug();
  });
});
