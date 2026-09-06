export interface Component {
  id: number;
  label: string;
  thumbnailPath: string;
}

export interface GetComponentRequest {
  page: number;
  limit: number;
}

export interface GetComponentResponse {
  components: Component[];
}