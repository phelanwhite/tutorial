export interface IResponseList<T = unknown> {
  results: T[];
  pagination: {
    total_rows: number;
    total_pages: number;
    _page: number;
    _limit: number;
  };
  filters: {
    _q: string;
    _sort: string;
  };
}
