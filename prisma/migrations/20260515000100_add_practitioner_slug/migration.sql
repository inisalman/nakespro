ALTER TABLE "PractitionerProfile" ADD COLUMN "slug" TEXT;

UPDATE "PractitionerProfile"
SET "slug" = lower(regexp_replace(regexp_replace(coalesce("User"."name", 'nakes'), '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g')) || '-' || left("PractitionerProfile"."id", 6)
FROM "User"
WHERE "PractitionerProfile"."userId" = "User"."id";

UPDATE "PractitionerProfile"
SET "slug" = 'nakes-' || left("id", 6)
WHERE "slug" IS NULL OR "slug" = '';

ALTER TABLE "PractitionerProfile" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "PractitionerProfile_slug_key" ON "PractitionerProfile"("slug");
