import {
  BROKERS,
  EXCHANGE,
  INSTRUMENT_DICTIONARY,
  TRADER_DATUM
} from '../lib/const.js';
import { later } from '../lib/ppp-decorators.js';
import { Trader, TraderDatum } from './common-trader.js';

class TradernetV2TraderDatum extends TraderDatum {
  async subscribe(source, field, datum) {
    await this.trader.establishWebSocketConnection();

    return super.subscribe(source, field, datum);
  }
}

// noinspection JSUnusedGlobalSymbols
/**
 * @typedef {Object} TradernetV2Trader
 */

class TradernetV2Trader extends Trader {
  #pendingAccessTokenRequest;
  #pendingConnection;

  connection;

  getDictionary() {
    return INSTRUMENT_DICTIONARY.TRADERNET;
  }

  getExchange() {
    return EXCHANGE.RUS;
  }

  getExchangeForDBRequest() {
    return this.document.exchange;
  }

  getBroker() {
    return BROKERS.TRADERNET;
  }

  async ensureAccessTokenIsOk() {
    const timeout = Math.max(this.document.reconnectTimeout ?? 1000, 1000);

    try {
      if (isJWTTokenExpired(this.accessToken)) this.accessToken = void 0;

      if (typeof this.accessToken === 'string') return;

      if (this.#pendingAccessTokenRequest) {
        await this.#pendingAccessTokenRequest;
      } else {
        this.#pendingAccessTokenRequest = fetch(
          `https://oauth.alor.ru/refresh?token=${this.document.broker.refreshToken}`,
          {
            method: 'POST'
          }
        )
          .then((request) => request.json())
          .then(({ AccessToken, message }) => {
            if (!AccessToken && /token/i.test(message)) {
              this.accessToken = null;

              throw new AuthorizationError({ details: message });
            }

            this.accessToken = AccessToken;
            this.#pendingAccessTokenRequest = void 0;
          })
          .catch((e) => {
            console.error(e);

            if (e instanceof AuthorizationError) {
              throw e;
            }

            this.#pendingAccessTokenRequest = void 0;

            return new Promise((resolve) => {
              setTimeout(async () => {
                await this.ensureAccessTokenIsOk();
                resolve();
              }, timeout);
            });
          });

        await this.#pendingAccessTokenRequest;
      }
    } catch (e) {
      console.error(e);

      if (e instanceof AuthorizationError) {
        throw e;
      }

      this.#pendingAccessTokenRequest = void 0;

      return new Promise((resolve) => {
        setTimeout(async () => {
          await this.ensureAccessTokenIsOk();

          resolve();
        }, timeout);
      });
    }
  }

  async establishWebSocketConnection(reconnect) {
  //  await this.ensureAccessTokenIsOk();

    if (this.connection?.readyState === WebSocket.OPEN) {
      this.#pendingConnection = void 0;

      return this.connection;
    } else if (this.#pendingConnection) {
      return this.#pendingConnection;
    } else {
      return (this.#pendingConnection = new Promise((resolve) => {
        if (!reconnect && this.connection) {
          resolve(this.connection);
        } else {
          this.connection = new WebSocket('wss://wss.tradernet.ru');
          this.connection.onopen = async () => {
            if (reconnect) {
              await this.resubscribe();
            }

            //ws.send(JSON.stringify(['sessions']));
            //ws.send(JSON.stringify(["portfolio"]));
            resolve(this.connection);
          };

          this.connection.onclose = async () => {
            await later(Math.max(this.document.reconnectTimeout ?? 1000, 1000));

            this.#pendingConnection = void 0;

            return this.establishWebSocketConnection(true);
          };

          this.connection.onerror = () => this.connection.close();

          this.connection.onmessage = ({ data }) => {
            const payload = JSON.parse(data);

            console.info(payload);

            if (/portfolio/i.test(payload?.event)) {
              console.info(payload?.data);
            }
          };
        }
      }));
    }
  }

}

export default TradernetV2Trader;
