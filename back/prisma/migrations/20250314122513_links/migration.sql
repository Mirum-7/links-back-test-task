-- CreateTable
CREATE TABLE "Links" (
    "id" BIGSERIAL NOT NULL,
    "alias" VARCHAR(20) NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_alias_key" ON "Links"("alias");

-- CreateIndex
CREATE INDEX "Links_alias_idx" ON "Links"("alias");
