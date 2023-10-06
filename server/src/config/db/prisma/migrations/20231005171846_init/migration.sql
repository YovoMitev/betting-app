-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "odds" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
