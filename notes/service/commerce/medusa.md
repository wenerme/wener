---
title: medusa
---

# medusa

- [medusajs/medusa](https://github.com/medusajs/medusa)
  - MIT, TS, Postgres, NextJS

```bash
npx @medusajs/medusa-cli new
```

## Notes

- Product
  - options 生成 variants
  - -N-> option ProductOptionDTO[]
    - 定义产品变体的属性类型，每个选项包含了可能的值。
    - title, product, metadata
    - -N-> values: ProductOptionValueDTO[]
  - -N-> variant ProductVariantDTO[]
    - 具体的产品变体，每个变体代表了产品的一个具体版本。
    - -N-> options: ProductOptionValueDTO[]
      - 当前辩题的选项
  - -N-> tag
  - -N-> image
    - url, rank
  - -N-> category
  - -1-> collection
- OrderDTO
  - shipping_address?: OrderAddressDTO
  - billing_address?: OrderAddressDTO
  - items?: OrderLineItemDTO[]
  - shipping_methods?: OrderShippingMethodDTO[]
  - transactions?: OrderTransactionDTO[]

```ts
// Product
export type ProductStatus = 'draft' | 'proposed' | 'published' | 'rejected';

// Order
/**
 * The change action's type.
 */
export type ChangeActionType =
  | 'CANCEL_RETURN_ITEM'
  | 'FULFILL_ITEM'
  | 'DELIVER_ITEM'
  | 'CANCEL_ITEM_FULFILLMENT'
  | 'ITEM_ADD'
  | 'ITEM_REMOVE'
  | 'ITEM_UPDATE'
  | 'RECEIVE_DAMAGED_RETURN_ITEM'
  | 'RECEIVE_RETURN_ITEM'
  | 'RETURN_ITEM'
  | 'SHIPPING_ADD'
  | 'SHIPPING_REMOVE'
  | 'SHIP_ITEM'
  | 'WRITE_OFF_ITEM'
  | 'REINSTATE_ITEM'
  | 'TRANSFER_CUSTOMER'
  | 'UPDATE_ORDER_PROPERTIES'
  | 'CREDIT_LINE_ADD';

export type OrderChangeStatus = 'confirmed' | 'declined' | 'requested' | 'pending' | 'canceled';

/**
 * The order's status.
 */
export type OrderStatus = 'pending' | 'completed' | 'draft' | 'archived' | 'canceled' | 'requires_action';
type ReturnStatus = 'requested' | 'received' | 'partially_received' | 'canceled';
/**
 * The payment's status.
 */
export type PaymentStatus =
  | 'not_paid'
  | 'awaiting'
  | 'authorized'
  | 'partially_authorized'
  | 'captured'
  | 'partially_captured'
  | 'partially_refunded'
  | 'refunded'
  | 'canceled'
  | 'requires_action';

/**
 * The fulfillment's status.
 */
export type FulfillmentStatus =
  | 'not_fulfilled'
  | 'partially_fulfilled'
  | 'fulfilled'
  | 'partially_shipped'
  | 'shipped'
  | 'partially_delivered'
  | 'delivered'
  | 'canceled';
```

```ts
export type AddressDTO = {
  id?: string
  address_1: string
  address_2?: string | null
  company?: string | null
  country_code: string
  city?: string | null
  phone?: string | null
  postal_code?: string | null
  province?: string | null
  metadata?: Record<string, unknown> | null
  created_at?: string | Date
  updated_at?: string | Date
  deleted_at?: string | Date | null
}
```

- HS Code - Harmonized System Code - 协调制度编码
- https://github.com/medusajs/medusa/blob/develop/packages/core/types/src/product/common.ts

```ts
const products = await productService.createProducts([
  {
    title: 'Medusa Shirt',
    options: [
      {
        title: 'Color',
        values: ['Black', 'White'],
      },
    ],
    variants: [
      {
        title: 'Black Shirt',
        options: {
          Color: 'Black',
        },
      },
    ],
  },
]);
```
