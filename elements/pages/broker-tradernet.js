import ppp from '../../ppp.js';
import { html, css, ref } from '../../vendor/fast-element.min.js';
import { validate, invalidate } from '../../lib/ppp-errors.js';
import {
  Page,
  pageStyles,
  documentPageHeaderPartial,
  documentPageFooterPartial
} from '../page.js';
import { BROKERS } from '../../lib/const.js';
import '../badge.js';
import '../button.js';
import '../text-field.js';

export const brokerTradernetPageTemplate = html`
  <template class="${(x) => x.generateClasses()}">
    <ppp-loader></ppp-loader>
    <form novalidate>
      ${documentPageHeaderPartial({
        pageUrl: import.meta.url
      })}
      <section>
        <div class="label-group">
          <h5>Название подключения</h5>
          <p class="description">
            Произвольное имя, чтобы ссылаться на этот профиль, когда
            потребуется.
          </p>
        </div>
        <div class="input-group">
          <ppp-text-field
            placeholder="Цифра"
            value="${(x) => x.document.name}"
            ${ref('name')}
          ></ppp-text-field>
        </div>
      </section>
      <section>
        <div class="label-group">
          <h5>Публичный ключ для доступа к API</h5>
          <p class="description">
            Требуется для подписи всех запросов. Получить можно по
            <a
              class="link"
              rel="noopener"
              target="_blank"
               href="https://tradernet.ru/tradernet-api/auth-api"
              >ссылке</a
            >.
          </p>
        </div>
        <div class="input-group">
          <ppp-text-field
            type="password"
            placeholder="Публичный ключ API"
            value="${(x) => x.document.apiKey}"
            ${ref('apiKey')}
          ></ppp-text-field>
        </div>
      </section>
      <section>
        <div class="label-group">
          <h5>Секретный ключ для доступа к API</h5>
          <p class="description">
            Требуется для подписи всех запросов. Получить можно по
            <a
              class="link"
              rel="noopener"
              target="_blank"
              href="https://tradernet.ru/tradernet-api/auth-api"
            >ссылке</a
            >.
          </p>
        </div>
        <div class="input-group">
          <ppp-text-field
            type="password"
            placeholder="Секретный ключ API"
            value="${(x) => x.document.secret}"
            ${ref('secret')}
          ></ppp-text-field>
        </div>
      </section>
      ${documentPageFooterPartial()}
    </form>
  </template>
`;

export const brokerTradernetPageStyles = css`
  ${pageStyles}
`;

export async function checkTradernetCredentials({
  serviceMachineUrl,
  apiKey,
  secret
}) {
  const stringifyKeyValuePair = ([key, value]) => {
    const valueString = Array.isArray(value)
      ? `["${value.join('","')}"]`
      : value;

    return `${key}=${encodeURIComponent(valueString)}`;
  };

  const buildQueryString = (params) => {
    if (!params) return '';

    return Object.entries(params).map(stringifyKeyValuePair).join('&');
  };

  const cmd = 'getAuthInfo';
  const nonce = Date.now();
  const queryString = buildQueryString({ apiKey, cmd, nonce });

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = Array.from(
    new Uint8Array(
      await crypto.subtle.sign(
        'HMAC',
        key,
        new TextEncoder().encode(queryString)
      )
    )
  )
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return await fetch(new URL('fetch', serviceMachineUrl).toString(), {
    cache: 'no-cache',
    method: 'POST',
    body: JSON.stringify({
      method: 'POST',
      url: new URL(
        `/api/v2/cmd/${cmd}`,
        'https://tradernet.ru'
      ).toString(),
      headers: {
        'X-NtApi-Sig': signature
    },
      body: queryString
    })
  });
}

export class BrokerTradernetPage extends Page {
  collection = 'brokers';

  async validate() {
    await validate(this.name);
    await validate(this.apiKey);
    await validate(this.secret);

    const request = await checkTradernetCredentials({
      serviceMachineUrl: ppp.keyVault.getKey('service-machine-url'),
      apiKey: this.apiKey.value.trim(),
      secret: this.secret.value.trim()
    });

    const response = await request.json();

    if (!(request.ok && response.api_key === this.apiKey.value.trim())) {
      console.error(response);

      invalidate(this.apiKey, {
        errorMessage: 'Неверные публичный или секретный ключи',
        raiseException: true
      });
    }
  }

  async read() {
    return (context) => {
      return context.services
        .get('mongodb-atlas')
        .db('ppp')
        .collection('[%#this.collection%]')
        .findOne({
          _id: new BSON.ObjectId('[%#payload.documentId%]'),
          type: `[%#(await import(ppp.rootUrl + '/lib/const.js')).BROKERS.TRADERNET%]`
        });
    };
  }

  async find() {
    return {
      type: BROKERS.TRADERNET,
      name: this.name.value.trim(),
      removed: { $ne: true }
    };
  }

  async submit() {
    return {
      $set: {
        name: this.name.value.trim(),
        apiKey: this.apiKey.value.trim(),
        secret: this.secret.value.trim(),
        version: 1,
        type: BROKERS.TRADERNET,
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    };
  }
}

export default BrokerTradernetPage.compose({
  template: brokerTradernetPageTemplate,
  styles: brokerTradernetPageStyles
}).define();
