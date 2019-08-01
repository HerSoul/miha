export interface Route {
  path: string;
  breadcrumbName: string;
  children: Array<Route>;
}
