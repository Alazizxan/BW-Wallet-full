/*
  Warnings:

  - Added the required column `status` to the `Countdown` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Countdown" ADD COLUMN     "status" BOOLEAN NOT NULL;
