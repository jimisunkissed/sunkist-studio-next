export type TradeData = {
  asset_type: string;
  market: string;
  symbol: string;
  position_type: string;
  currency: string;
  entry_date: string;
  entry_price: number;
  exit_date: string;
  exit_price: number;
  quantity: number;
  fee: number;
  status: string;
  strategy_id: string;
  notes: string;
};

export type ValidType = 'enum' | 'string' | 'number' | 'date';

export type TradingTransactionTableProps = {
  label: string;
  value: (...param: any) => any;
  width?: string;
} & (
  | ({ independent: true; keyname: string } & ({ required: true; defaultValue?: never } | { required: false; defaultValue: any }))
  | { independent: false; required: false; keyname?: never; defaultValue?: never }
) &
  ({ type: 'enum'; enum: string[] } | { type: Exclude<ValidType, 'enum'>; enum?: string[] });
