-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "info" TEXT,
    "photo" TEXT,
    "spotify" TEXT,
    "youtube" TEXT,
    "applemusic" TEXT,
    "insta" TEXT,
    "fb" TEXT,
    "twitter" TEXT
);

-- CreateTable
CREATE TABLE "Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artistId" INTEGER NOT NULL,
    "song" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "songImg" TEXT,
    "songduration" TEXT,
    "genre" TEXT,
    "songtagline" TEXT,
    CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
