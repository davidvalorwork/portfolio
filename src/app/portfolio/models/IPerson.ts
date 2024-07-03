import { IMiniPerson } from "./IMiniPerson";

export interface IPerson{ 
  about: string;
  education: string;
  basic_info:  string;
  contact_info: string;
  follower_count: number;
  following_count: number;
  friend_count: number;
  life_events: string;
  name: string;
  other_names: string;
  places_lived: string;
  relationship: string;
  work: string;
  cover_photo: string;
  cover_photo_text: string;
  id: string;
  profile_picture: string;
  friends?: IMiniPerson[];
}