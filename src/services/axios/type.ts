export interface Paginated {
  keyword: string;
  page: number;
  take: number;
  sort: string;
  sorted: string;
  from_date: string;
  to_date: string;
  number_records: number;
  pages: number;
  has_prev: boolean;
  has_next: boolean;
}
export interface NetworkData {
  id: number;
  status: string;
  name: string;
  slug: string;
  network_type: string;
  icon: string;
}
