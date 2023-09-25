export enum Gender {
  Male = "male",
  Female = "female",
}

export interface Cat {
  id: number;
  name: string;
  gender: Gender;
  birthDate: Date;
  bio?: string;
  image?: string; // As this application is frontend only for now that is why we are keeping it in base64
}
