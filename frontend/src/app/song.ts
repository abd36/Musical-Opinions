export class Song {
  constructor(
    public title: String,
    public artist: String,
    public album: String,
    public comment: String,
    public genre: String,
    public year: String,
    public numberOfRatings: Number,
    public sumOfRating: Number,
    public averageRating: Number,
    public hidden: Boolean,
    public copyRightStrike: Boolean
  ){}
}