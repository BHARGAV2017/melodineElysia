import { PrismaClient } from '@prisma/client'
import { Elysia, t} from 'elysia'
import { swagger } from '@elysiajs/swagger'

const prisma = new PrismaClient();


// Create a new artist
const app = new Elysia()
    .use(swagger())
    .post("/artists", async(req)=>{
        const {name, info, photo, songs, spotify, youtube, applemusic, insta, fb, twitter }: any = req.body;
        const newArtist = await prisma.artist.create({
            data:{
                name,
                info,
                photo,
                songs, //you can use songs:{create:[song:"song_name"]}
                spotify,
                youtube,
                applemusic,
                insta,
                fb,
                twitter

            },
        })
        return newArtist
    })
    .get("/artists", async (req)=>{
        const allArtists = await prisma.artist.findMany()
        return allArtists
    })
    .get("/artists/:id", async (req)=>{
        const artist = await prisma.artist.findUnique({
            where:{id:parseInt(req.params.id)}
        })
        return artist
    })
    .put("/artists/:id", async (req)=>{
        const {id} = req.params;
        const {name, info, photo, songs, spotify, youtube, applemusic, insta, fb, twitter }: any = req.body;
        const updatedArtist = await prisma.artist.update({
            where:{id:parseInt(req.params.id)},
            data: {name, info, photo, songs, spotify, youtube, applemusic, insta, fb, twitter}
          })
        return updatedArtist
    })
    .delete("/artists/:id", async (req) =>{
        const deletedArtist = await prisma.artist.delete({
            where: { id: parseInt(req.params.id) },
          });
        return deletedArtist
    })
    .post("/songs/:id", async(req)=>{
        const {song, songImg, songduration, genre, songtagline}: any= req.body;
        const {id} = req.params;
        const Inputsongs = await prisma.song.create({
            data: {
              song: song, // Song name 
              dateTime: new Date(),
              artist: {
                connect: { id: parseInt(id) }, // replace with the actual artist ID
              },
              songImg: songImg,
              songduration: songduration,
              genre: genre,
              songtagline: songtagline
            },
          })
        return Inputsongs
    })
    .get("/songs", async(req)=>{
        const allSongs = await prisma.song.findMany()
        return allSongs
    })
    .get("/songs/:id", async(req)=>{
        const {id} = req.params;
        const songs = await prisma.song.findMany({
            where: {
                artistId:parseInt(id) , // replace with your song id
            },
          });
        return songs
    })
    .put("/songs/:id", async(req)=>{
        const {id} = req.params;
        // const {song}:any = req.body;
        const {artistId, song, songImg, songduration, genre, songtagline}: any= req.body;

        const updatedSong = await prisma.song.update({
            where: { id: parseInt(id) }, // replace with the actual song ID
            data: { 
                artistId: artistId,
                song: song,
                songImg: songImg,
                songduration:songduration,
                genre:genre,
                songtagline:songtagline
            },
            })
        return updatedSong
    })
    .delete("/songs/:id", async(req)=>{
        const {id} = req.params;
        const deletedSong = await prisma.song.delete({
            where: { id: parseInt(id) }, // replace with the actual song ID
          })
        return deletedSong

    })
    .get("/artist/:id", async (req)=>{
        const artist = await prisma.artist.findUnique({
            where:{id:parseInt(req.params.id)}
        })
        return artist
    })
    .get("/topchart", async (req)=>{
        const result = await prisma.$queryRaw`SELECT Artist.name AS artist_name, Song.song AS song_name, Song.songduration as duration FROM Artist JOIN Song ON Artist.id=Song.artistId;`
        return result
    })
    .get("/features", async (req)=>{
        const result = await prisma.$queryRaw`SELECT Artist.name AS artist_name, Song.song AS song_name, Song.songduration as duration FROM Artist JOIN Song ON Artist.id=Song.artistId ORDER BY Song.artistId DESC;`
        return result
    })
    .get("/newrelease", async (req)=>{
        const result = await prisma.$queryRaw`SELECT Artist.name AS artist_name, Song.song AS song_name, Song.songduration as duration FROM Artist JOIN Song ON Artist.id=Song.artistId ORDER BY Song.id DESC LIMIT 5;`
        return result
    })
    .get("/", () => "Hello World! from Elysia")
    .listen(3000);




console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);






















// import { Elysia } from "elysia";

// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );
