import { libraryGenerator } from '@nx/angular/generators';
import { formatFiles, names, Tree } from '@nx/devkit';
import { addFiles } from '../../utils/add-files';
import { normalizeOptions } from '../../utils/normalize-options';
import { DumbComponentGeneratorSchema } from './schema';

export async function dumbComponentGenerator(
  tree: Tree,
  options: DumbComponentGeneratorSchema
) {
  const normalizedOptions = normalizeOptions({
    tree,
    options,
    tags: ['type:dumb-component'],
    directoryContainer: 'dumb-components',
  });

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.directory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
    buildable: true,
  });

  addFiles(tree, normalizedOptions, __dirname, {
    componentSelector: normalizedOptions.originalDirectory
      ? `${normalizedOptions.npmScope}-${normalizedOptions.originalDirectory.replace('/', '-')}-${
          names(normalizedOptions.name).fileName
        }`
      : `${normalizedOptions.npmScope}-${
          names(normalizedOptions.name).fileName
        }`
  });

  await formatFiles(tree);
}

export default dumbComponentGenerator;
