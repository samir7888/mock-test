-- CreateEnum
CREATE TYPE "MockTestCategory" AS ENUM ('TIMED', 'NON_TIMED');

-- AlterTable
ALTER TABLE "MockTest" ADD COLUMN     "category" "MockTestCategory" NOT NULL DEFAULT 'TIMED';
