# Korean Reviews Bundle API example

Call [Korean Reviews Bundle on Apify Store](https://apify.com/ingenuous_signature/korean-reviews-bundle) to export public Olive Young and Naver Shopping product reviews into one JSON dataset. This is a developer example from the Actor's publisher, not an independent benchmark. Coupang is **not supported** in the public version.

## Input

Provide an Olive Young goods number or an Olive Young / Naver Smart Store / Naver Brand Store product URL. This small example requests at most 10 reviews from one Olive Young product:

```json
{
  "productIds": ["A000000223414"],
  "maxReviewsPerProduct": 10,
  "sortType": "USEFUL_SCORE_DESC"
}
```

The Actor charges **$0.15 per started block of 50 returned reviews per run**. A run returning zero reviews has no event charge. Splitting a batch into multiple partial runs may cost more. The example caps the run's event charge at $0.15; do not automate repeated calls while testing. Platform usage is included in the Actor's event price. You need an Apify account and its API token.

## Call it

With Node.js 24 or newer:

```bash
APIFY_TOKEN=your_existing_token node example.mjs
```

Keep `APIFY_TOKEN` in your environment or secret manager, never in this repository. `example.mjs` calls Apify's [synchronous dataset-items endpoint](https://docs.apify.com/api/v2/actor-run-sync-get-dataset-items-post), which can return HTTP 408 when a run exceeds 300 seconds. Use the asynchronous run API for larger workloads.

Equivalent cURL request (the command starts a billable run):

```bash
curl -fS -X POST \
  'https://api.apify.com/v2/acts/ingenuous_signature~korean-reviews-bundle/run-sync-get-dataset-items?maxTotalChargeUsd=0.15&timeout=120' \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"productIds":["A000000223414"],"maxReviewsPerProduct":10,"sortType":"USEFUL_SCORE_DESC"}'
```

## Output schema

The normalized dataset item contract is in [output.schema.json](output.schema.json). Each item includes `source`, `productId`, `reviewId`, `rating`, `text`, `date`, photo metadata, and `scrapedAt`. `reviewer` contains only optional skin-profile attributes, never reviewer names, account IDs, or profile images. Naver does not expose a helpful-vote count or skin profile in the review-list data, so those fields are zero/null/empty there. Verify the source sites' terms and applicable privacy requirements for your use.
