/* eslint-disable comma-dangle, no-multi-spaces, key-spacing, quotes, quote-props */

/**
 * Edit base E-Com Plus Application object here.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/applications/
 */

const app = {
  app_id: 101460,
  title: 'Frete Barato',
  slug: 'frete-barato',
  type: 'external',
  state: 'active',
  authentication: true,

  /**
   * Uncomment modules above to work with E-Com Plus Mods API on Storefront.
   * Ref.: https://developers.e-com.plus/modules-api/
   */
  modules: {
    /**
     * Triggered to calculate shipping options, must return values and deadlines.
     * Start editing `routes/ecom/modules/calculate-shipping.js`
     */
    calculate_shipping:   { enabled: true },

    /**
     * Triggered to validate and apply discount value, must return discount and conditions.
     * Start editing `routes/ecom/modules/apply-discount.js`
     */
    // apply_discount:       { enabled: true },

    /**
     * Triggered when listing payments, must return available payment methods.
     * Start editing `routes/ecom/modules/list-payments.js`
     */
    // list_payments:        { enabled: true },

    /**
     * Triggered when order is being closed, must create payment transaction and return info.
     * Start editing `routes/ecom/modules/create-transaction.js`
     */
    // create_transaction:   { enabled: true },
  },

  /**
   * Uncomment only the resources/methods your app may need to consume through Store API.
   */
  auth_scope: {
    'stores/me': [
      'GET'            // Read store info
    ],
    procedures: [
      'POST'           // Create procedures to receive webhooks
    ],
    products: [
      // 'GET',           // Read products with public and private fields
      // 'POST',          // Create products
      // 'PATCH',         // Edit products
      // 'PUT',           // Overwrite products
      // 'DELETE',        // Delete products
    ],
    brands: [
      // 'GET',           // List/read brands with public and private fields
      // 'POST',          // Create brands
      // 'PATCH',         // Edit brands
      // 'PUT',           // Overwrite brands
      // 'DELETE',        // Delete brands
    ],
    categories: [
      // 'GET',           // List/read categories with public and private fields
      // 'POST',          // Create categories
      // 'PATCH',         // Edit categories
      // 'PUT',           // Overwrite categories
      // 'DELETE',        // Delete categories
    ],
    customers: [
      // 'GET',           // List/read customers
      // 'POST',          // Create customers
      // 'PATCH',         // Edit customers
      // 'PUT',           // Overwrite customers
      // 'DELETE',        // Delete customers
    ],
    orders: [
      // 'GET',           // List/read orders with public and private fields
      // 'POST',          // Create orders
      // 'PATCH',         // Edit orders
      // 'PUT',           // Overwrite orders
      // 'DELETE',        // Delete orders
    ],
    carts: [
      // 'GET',           // List all carts (no auth needed to read specific cart only)
      // 'POST',          // Create carts
      // 'PATCH',         // Edit carts
      // 'PUT',           // Overwrite carts
      // 'DELETE',        // Delete carts
    ],

    /**
     * Prefer using 'fulfillments' and 'payment_history' subresources to manipulate update order status.
     */
    'orders/fulfillments': [
      // 'GET',           // List/read order fulfillment and tracking events
      // 'POST',          // Create fulfillment event with new status
      // 'DELETE',        // Delete fulfillment event
    ],
    'orders/payments_history': [
      // 'GET',           // List/read order payments history events
      // 'POST',          // Create payments history entry with new status
      // 'DELETE',        // Delete payments history entry
    ],

    /**
     * Set above 'quantity' and 'price' subresources if you don't need access for full product document.
     * Stock and price management only.
     */
    'products/quantity': [
      // 'GET',           // Read product available quantity
      // 'PUT',           // Set product stock quantity
    ],
    'products/variations/quantity': [
      // 'GET',           // Read variaton available quantity
      // 'PUT',           // Set variation stock quantity
    ],
    'products/price': [
      // 'GET',           // Read product current sale price
      // 'PUT',           // Set product sale price
    ],
    'products/variations/price': [
      // 'GET',           // Read variation current sale price
      // 'PUT',           // Set variation sale price
    ],

    /**
     * You can also set any other valid resource/subresource combination.
     * Ref.: https://developers.e-com.plus/docs/api/#/store/
     */
  },

  admin_settings: {
    /**
     * JSON schema based fields to be configured by merchant and saved to app `data` / `hidden_data`, such as:
*/
      zip: {
        schema: {
          type: 'string',
          maxLength: 9,
          pattern: '^[0-9]{5}-?[0-9]{3}$',
          title: 'CEP de origem'
        },
        hide: true
      },
     token: {
      schema: {
        type: 'string',
        maxLength: 600,
        title: 'Token',
        description: 'Solicite Token para Frete Barato'
      },
      hide: true
    },
    client_id: {
      schema: {
        type: 'string',
        maxLength: 600,
        title: 'Client ID',
        description: 'Solicite Client ID para Frete Barato'
      },
      hide: true
    },
    use_bigger_box: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Calcular considerando apenas uma caixa',
        description: 'Se selecionado as dimensões não serão somadas e será considerado o maior valor de cada dimensão entre os itens'
      },
      hide: false
    },
    posting_deadline: {
      schema: {
        title: 'Prazo de postagem',
        type: 'object',
        required: ['days'],
        additionalProperties: false,
        properties: {
          days: {
            type: 'integer',
            minimum: 0,
            maximum: 999999,
            title: 'Número de dias',
            description: 'Dias de prazo para postar os produtos após a compra'
          },
          working_days: {
            type: 'boolean',
            default: true,
            title: 'Dias úteis'
          },
          after_approval: {
            type: 'boolean',
            default: true,
            title: 'Após aprovação do pagamento'
          }
        }
      },
      hide: false
    },
    additional_price: {
      schema: {
        type: 'number',
        minimum: -999999,
        maximum: 999999,
        title: 'Custo adicional',
        description: 'Valor a adicionar (negativo para descontar) no frete calculado em todas regras'
      },
      hide: false
    },
    services: {
      schema: {
        title: 'Rótulo dos Serviços',
        description: 'Para alterar o nome de exibição de algum serviço basta infomar o código do serviço e um novo rótulo de exibição.',
        type: 'array',
        maxItems: 6,
        items: {
          title: 'Serviço de entrega',
          type: 'object',
          required: [
            'service_name',
            'label'
          ],
          properties: {
            service_name: {
              type: 'string',
              title: 'Serviço',
              description: 'Nome oficial do serviço na transportadora'
            },
            label: {
              type: 'string',
              maxLength: 50,
              title: 'Rótulo',
              description: 'Nome do serviço exibido aos clientes'
            }
          }
        }
      },
      hide: true
    },
    free_shipping_rules: {
      schema: {
        title: 'Regras de frete grátis',
        type: 'array',
        maxItems: 300,
        items: {
          title: 'Regra de frete grátis',
          type: 'object',
          minProperties: 1,
          properties: {
            zip_range: {
              title: 'Faixa de CEP',
              type: 'object',
              required: [
                'min',
                'max'
              ],
              properties: {
                min: {
                  type: 'integer',
                  minimum: 10000,
                  maximum: 999999999,
                  title: 'CEP inicial'
                },
                max: {
                  type: 'integer',
                  minimum: 10000,
                  maximum: 999999999,
                  title: 'CEP final'
                }
              }
            },
            min_amount: {
              type: 'number',
              minimum: 1,
              maximum: 999999999,
              title: 'Valor mínimo da compra'
            },
            product_ids: {
              title: 'Lista de produtos',
              description: 'Se preenchido, o desconto só será válido se um dos produtos estiver no carrinho',
              type: 'array',
              items: {
                type: 'string',
                pattern: '^[a-f0-9]{24}$',
                title: 'ID do produto'
              }
            },
            all_product_ids: {
              type: 'boolean',
              title: 'Checar todos os produtos',
              description: 'Se ativo, a regra será disponibilizada apenas se todos os itens do carrinho estiverem na lista de produtos selecionados',
            }
          }
        }
      },
      hide: false
    },
    warehouses: {
      schema: {
        title: 'Armazéns (multi CD)',
        description: 'Origens e destinos para cada centro de distribuição',
        type: 'array',
        maxItems: 30,
        items: {
          title: 'Centro de distribuição',
          type: 'object',
          required: ['zip'],
          additionalProperties: false,
          properties: {
            code: {
              type: 'string',
              maxLength: 30,
              pattern: '^[A-Za-z0-9-_]{2,30}$',
              title: 'Código do CD'
            },
            doc: {
              type: 'string',
              maxLength: 255,
              title: 'Documento da filial',
              description: 'CNPJ da filial associado à sua conta Kangu'
            },
            zip: {
              type: 'string',
              maxLength: 9,
              pattern: '^[0-9]{5}-?[0-9]{3}$',
              title: 'CEP de origem',
              description: 'Código postal do remetente para cálculo do frete'
            },
            posting_deadline: {
              title: 'Prazo de envio do CD',
              type: 'object',
              required: ['days'],
              additionalProperties: false,
              properties: {
                days: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 999999,
                  title: 'Número de dias',
                  description: 'Dias de prazo para postar os produtos após a compra'
                },
                working_days: {
                  type: 'boolean',
                  default: true,
                  title: 'Dias úteis'
                },
                after_approval: {
                  type: 'boolean',
                  default: true,
                  title: 'Após aprovação do pagamento'
                }
              }
            },
            zip_range: {
              title: 'Faixa de CEP atendida',
              type: 'object',
              required: [
                'min',
                'max'
              ],
              properties: {
                min: {
                  type: 'integer',
                  minimum: 10000,
                  maximum: 999999999,
                  title: 'CEP inicial'
                },
                max: {
                  type: 'integer',
                  minimum: 10000,
                  maximum: 999999999,
                  title: 'CEP final'
                }
              }
            }
          }
        }
      },
      hide: true
    }
  }
}

