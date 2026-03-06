export interface Camera {
  id: number;
  name: string;
  power: number;
  image?: string;
  description?: string;
}

export interface FilterParams {
  camera?: string;
}

export interface CamerasCartInfo {
  draft_id: number;
  cameras_cnt: number;
}
