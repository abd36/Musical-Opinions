export class Review {
    constructor(
      public rating: number,
      public comment: string,
      public songId: string,
      public userEmail: string,
    ){}
}