/**
 * List of Procedures to be created on each store after app installation.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/procedures/
 */

const procedures = []

/**
 * Uncomment and edit code above to configure `triggers` and receive respective `webhooks`:

const { baseUri } = require('./__env')

procedures.push({
  title: app.title,

  triggers: [
    // Receive notifications when new order is created:
    {
      resource: 'orders',
      action: 'create',
    },

    // Receive notifications when order financial/fulfillment status are set or changed:
    // Obs.: you probably SHOULD NOT enable the orders triggers below and the one above (create) together.
    {
      resource: 'orders',
      field: 'financial_status',
    },
    {
      resource: 'orders',
      field: 'fulfillment_status',
    },

    // Receive notifications when products/variations stock quantity changes:
    {
      resource: 'products',
      field: 'quantity',
    },
    {
      resource: 'products',
      subresource: 'variations',
      field: 'quantity'
    },

    // Receive notifications when cart is edited:
    {
      resource: 'carts',
      action: 'change',
    },

    // Receive notifications when customer is deleted:
    {
      resource: 'customers',
      action: 'delete',
    },

    // Feel free to create custom combinations with any Store API resource, subresource, action and field.
  ],

  webhooks: [
    {
      api: {
        external_api: {
          uri: `${baseUri}/ecom/webhook`
        }
      },
      method: 'POST'
    }
  ]
})

 * You may also edit `routes/ecom/webhook.js` to treat notifications properly.
 */

exports.app = app

exports.procedures = procedures
