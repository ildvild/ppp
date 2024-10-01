import {
  APIS,
  BROKERS,
  SERVICES,
  SERVER_TYPES,
  WIDGET_TYPES,
  SERVICE_STATE,
  TRADERS,
  SERVER_STATE,
  TRADER_CAPS,
  VERSIONING_STATUS,
  EXCHANGE,
  COLUMN_SOURCE,
  ORDERS,
  TRADING_STATUS,
  TRADER_DATUM
} from '../../../lib/const.js';

export default function (i18n) {
  i18n.extend({
    $const: {
      api: {
        [APIS.SUPABASE]: 'Supabase',
        [APIS.PUSHER]: 'Pusher',
        [APIS.ASTRADB]: 'AstraDB',
        [APIS.SEATABLE]: 'Seatable',
        [APIS.NORTHFLANK]: 'Northflank',
        [APIS.POSTGRESQL]: 'PostgreSQL',
        [APIS.RENDER]: 'Render',
        [APIS.REDIS]: 'Redis',
        [APIS.CLOUDFLARE]: 'Cloudflare',
        [APIS.BITIO]: 'bit.io',
        [APIS.YC]: 'Yandex Cloud'
      },
      broker: {
        [BROKERS.ALPACA]: 'Alpaca',
        [BROKERS.ALOR]: 'Alor',
        [BROKERS.TINKOFF]: 'T-Bank',
        [BROKERS.FINAM]: 'Finam',
        [BROKERS.IB]: 'Interactive Brokers',
        [BROKERS.UTEX]: 'UTEX',
        [BROKERS.PSINA]: 'Psina',
        [BROKERS.BINANCE]: 'Binance',
        [BROKERS.HUOBI]: 'Huobi',
        [BROKERS.BYBIT]: 'Bybit',
        [BROKERS.MEXC]: 'MEXC',
        [BROKERS.CAPITALCOM]: 'Capital.com'
      },
      columnSource: {
        [COLUMN_SOURCE.INSTRUMENT]: 'Инструмент',
        [COLUMN_SOURCE.SYMBOL]: 'Тикер',
        [COLUMN_SOURCE.INSTRUMENT_TYPE]: 'Тип',
        [COLUMN_SOURCE.BEST_BID]: 'Bid',
        [COLUMN_SOURCE.BEST_ASK]: 'Ask',
        [COLUMN_SOURCE.LAST_PRICE]: 'Цена',
        [COLUMN_SOURCE.LAST_PRICE_ABSOLUTE_CHANGE]: 'Изм. цены',
        [COLUMN_SOURCE.LAST_PRICE_RELATIVE_CHANGE]: 'Изм. цены, %',
        [COLUMN_SOURCE.EXTENDED_LAST_PRICE]: 'Цена+',
        [COLUMN_SOURCE.EXTENDED_LAST_PRICE_ABSOLUTE_CHANGE]: 'Изм. цены+',
        [COLUMN_SOURCE.EXTENDED_LAST_PRICE_RELATIVE_CHANGE]: 'Изм. цены+, %',
        [COLUMN_SOURCE.PL_ABSOLUTE]: 'Доход',
        [COLUMN_SOURCE.PL_RELATIVE]: 'Доход, %',
        [COLUMN_SOURCE.EXTENDED_PL_ABSOLUTE]: 'Доход+',
        [COLUMN_SOURCE.EXTENDED_PL_RELATIVE]: 'Доход+, %',
        [COLUMN_SOURCE.POSITION_AVAILABLE]: 'Доступно',
        [COLUMN_SOURCE.POSITION_AVERAGE]: 'Средняя',
        [COLUMN_SOURCE.TOTAL_AMOUNT]: 'Стоимость',
        [COLUMN_SOURCE.EXTENDED_TOTAL_AMOUNT]: 'Стоимость+',
        [COLUMN_SOURCE.DAY_VOLUME]: 'Объём',
        [COLUMN_SOURCE.TRADING_STATUS]: 'Торговый статус',
        [COLUMN_SOURCE.FORMATTED_VALUE]: 'Значение'
      },
      datum: {
        [TRADER_DATUM.LAST_PRICE]: 'Price',
        [TRADER_DATUM.LAST_PRICE_RELATIVE_CHANGE]: 'Price ch., %',
        [TRADER_DATUM.LAST_PRICE_ABSOLUTE_CHANGE]: 'Price ch.',
        [TRADER_DATUM.BEST_BID]: 'Bid',
        [TRADER_DATUM.BEST_ASK]: 'Ask',
        [TRADER_DATUM.MIDPOINT]: 'Mid',
        [TRADER_DATUM.EXTENDED_LAST_PRICE]: 'Price+',
        [TRADER_DATUM.EXTENDED_LAST_PRICE_RELATIVE_CHANGE]: 'Изм. цены+, %',
        [TRADER_DATUM.EXTENDED_LAST_PRICE_ABSOLUTE_CHANGE]: 'Изм. цены+',
        [TRADER_DATUM.STATUS]: 'Status',
        [TRADER_DATUM.TRADING_STATUS]: 'Trading status',
        [TRADER_DATUM.DAY_VOLUME]: 'Volume',
        [TRADER_DATUM.SPRINT]: 'Sprint',
        [TRADER_DATUM.LOCATE]: 'Locate'
      },
      exchange: {
        [EXCHANGE.BINANCE]: 'Binance',
        [EXCHANGE.BYBIT_LINEAR]: 'Bybit (деривативы)',
        [EXCHANGE.BYBIT_SPOT]: 'Bybit (спот)',
        [EXCHANGE.MOEX]: 'Московская биржа',
        [EXCHANGE.SPBX]: 'СПБ Биржа',
        [EXCHANGE.RUS]: 'СПБ Биржа/Мосбиржа',
        [EXCHANGE.UTEX_MARGIN_STOCKS]: 'UTEX Margin (акции и ETF)',
        [EXCHANGE.US]: 'US exchanges',
        [EXCHANGE.CAPITALCOM]: 'Capital.com'
      },
      instrumentType: {
        unknown: 'Unknown',
        stock: 'Stock',
        bond: 'Bond',
        etf: 'ETF',
        future: 'Future',
        option: 'Option',
        index: 'Index',
        commodity: 'Commodity',
        balance: 'Balance',
        currency: 'FX',
        cryptocurrency: 'Crypto'
      },
      order: {
        [ORDERS.STOP_LOSS_TAKE_PROFIT]: 'Stop Loss/Take Profit',
        [ORDERS.MARKET_DATA_RECORDER]: 'Market Data Recorder',
        [ORDERS.CUSTOM]: 'Custom'
      },
      trader: {
        [TRADERS.ALOR_OPENAPI_V2]: 'Alor Open API V2',
        [TRADERS.TINKOFF_GRPC_WEB]: 'T-Bank gRPC-Web',
        [TRADERS.ALPACA_V2_PLUS]: 'Alpaca API V2',
        [TRADERS.BINANCE_V3]: 'Binance API V3',
        [TRADERS.MEXC_V3]: 'MEXC API V3',
        [TRADERS.BYBIT_V5]: 'Bybit API V5',
        [TRADERS.UTEX_MARGIN_STOCKS]: 'UTEX Margin, stocks',
        [TRADERS.FINAM_TRADE_API]: 'Finam Trade API',
        [TRADERS.IB]: 'Interactive Brokers',
        [TRADERS.CAPITALCOM]: 'Capital.com',
        [TRADERS.PAPER_TRADE]: 'paperTrade',
        [TRADERS.COMBINED_L1]: 'L1-combo',
        [TRADERS.COMBINED_ORDERBOOK]: 'Orderbook combo',
        [TRADERS.CUSTOM]: 'Custom'
      },
      traderCaps: {
        [TRADER_CAPS.CAPS_LIMIT_ORDERS]: 'Limit orders',
        [TRADER_CAPS.CAPS_MARKET_ORDERS]: 'Market orders',
        [TRADER_CAPS.CAPS_CONDITIONAL_ORDERS]: 'Conditional orders',
        [TRADER_CAPS.CAPS_ACTIVE_ORDERS]: 'Active orders',
        [TRADER_CAPS.CAPS_ORDERBOOK]: 'Orderbook',
        [TRADER_CAPS.CAPS_TIME_AND_SALES]: 'Лента всех сделок',
        [TRADER_CAPS.CAPS_POSITIONS]: 'Positions',
        [TRADER_CAPS.CAPS_TIMELINE]: 'Timeline',
        [TRADER_CAPS.CAPS_LEVEL1]: 'Level 1',
        [TRADER_CAPS.CAPS_EXTENDED_LEVEL1]: 'Level 1 (extended)',
        [TRADER_CAPS.CAPS_CHARTS]: 'История котировок',
        [TRADER_CAPS.CAPS_MIC]: 'Пулы ликвидности',
        [TRADER_CAPS.CAPS_ORDER_DESTINATION]: 'Order destination selection',
        [TRADER_CAPS.CAPS_ORDER_TIF]: 'Time in Force setting',
        [TRADER_CAPS.CAPS_ORDER_DISPLAY_SIZE]: 'Параметр отображаемого объема',
        [TRADER_CAPS.CAPS_NOII]: 'NOII',
        [TRADER_CAPS.CAPS_US_NBBO]: 'NBBO (US)',
        [TRADER_CAPS.CAPS_NSDQ_TOTALVIEW]: 'Nasdaq TotalView',
        [TRADER_CAPS.CAPS_ARCABOOK]: 'NYSE ArcaBook',
        [TRADER_CAPS.CAPS_BLUEATS]: 'Blue Ocean ATS',
        [TRADER_CAPS.CAPS_DIRECTEDGE_BOOK]: 'NYSE Openbook',
        [TRADER_CAPS.CAPS_NYSE_OPENBOOK]: 'Direct Edge Book',
        [TRADER_CAPS.CAPS_BZX_BOOK]: 'BATS BZX Book'
      },
      tradingStatus: {
        [TRADING_STATUS.UNSPECIFIED]: 'Нет',
        [TRADING_STATUS.NOT_AVAILABLE_FOR_TRADING]: 'No trading',
        [TRADING_STATUS.OPENING_PERIOD]: 'Открытие торгов',
        [TRADING_STATUS.CLOSING_PERIOD]: 'Закрытие торгов',
        [TRADING_STATUS.BREAK_IN_TRADING]: 'Перерыв в торгах',
        [TRADING_STATUS.NORMAL_TRADING]: 'Normal trading',
        [TRADING_STATUS.CLOSING_AUCTION]: 'Аукцион закрытия',
        [TRADING_STATUS.DARK_POOL_AUCTION]: 'Аукцион DP',
        [TRADING_STATUS.DISCRETE_AUCTION]: 'Аукцион',
        [TRADING_STATUS.OPENING_AUCTION_PERIOD]: 'Аукцион открытия',
        [TRADING_STATUS.TRADING_AT_CLOSING_AUCTION_PRICE]: 'Аукцион закрытия*',
        [TRADING_STATUS.SESSION_ASSIGNED]: 'Сессия назначена',
        [TRADING_STATUS.SESSION_CLOSE]: 'Сессия закрыта',
        [TRADING_STATUS.SESSION_OPEN]: 'Сессия открыта',
        [TRADING_STATUS.DEALER_NORMAL_TRADING]: 'Ликвидность брокера',
        [TRADING_STATUS.DEALER_BREAK_IN_TRADING]: 'Перерыв в торгах',
        [TRADING_STATUS.DEALER_NOT_AVAILABLE_FOR_TRADING]: 'Торги недоступны',
        [TRADING_STATUS.PREMARKET]: 'Premarket',
        [TRADING_STATUS.AFTER_HOURS]: 'After hours',
        [TRADING_STATUS.TRADING_SUSPENDED]: 'Trading halt',
        [TRADING_STATUS.DELISTED]: 'DElisted',
        [TRADING_STATUS.IPO_TODAY]: 'IPO today',
        [TRADING_STATUS.QUOTATION_RESUMPTION]: 'Quotation resumption',
        [TRADING_STATUS.SHORT_SALE_RESTRICTION]: 'SSR',
        [TRADING_STATUS.MARKET_IMBALANCE]: 'Market imbalance',
        [TRADING_STATUS.MARKET_CLOSE_IMBALANCE]: 'Market imbalance (close)',
        [TRADING_STATUS.PRICE_INDICATION]: 'Price indication',
        [TRADING_STATUS.TRADING_RANGE_INDICATION]: 'Trading range indication'
      },
      server: {
        [SERVER_TYPES.PASSWORD]: 'Вход по паролю',
        [SERVER_TYPES.KEY]: 'Вход по приватному ключу'
      },
      serverState: {
        [SERVER_STATE.OK]: 'Настроен',
        [SERVER_STATE.FAILED]: 'Проблемы с настройкой'
      },
      serviceState: {
        [SERVICE_STATE.ACTIVE]: 'Активен',
        [SERVICE_STATE.STOPPED]: 'Остановлен',
        [SERVICE_STATE.FAILED]: 'Проблемы с настройкой',
        'N/A': 'Нет данных'
      },
      service: {
        [SERVICES.NYSE_NSDQ_HALTS]: 'Торговые паузы NYSE/NASDAQ',
        [SERVICES.SUPABASE_PARSER]: 'Парсер (Supabase)',
        [SERVICES.CLOUD_PPP_ASPIRANT]: 'Aspirant',
        [SERVICES.DEPLOYED_PPP_ASPIRANT]: 'Aspirant (по адресу)',
        [SERVICES.SYSTEMD_PPP_ASPIRANT]: 'Aspirant (systemd)',
        [SERVICES.PPP_ASPIRANT_WORKER]: 'Aspirant Worker',
        [SERVICES.CLOUDFLARE_WORKER]: 'Cloudflare Worker'
      },
      timeframeLabel: {
        Sec: 'Second',
        Min: 'Minute',
        Hour: 'Hour',
        Day: 'Day',
        Week: 'Week',
        Month: 'Month'
      },
      versioningStatus: {
        [VERSIONING_STATUS.OLD]: 'Требуется обновление',
        [VERSIONING_STATUS.OFF]: 'Версия не отслеживается',
        [VERSIONING_STATUS.OK]: 'Последняя версия'
      },
      widget: {
        [WIDGET_TYPES.ORDER]: 'Заявка',
        [WIDGET_TYPES.SCALPING_BUTTONS]: 'Скальперские кнопки',
        [WIDGET_TYPES.ACTIVE_ORDERS]: 'Активные заявки',
        [WIDGET_TYPES.LIGHT_CHART]: 'Лёгкий график',
        [WIDGET_TYPES.ORDERBOOK]: 'Книга заявок',
        [WIDGET_TYPES.TIME_AND_SALES]: 'Лента всех сделок',
        [WIDGET_TYPES.PORTFOLIO]: 'Портфель',
        [WIDGET_TYPES.BALANCES]: 'Балансы',
        [WIDGET_TYPES.CLOCK]: 'Часы',
        [WIDGET_TYPES.MARQUEE]: 'Строка котировок',
        [WIDGET_TYPES.TCC]: 'Управление трейдерами',
        [WIDGET_TYPES.TIMELINE]: 'Лента операций',
        [WIDGET_TYPES.LIST]: 'Список',
        [WIDGET_TYPES.FRAME]: 'Фрейм',
        [WIDGET_TYPES.NOII]: 'NOII',
        [WIDGET_TYPES.OTHER]: 'Специальный виджет'
      }
    }
  });
}
