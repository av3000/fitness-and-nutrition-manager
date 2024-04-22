export interface CommonFirebaseInstance {
  name: string;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}
