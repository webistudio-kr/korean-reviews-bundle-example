const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set APIFY_TOKEN in your environment.');
    process.exitCode = 1;
} else {
    const input = {
        productIds: ['A000000223414'],
        maxReviewsPerProduct: 10,
        sortType: 'USEFUL_SCORE_DESC',
    };
    const url = 'https://api.apify.com/v2/acts/ingenuous_signature~korean-reviews-bundle/run-sync-get-dataset-items?maxTotalChargeUsd=0.15&timeout=120';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(300_000),
    });
    if (!response.ok) {
        console.error(`Apify returned HTTP ${response.status}. Check the run in Console.`);
        process.exitCode = 1;
    } else {
        const reviews = await response.json();
        console.log(JSON.stringify(reviews, null, 2));
    }
}
