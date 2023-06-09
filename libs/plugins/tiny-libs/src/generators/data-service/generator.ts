import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { libraryGenerator } from '@nx/angular/generators';
import { DataServiceGeneratorSchema } from './schema';

interface NormalizedSchema extends DataServiceGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  domainDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(tree: Tree, options: DataServiceGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  options.directory = options.directory ? `${options.directory}/data-services` : 'data-services';
  const projectDirectory = `${names(options.directory).fileName}/${name}`;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const workspaceDirectory = `${getWorkspaceLayout(tree).libsDir}/${options.directory}`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = ['type:data-service'];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    domainDirectory: workspaceDirectory,
    parsedTags
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    template: ''
  };
  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export async function dataServiceGenerator(
  tree: Tree,
  options: DataServiceGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.directory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true
  });

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);
}

export default dataServiceGenerator;
