import { libraryGenerator } from '@nx/angular/generators';
import {
  formatFiles,
  Tree,
} from '@nx/devkit';
import { addFiles } from '../../utils/add-files';
import { normalizeOptions } from '../../utils/normalize-options';
import { FacadeGeneratorSchema } from './schema';

export async function facadeGenerator(
  tree: Tree,
  options: FacadeGeneratorSchema
) {
  const normalizedOptions = normalizeOptions({
    tree,
    options,
    tags: ['type:facade'],
    directoryContainer: 'facades',
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

export default facadeGenerator;
