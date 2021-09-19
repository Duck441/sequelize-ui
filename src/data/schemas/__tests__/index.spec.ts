import { DemoSchemaType, displayDemoSchemaType } from '..'

describe('data/schemas', () => {
  describe('displayDemoSchemaType', () => {
    const cases: [type: DemoSchemaType, expected: string][] = [
      [DemoSchemaType.Blog, 'Blog'],
      [DemoSchemaType.Sakila, 'Sakila'],
      [DemoSchemaType.Employee, 'Employee Dataset'],
    ]

    it.each(cases)('displayDemoSchemaType(%s) === %s', (type, expected) => {
      expect(displayDemoSchemaType(type)).toBe(expected)
    })
  })
})
