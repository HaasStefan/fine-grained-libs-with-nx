import { libraryGenerator } from '@nx/angular/generators';
import {
  formatFiles,
  Tree,
} from '@nx/devkit';
import { addFiles } from '../../utils/add-files';
import { normalizeOptions } from '../../utils/normalize-options';
import { PipeGeneratorSchema } from './schema';

export async function pipeGenerator(tree: Tree, options: PipeGeneratorSchema) {
  const normalizedOptions = normalizeOptions({
    tree,
    options,
    tags: ['type:pipe'],
    directoryContainer: 'pipes',
  });

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.directory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
  });

  addFiles(tree, normalizedOptions, __dirname);

  await formatFiles(tree);
}

export default pipeGenerator;
