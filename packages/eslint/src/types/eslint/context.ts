export type Context = {
  id: string;
  options: any;
  report(report: Report): void;
};

type Report = {
  node: any;
  messageId: string;
  data?: any;
};
