## The code

The code is made using Typescript. Why Typescript? Because it seemd to be growing a lot, it is used by Angular and I'd be able to use typedi and typeorm, libs that I'm working with now and make life much easier.

The structure is based on the [clean architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)

I've used MySQL, first because I wanted to use TypeORM and also because I'm learning SQL. I'd only rather use Postgres because of [jsonb](https://www.postgresql.org/docs/9.4/static/datatype-json.html).

The tests were made using [supertest](https://github.com/visionmedia/supertest).

## Differences from the specs

The only endpoint modified was `/movies/popular` (that originally was `/movie/popular`) because it was conflicting with `/movie/<id>`. The best solutiion I found after researching was to modify the endpoint.

Also, I can't say the test coverage is 80%, although I think it is. That's because I haven't created unit tests, but end-to-end and I don't know how code coverage tools see them. I've chosen e2e because it's easier to know if everything is wrapped up well and I wasn't able to start the unit tests (I'd like to have done them mainly on the datasources that are mocked on the tests I made).


## Todos

- There are some to-dos on the code, things I think deserve improvements.
- Ideally I'd test using a real database, not mock the datasources.
- Implement the unit tests.
- Use full text search for string queries (with care).