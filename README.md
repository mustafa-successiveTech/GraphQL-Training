## REST vs GraphQL
### Feature / Aspect	        REST API	        GraphQL API
Data Fetching ->	Fixed endpoints return predefined data structures — can lead to over-fetching or under-fetching.  ->	Clients request exactly the fields they need in a single query, avoiding extra or missing data.
Endpoints ->	Multiple endpoints (e.g., /users, /users/:id/posts). ->	Single endpoint (/graphql) handles all queries and mutations.
Nested Data	-> Requires multiple requests or server-side joins.	-> Can fetch deeply nested data in one query.
Versioning	-> New versions via new endpoints (e.g., /v2/users).	-> No versioning — schema evolves via type changes while keeping backward compatibility.
Payload Size -> May include unnecessary fields.	-> Returns only requested fields, reducing payload size.
Flexibility	-> Low flexibility — server decides the shape of data.	-> High flexibility — client controls data shape.
Performance	-> Can require multiple network calls for related resources.	-> Single network call can retrieve related data, reducing latency.
Error Handling	-> HTTP status codes & responses.	-> Error object returned alongside partial data.
Learning Curve	-> Easier for beginners (familiar with REST conventions).	-> Requires learning GraphQL syntax, schemas, resolvers.

## Emphasize how GraphQL addresses common issues like over-fetching and under-fetching of data.Provide measurable metrics or examples showcasing the benefits of using GraphQL in terms of data efficiency.

Over-fetching happens when an API returns more data than needed, while under-fetching requires multiple requests to get complete information.
REST often faces these issues because endpoints return fixed data structures.
GraphQL solves both problems by letting the client specify exactly which fields to return and by fetching related data in a single query.
For example, to get a user’s name, email, and latest 3 post titles:

REST: 2 requests, ~2.5 KB payload, ~350 ms total time.

GraphQL: 1 request, ~0.5 KB payload, ~150 ms total time.

This means ~50% fewer calls, ~80% smaller payload, and ~57% faster responses, making GraphQL significantly more data-efficient.