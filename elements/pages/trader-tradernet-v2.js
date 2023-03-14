import { html, css, ref } from '../../vendor/fast-element.min.js';
import { validate, invalidate } from '../../lib/ppp-errors.js';
import {
  Page,
  pageStyles,
  documentPageHeaderPartial,
  documentPageFooterPartial
} from '../page.js';
import { TRADER_CAPS, TRADERS } from '../../lib/const.js';
import '../badge.js';
import '../button.js';
import '../query-select.js';
import '../radio-group.js';
import '../text-field.js';

export const traderTradernetV2Template = html`
  <template class="${(x) => x.generateClasses()}">
    <ppp-loader></ppp-loader>
    <form novalidate>
      ${documentPageHeaderPartial({
        pageUrl: import.meta.url
      })}
      <section>
        <div class="label-group">
          <h5>Название трейдера</h5>
          <p class="description">
            Произвольное имя, чтобы ссылаться на этот профиль, когда
            потребуется.
          </p>
        </div>
        <div class="input-group">
          <ppp-text-field
            placeholder="Tradernet"
            value="${(x) => x.document.name}"
            ${ref('name')}
          ></ppp-text-field>
        </div>
      </section>
      <section>
        <div class="label-group">
          <h5>Профиль брокера</h5>
        </div>
        <div class="input-group">
          <ppp-query-select
            ${ref('brokerId')}
            value="${(x) => x.document.brokerId}"
            :context="${(x) => x}"
            :preloaded="${(x) => x.document.broker ?? ''}"
            :query="${() => {
              return (context) => {
                return context.services
                  .get('mongodb-atlas')
                  .db('ppp')
                  .collection('brokers')
                  .find({
                    $and: [
                      {
                        type: `[%#(await import(ppp.rootUrl + '/lib/const.js')).BROKERS.TRADERNET%]`
                      },
                      {
                        $or: [
                          { removed: { $ne: true } },
                          { _id: `[%#this.document.brokerId ?? ''%]` }
                        ]
                      }
                    ]
                  })
                  .sort({ updatedAt: -1 });
              };
            }}"
            :transform="${() => ppp.decryptDocumentsTransformation()}"
          ></ppp-query-select>
          <div class="spacing2"></div>
          <ppp-button
            @click="${() =>
              ppp.app.mountPage('broker-tradernet', {
                size: 'xlarge',
                adoptHeader: true
              })}"
            appearance="primary"
          >
            Добавить профиль Цифра
          </ppp-button>
        </div>
      </section>
      <section>
        <div class="label-group">
          <h5>Тайм-аут восстановления соединения</h5>
          <p class="description">
            Время, по истечении которого будет предпринята очередная попытка
            восстановить прерванное подключение к серверу. Задаётся в
            миллисекундах, по умолчанию 1000 мс.
          </p>
        </div>
        <div class="input-group">
          <ppp-text-field
            optional
            type="number"
            placeholder="1000"
            value="${(x) => x.document.reconnectTimeout}"
            ${ref('reconnectTimeout')}
          ></ppp-text-field>
        </div>
      </section>
      ${documentPageFooterPartial()}
    </form>
  </template>
`;

export const traderTradernetV2Styles = css`
  ${pageStyles}
`;

export class TraderTradernetV2Page extends Page {
  collection = 'traders';

  async validate() {
    await validate(this.name);
    await validate(this.brokerId);

    if (this.reconnectTimeout.value.trim()) {
      await validate(this.reconnectTimeout, {
        hook: async (value) => +value >= 100 && +value <= 10000,
        errorMessage: 'Введите значение в диапазоне от 100 до 10000'
      });
    }

    const broker = this.brokerId.datum();
    // const jwtRequest = await fetch(
    //   `https://oauth.alor.ru/refresh?token=${broker.refreshToken}`,
    //   {
    //     method: 'POST'
    //   }
    // );
    //
    // await maybeFetchError(jwtRequest, 'Неверный токен Alor.');
    //
    // const { AccessToken } = await jwtRequest.json();
    // const summaryRequest = await fetch(
    //   `https://api.alor.ru/md/v2/Clients/${
    //     this.exchange.value
    //   }/${this.portfolio.value.trim()}/summary`,
    //   {
    //     headers: {
    //       'X-ALOR-REQID': uuidv4(),
    //       Authorization: `Bearer ${AccessToken}`
    //     }
    //   }
    // );
    //
    // await maybeFetchError(
    //   summaryRequest,
    //   'Не удаётся получить информацию о портфеле.'
    // );
  }

  async read() {
    return (context) => {
      return context.services
        .get('mongodb-atlas')
        .db('ppp')
        .collection('[%#this.collection%]')
        .aggregate([
          {
            $match: {
              _id: new BSON.ObjectId('[%#payload.documentId%]'),
              type: `[%#(await import(ppp.rootUrl + '/lib/const.js')).TRADERS.TRADERNET_V2%]`
            }
          },
          {
            $lookup: {
              from: 'brokers',
              localField: 'brokerId',
              foreignField: '_id',
              as: 'broker'
            }
          },
          {
            $unwind: '$broker'
          }
        ]);
    };
  }

  async find() {
    return {
      type: TRADERS.TRADERNET_V2,
      name: this.name.value.trim(),
      removed: { $ne: true }
    };
  }

  async submit() {
    if (ppp.traders.has(this.document._id)) {
      ppp.traders.delete(this.document._id);
    }

    return {
      $set: {
        name: this.name.value.trim(),
        brokerId: this.brokerId.value,
        reconnectTimeout: this.reconnectTimeout.value
          ? Math.abs(this.reconnectTimeout.value)
          : void 0,
        caps: [
          TRADER_CAPS.CAPS_LIMIT_ORDERS,
          TRADER_CAPS.CAPS_MARKET_ORDERS,
          TRADER_CAPS.CAPS_ACTIVE_ORDERS,
          TRADER_CAPS.CAPS_POSITIONS,
          TRADER_CAPS.CAPS_TIMELINE
        ],
        version: 1,
        type: TRADERS.TRADERNET_V2,
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    };
  }
}

export default TraderTradernetV2Page.compose({
  name: 'ppp-trader-tradernet-v2-page',
  template: traderTradernetV2Template,
  styles: traderTradernetV2Styles
}).define();
