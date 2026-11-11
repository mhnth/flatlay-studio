export type PlatformType = 'instagram' | 'facebook' | 'twitter';
export type AspectRatioType = '1:1' | '4:5' | '16:9' | '9:16';
export type FitModeType = 'cover' | 'contain';
export type ThemeType = 'light' | 'dark';

export interface AppState {
  platform: PlatformType;
  image: HTMLImageElement | null;
  ratio: AspectRatioType;
  fitMode: FitModeType;
  scale: number;
  rotation: number;
  posX: number;
  posY: number;
  theme: ThemeType;

  // Thông tin profile & bài đăng
  username: string;
  handle: string; // Dành riêng cho Twitter (@handle)
  location: string;
  isVerified: boolean;
  avatarUrl: string;
  likes: string;
  commentsCount: string;
  retweetsCount: string; // Dành riêng cho Twitter
  caption: string;
  timeText: string;

  // Trạng thái tương tác
  liked: boolean;
  bookmarked: boolean;
}
