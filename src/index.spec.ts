import { app, server } from "./index";

describe("GET /numbers/:startNumber/:endNumber", () => {
  afterAll((done) => {
    server.close(done);
  });

  it("should return a range of numbers", async () => {
    const req = new Request("http://localhost/numbers/1/5", {
      method: "GET",
    });
    const res = await app.fetch(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return an error if startNumber or endNumber is missing", async () => {
    const req = new Request("http://localhost/numbers/a/b", { method: "GET" });
    const res = await app.fetch(req);

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: "startNumber or endNumber is missing" });
  });

  it("should return an error if endNumber is less than or equal to startNumber", async () => {
    const req = new Request("http://localhost/numbers/5/5", { method: "GET" });
    const res = await app.fetch(req);

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({
      error: "endNumber must be greater than startNumber",
    });
  });

  it("should return an error if the range exceeds 10,000", async () => {
    const req = new Request("http://localhost/numbers/1/10002", {
      method: "GET",
    });
    const res = await app.fetch(req);

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: "Range cannot exceed 10,000" });
  });
});
