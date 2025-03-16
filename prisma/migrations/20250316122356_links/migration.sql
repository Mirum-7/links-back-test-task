-- CreateTable
CREATE TABLE "Links" (
    "id" BIGSERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "alias" VARCHAR(20) NOT NULL,
    "expiresAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clicks" (
    "id" BIGSERIAL NOT NULL,
    "linkId" BIGINT NOT NULL,
    "ip" INET,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_alias_key" ON "Links"("alias");

-- CreateIndex
CREATE INDEX "Links_alias_idx" ON "Links"("alias");

-- CreateIndex
CREATE INDEX "Clicks_linkId_createdAt_idx" ON "Clicks"("linkId", "createdAt");

-- AddForeignKey
ALTER TABLE "Clicks" ADD CONSTRAINT "Clicks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
