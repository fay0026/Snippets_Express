/*
  Warnings:

  - You are about to drop the column `userId` on the `Snippet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_userId_fkey";

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
