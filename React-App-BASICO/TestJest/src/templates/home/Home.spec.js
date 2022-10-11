import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

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

    expect.assertions(3);

    await waitForElementToBeRemoved(notFound);
    const search = screen.getByPlaceholderText(/Type Your Search/i);
    expect(search).toBeInTheDocument();

    const imgs = screen.getAllByRole("img", { name: /title/i });
    expect(imgs).toHaveLength(3);

    const btn = screen.getByRole("button", { name: /load more/i });
    expect(btn).toBeInTheDocument();

    screen.debug();
    // expect(notFound).toBeInTheDocument();
  }, 10000);
});
