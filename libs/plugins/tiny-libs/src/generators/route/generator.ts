import { libraryGenerator } from '@nx/angular/generators';
import { formatFiles, names, Tree } from '@nx/devkit';
import { addFiles } from '../../utils/add-files';
import { firstLetterLowerCase } from '../../utils/first-letter-lowercase';
import { normalizeOptions } from '../../utils/normalize-options';
import { RouteGeneratorSchema } from './schema';

export async function routeGenerator(
  tree: Tree,
  options: RouteGeneratorSchema
) {
  const normalizedOptions = normalizeOptions({
    tree,
    options,
    tags: ['type:route'],
    directoryContainer: 'routes',
  });

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.directory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
    buildable: true,
  });

  addFiles(tree, normalizedOptions, __dirname, {
    routeConstPrefix: firstLetterLowerCase(
      names(normalizedOptions.name).className
    ),
  });

  await formatFiles(tree);
}

export default routeGenerator;
