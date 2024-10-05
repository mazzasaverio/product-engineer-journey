-- CreateTable
CREATE TABLE "air_quality_data" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "concentrationValue" DOUBLE PRECISION NOT NULL,
    "concentrationUnits" TEXT NOT NULL,
    "centroidLat" DOUBLE PRECISION NOT NULL,
    "centroidLng" DOUBLE PRECISION NOT NULL,
    "postId" TEXT NOT NULL,
    "zoneOMI" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "air_quality_data_pkey" PRIMARY KEY ("id")
);
