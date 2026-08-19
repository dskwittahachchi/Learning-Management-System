import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Lumina learning dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Lumina/);
  assert.match(html, /Keep your momentum, Danu/);
  assert.match(html, /AI STUDY COACH/);
  assert.match(html, /Product Design Foundations/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("includes the core LMS interaction surfaces", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Explore/);
  assert.match(html, /My learning/);
  assert.match(html, /Instructor studio/);
  assert.match(html, /Continue lesson/);
  assert.match(html, /Ask anything about your learning/);
  assert.match(html, /Calendar/);
});
