import blogSchema from '@src/data/schemas/blog'
import employeeTemporalDataSet from '@src/data/schemas/employeeTemporalDataset'
import sakila from '@src/data/schemas/sakila'
import {
  clearSchemas,
  createSchema,
  deleteSchema,
  getSchema,
  listSchemas,
  SCHEMA_NOT_FOUND_ERROR,
  updateSchema,
} from '../schema'

// TODO mock local storage failing to test error cases

describe('schema api', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('listSchemas', () => {
    it('should return an empty list when there is no storage', async () => {
      const schemas = await listSchemas()
      expect(schemas).toEqual([])
      expect(localStorage.length).toBe(0)
    })

    it('should return all created schemas', async () => {
      const schemaA = await createSchema(sakila)
      const schemaB = await createSchema(employeeTemporalDataSet)
      const schemas = await listSchemas()
      expect(schemas).toEqual([schemaA, schemaB])
    })

    it('should return a rejected promise when localStorage.getItem throws', () => {
      ;(localStorage.getItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('foo')
      })
      listSchemas().catch((e) => {
        expect(e).toEqual(new Error('foo'))
      })
    })
  })

  describe('getSchema', () => {
    it('return a rejected promise when there is no storage', async () => {
      getSchema('foo').catch((e) => {
        expect(e).toEqual(new Error(SCHEMA_NOT_FOUND_ERROR))
      })
    })

    it('return a rejected promise when schema does not exist', async () => {
      await createSchema(sakila)
      getSchema('foo').catch((e) => {
        expect(e).toEqual(new Error(SCHEMA_NOT_FOUND_ERROR))
      })
    })

    it('returns schema when it exists', async () => {
      const expectedSchema = await createSchema(sakila)
      const schema = await getSchema(expectedSchema.id)
      expect(schema).toEqual(expectedSchema)
    })
  })

  describe('createSchema', () => {
    it('creates new storage with new schema when no storage', async () => {
      const schema = await createSchema(sakila)
      expect(schema).toEqual({ ...sakila, id: schema.id })
      expect(localStorage.length).toEqual(1)
    })

    it('increments the schema name when other schema has name', async () => {
      await createSchema(sakila)
      const schema = await createSchema(sakila)
      expect(schema.name).toEqual(`${sakila.name} (1)`)
    })

    it('should return a rejected promise when localStorage.setItem throws', () => {
      ;(localStorage.setItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('foo')
      })
      createSchema(sakila).catch((e) => {
        expect(e).toEqual(new Error('foo'))
      })
    })
  })

  describe('updateSchema', () => {
    it('return a rejected promise when there is no storage', async () => {
      updateSchema(sakila).catch((e) => {
        expect(e).toEqual(new Error(SCHEMA_NOT_FOUND_ERROR))
      })
    })

    it('returns an error when there is storage, but schema does not exist', async () => {
      await createSchema(sakila)
      updateSchema(employeeTemporalDataSet).catch((e) => {
        expect(e).toEqual(new Error(SCHEMA_NOT_FOUND_ERROR))
      })
    })

    it('updates the schema when it exists', async () => {
      const existingSchema = await createSchema(sakila)

      const schema = await updateSchema({ ...existingSchema, name: 'foo' })
      expect(schema.name).toBe('foo')

      const persistedSchema = await getSchema(schema.id)
      expect(persistedSchema.name).toBe('foo')
    })

    it('removes targeting associations when removing a model', async () => {
      const existingSchema = await createSchema(blogSchema)

      // Assert the following to make sure test is valid
      // If schemas change, update test cases
      const post = existingSchema.models.find((m) => m.name === 'post')
      const user = existingSchema.models.find((m) => m.name === 'user')
      const postHasUserAssoc = post?.associations.some((a) => a.targetModelId === user?.id)
      expect(postHasUserAssoc).toBe(true)

      const schema = {
        ...existingSchema,
        models: existingSchema.models.filter((m) => m.id !== user?.id),
      }
      const updatedSchema = await updateSchema(schema)
      const updatedPost = updatedSchema.models.find((m) => m.id === post?.id)
      const updatedUser = updatedSchema.models.find((m) => m.id === user?.id)
      const updatedPostHasUserAssoc = updatedPost?.associations.some(
        (a) => a.targetModelId === user?.id,
      )

      expect(updatedUser).toBeUndefined()
      expect(updatedPostHasUserAssoc).toBe(false)
    })
  })

  describe('deleteSchema', () => {
    it('should have no effect when there is no storage', async () => {
      await deleteSchema('foo')
      expect(localStorage.length).toBe(0)
    })

    it('should return a rejected promise when schema does not exist', async () => {
      await createSchema(sakila)
      deleteSchema('foo').catch((e) => {
        expect(e).toEqual(new Error(SCHEMA_NOT_FOUND_ERROR))
      })
    })

    it('should remove a schema from storage', async () => {
      const expectedSchema = await createSchema(sakila)
      await deleteSchema(expectedSchema.id)
      getSchema(expectedSchema.id).catch((e) => {
        expect(e).toEqual(new Error(SCHEMA_NOT_FOUND_ERROR))
      })
    })
  })

  describe('clearSchemas', () => {
    it('should have no effect when there is no storage', async () => {
      await clearSchemas()
      expect(localStorage.length).toBe(0)
    })

    it('should return a rejected promise when localStorage.removeItem throws', async () => {
      ;(localStorage.removeItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('foo')
      })
      clearSchemas().catch((e) => {
        expect(e).toEqual(new Error('foo'))
      })
    })
  })
})
