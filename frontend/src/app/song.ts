export class Song {
  constructor(
    public _id: string,
    public title: String,
    public artist: String,
    public album: String,
    public comment: String,
    public genre: String,
    public track: Number,
    public year: Number,
    public numberOfRatings: Number,
    public sumOfRating: Number,
    public averageRating: Number,
    public hidden: Boolean,
    public copyRightStrike: Boolean
  ){}
}