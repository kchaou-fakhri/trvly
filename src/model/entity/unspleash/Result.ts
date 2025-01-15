import {AlternativeSlugs} from './AlternativeSlugs';
import {Links} from './Links';
import {TopicSubmissions} from './TopicSubmissions';
import {Urls} from './Urls';
import {User} from './User';

export interface Result {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugs;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[];
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any | null;
  topic_submissions: TopicSubmissions;
  asset_type: string;
  user: User;
}
