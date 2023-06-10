import { formatFiles, Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/angular/generators';
import { DataServiceGeneratorSchema } from './schema';
import { normalizeOptions } from '../../utils/normalize-options';
import { addFiles } from '../../utils/add-files';

export async function dataServiceGenerator(
  tree: Tree,
  options: DataServiceGeneratorSchema
) {
  const normalizedOptions = normalizeOptions({
    tree,
    options,
    tags: ['type:data-service'],
    directoryContainer: 'data-services',
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

export default dataServiceGenerator;
