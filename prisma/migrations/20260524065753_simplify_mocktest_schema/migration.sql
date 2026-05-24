/*
  Warnings:

  - You are about to drop the column `category` on the `MockTest` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `MockTest` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `MockTest` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `MockTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MockTest" DROP COLUMN "category",
DROP COLUMN "description",
DROP COLUMN "difficulty",
DROP COLUMN "thumbnail";
