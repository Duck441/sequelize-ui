import {
  AssociationTypeType,
  belongsToType,
  bigIntDataType,
  hasManyType,
  Model,
  Schema,
  ThroughType,
} from '@src/core/schema'
import { fromParts } from '@src/utils/dateTime'
import shortid from 'shortid'

const time = fromParts(2021, 7, 1)

const Id = {
  Category: shortid(),
  Post: shortid(),
  PostCategory: shortid(),
  PostTag: shortid(),
  Tag: shortid(),
} as const

const category: Model = {
  id: Id.Category,
  name: 'category',
  createdAt: time,
  updatedAt: time,
  fields: [],
  associations: [
    {
      id: shortid(),
      alias: 'parent',
      sourceModelId: Id.Category,
      targetModelId: Id.Category,
      type: belongsToType(),
    },
    {
      id: shortid(),
      alias: 'children',
      sourceModelId: Id.Category,
      targetModelId: Id.Category,
      type: hasManyType(),
    },
    {
      id: shortid(),
      sourceModelId: Id.Category,
      targetModelId: Id.PostCategory,
      type: hasManyType(),
    },
    {
      id: shortid(),
      sourceModelId: Id.Category,
      targetModelId: Id.Post,
      type: {
        type: AssociationTypeType.ManyToMany,
        through: { type: ThroughType.ThroughModel, modelId: Id.PostCategory },
      },
    },
  ],
}

const post: Model = {
  id: Id.Post,
  name: 'post',
  createdAt: time,
  updatedAt: time,
  fields: [],
  associations: [
    {
      id: shortid(),
      alias: 'parent',
      foreignKey: 'parent id',
      sourceModelId: Id.Post,
      targetModelId: Id.Post,
      type: belongsToType(),
    },
    {
      id: shortid(),
      alias: 'children',
      sourceModelId: Id.Post,
      targetModelId: Id.Post,
      type: hasManyType(),
    },
    {
      id: shortid(),
      sourceModelId: Id.Post,
      targetModelId: Id.PostCategory,
      type: hasManyType(),
    },
    {
      id: shortid(),
      sourceModelId: Id.Post,
      targetModelId: Id.Category,
      type: {
        type: AssociationTypeType.ManyToMany,
        through: { type: ThroughType.ThroughModel, modelId: Id.PostCategory },
      },
    },
    {
      id: shortid(),
      sourceModelId: Id.Post,
      targetModelId: Id.PostTag,
      type: hasManyType(),
    },
    {
      id: shortid(),
      sourceModelId: Id.Post,
      targetModelId: Id.Tag,
      type: {
        type: AssociationTypeType.ManyToMany,
        targetFk: 'tag_id',
        through: { type: ThroughType.ThroughTable, table: 'post_tag' },
      },
    },
  ],
}

const postCategory: Model = {
  id: Id.PostCategory,
  name: 'post category',
  createdAt: time,
  updatedAt: time,
  fields: [
    { id: shortid(), name: 'post id', type: bigIntDataType(), primaryKey: true },
    { id: shortid(), name: 'category id', type: bigIntDataType(), primaryKey: true },
  ],
  associations: [
    {
      id: shortid(),
      sourceModelId: Id.PostCategory,
      targetModelId: Id.Post,
      type: belongsToType(),
    },
    {
      id: shortid(),
      sourceModelId: Id.PostCategory,
      targetModelId: Id.Category,
      type: belongsToType(),
    },
  ],
}

const postTag: Model = {
  id: Id.PostTag,
  name: 'post tag',
  createdAt: time,
  updatedAt: time,
  fields: [],
  associations: [
    {
      id: shortid(),
      sourceModelId: Id.PostTag,
      targetModelId: Id.Post,
      type: belongsToType(),
    },
    {
      id: shortid(),
      sourceModelId: Id.PostTag,
      targetModelId: Id.Tag,
      type: belongsToType(),
    },
  ],
}

const tag: Model = {
  id: Id.Tag,
  name: 'tag',
  createdAt: time,
  updatedAt: time,
  fields: [],
  associations: [
    {
      id: shortid(),
      sourceModelId: Id.Tag,
      targetModelId: Id.PostTag,
      type: hasManyType(),
    },
    {
      id: shortid(),
      sourceModelId: Id.Tag,
      targetModelId: Id.Post,
      type: {
        type: AssociationTypeType.ManyToMany,
        through: { type: ThroughType.ThroughModel, modelId: Id.PostTag },
      },
    },
  ],
}

const associationsSchema: Schema = {
  id: shortid(),
  createdAt: time,
  updatedAt: time,
  name: 'associations',
  models: [category, post, postCategory, postTag, tag],
}

export default associationsSchema
