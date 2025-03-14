-- AlterTable
ALTER TABLE "Links" ALTER COLUMN "expiresAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Clicks" (
    "id" BIGSERIAL NOT NULL,
    "linkId" BIGINT NOT NULL,
    "ip" INET,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Clicks_linkId_createdAt_idx" ON "Clicks"("linkId", "createdAt");

-- AddForeignKey
ALTER TABLE "Clicks" ADD CONSTRAINT "Clicks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
