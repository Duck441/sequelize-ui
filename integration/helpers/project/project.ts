import { DirectoryItem } from '@sequelize-ui/core/files'

export interface Project {
  build(directory: DirectoryItem, preinstall?: string): Promise<void>
  destroy(name: string): Promise<void>
}
