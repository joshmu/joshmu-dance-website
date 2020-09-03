// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async (req, res) => {
  fetch(
    'https://www.instagram.com/graphql/query/?query_hash=bfa387b2992c3a52dcbe447467b4b771&variables=%7B%22id%22%3A%2213112419%22%2C%22first%22%3A12%2C%22after%22%3A%22QVFEQS04b2VWZ2R2dGlwdTdKTW5zSE4zWkp0ekUyVUZjZUtUSzlZVkpWTVlORzgtQlFjY24zczhSWmZ3cExQMjR4eFJ1WHNtS2VnVm1YYnZmQ2YzV1FINw%3D%3D%22%7D',
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB,en;q=0.9',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-csrftoken': 'cfY7zdBJ6i6SVnTTjgROSk4inRWe2rGv',
        'x-ig-app-id': '936619743392459',
        'x-ig-www-claim': '0',
        'x-requested-with': 'XMLHttpRequest',
        cookie:
          'ig_did=76A2BBCC-751F-472C-B12A-CB2BDD7C87F5; csrftoken=cfY7zdBJ6i6SVnTTjgROSk4inRWe2rGv; mid=X1BrqgAEAAHZv3IN2fceG1p69gTR; urlgen="{\\"2001:8003:683f:db01:c884:8c51:a963:6075\\": 1221}:1kDgqT:C6q7P6YMXU7VIp49sZgnkvXIr2M"',
      },
      referrer: 'https://www.instagram.com/joshmu/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
    }
  )
    .then(res => res.json())
    .then(json => {
      res.statusCode = 200
      res.json(json)
    })
}
