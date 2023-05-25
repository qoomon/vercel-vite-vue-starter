# Vercel Vite Vue Starter

## Project Structure
- root folder is a common vite vue project
- `api` folder contains the vercel serverless functions [vercel docs](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
  - for using path parameters see [vercel docs](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes) or [vercel docs](https://vercel.com/docs/concepts/functions/serverless-functions/quickstart#using-path-segments) or [vercel docs](https://vercel.com/docs/serverless-functions/introduction#path-parameters)
    - you ca also use an express app a serverless function by add routes in `vercel.json` like this:
      ```json 
        {
          "routes": [{
          "src": "/api/(.*)",
          "dest": "api/[[...slug]].ts"
          }]
        }
        ```

### Run Local
```sh
npm install

npx vercel dev
```

### Operations Notes
- Delete all secrets from redis:
  - `EVAL "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 *`
