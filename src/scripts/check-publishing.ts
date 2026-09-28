import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

async function main() {
  console.log("Connecting to Payload...");
  await import("payload");
  await import("../../payload.config");
  const { getPayloadClient } = await import("../lib/payload/client");
  console.log("Payload module loaded.");
  const { getPostBySlug, getPosts, getProjectBySlug } = await import("../lib/payload/queries");
  process.env.PAYLOAD_SEEDING = "true";
  const payload = await getPayloadClient();
  console.log("Checking publishing workflow...");
  const slug = `publishing-check-${Date.now()}`;
  let id: number | undefined;
  let projectId: number | undefined;
  let mediaId: number | undefined;
  let editorId: number | undefined;

  try {
    const draft = await payload.create({
      collection: "posts",
      draft: true,
      data: {
        title: "Publishing check",
        slug,
        excerpt: "Temporary publishing check",
        category: "Engineering",
        body: "Draft body",
        _status: "draft",
      },
    });
    id = draft.id;
    assert.equal(await getPostBySlug(slug), null);
    assert.equal((await getPosts()).some((post) => post.slug === slug), false);

    await payload.update({ collection: "posts", id, data: { _status: "published" } });
    assert.equal((await getPostBySlug(slug))?.content[0], "Draft body");
    assert.equal((await getPosts()).some((post) => post.slug === slug), true);

    await payload.update({ collection: "posts", id, data: { body: "Edited body" } });
    assert.equal((await getPostBySlug(slug))?.content[0], "Edited body");

    await payload.update({ collection: "posts", id, data: { _status: "draft" } });
    assert.equal(await getPostBySlug(slug), null);

    const image = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII=", "base64");
    const media = await payload.create({
      collection: "media",
      data: { alt: "Temporary publishing check" },
      file: { data: image, mimetype: "image/png", name: `${slug}.png`, size: image.length },
    });
    mediaId = media.id;

    const project = await payload.create({
      collection: "projects",
      draft: true,
      data: {
        title: "Publishing check",
        slug,
        number: "99",
        client: "Test",
        year: "2026",
        category: "Digital Product",
        tagline: "Temporary check",
        summary: "Temporary publishing check",
        heroImage: media.id,
        thumbnailImage: media.id,
        _status: "draft",
      },
    });
    projectId = project.id;
    assert.equal(await getProjectBySlug(slug), null);
    await payload.update({ collection: "projects", id: projectId, data: { _status: "published" } });
    assert.equal((await getProjectBySlug(slug))?.title, "Publishing check");
    await payload.update({ collection: "projects", id: projectId, data: { title: "Edited project" } });
    assert.equal((await getProjectBySlug(slug))?.title, "Edited project");
    await payload.update({ collection: "projects", id: projectId, data: { _status: "draft" } });
    assert.equal(await getProjectBySlug(slug), null);

    const editor = await payload.create({
      collection: "users",
      data: {
        email: `${slug}@example.invalid`,
        password: randomUUID(),
        name: "Temporary editor",
        role: "editor",
      },
    });
    editorId = editor.id;
    await payload.update({
      collection: "users",
      id: editorId,
      user: editor,
      overrideAccess: false,
      data: { role: "admin" },
    });
    assert.equal((await payload.findByID({ collection: "users", id: editorId })).role, "editor");
    console.log("Post/project publishing and editor role checks passed.");
  } finally {
    if (editorId !== undefined) await payload.delete({ collection: "users", id: editorId });
    if (projectId !== undefined) await payload.delete({ collection: "projects", id: projectId });
    if (mediaId !== undefined) await payload.delete({ collection: "media", id: mediaId });
    if (id !== undefined) await payload.delete({ collection: "posts", id });
    await payload.destroy();
  }
}

await main();
