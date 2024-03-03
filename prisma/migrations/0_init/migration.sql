-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "resource_type" VARCHAR(20),
    "tag" VARCHAR(20),
    "shows" INTEGER,
    "likes" INTEGER,
    "dislikes" INTEGER,
    "is_visible" BOOLEAN,
    "raw_tags" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "ratings_pk" PRIMARY KEY ("id")
);

