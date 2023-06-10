import { libraryGenerator } from '@nx/angular/generators';
import {
  formatFiles,
  Tree,
} from '@nx/devkit';
import { addFiles } from '../../utils/add-files';
import { normalizeOptions } from '../../utils/normalize-options';
import { ModelGeneratorSchema } from './schema';

export async function modelGenerator(
  tree: Tree,
  options: ModelGeneratorSchema
) {
  const normalizedOptions = normalizeOptions({
    tree,
    options,
    tags: ['type:model'],
    directoryContainer: 'models',
  });

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.directory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
    buildable: true
  });

  addFiles(tree, normalizedOptions, __dirname);

  await formatFiles(tree);
}

export default modelGenerator;
