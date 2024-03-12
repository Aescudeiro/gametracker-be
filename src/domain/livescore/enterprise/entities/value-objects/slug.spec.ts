import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example of a slug')

  expect(slug.value).toEqual('example-of-a-slug')
})
