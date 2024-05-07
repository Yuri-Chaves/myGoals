module.exports = function (plop) {
  // controller generator
  plop.setGenerator('icon', {
    description: 'create an icon.tsx file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'icon name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/assets/icons/tsx/{{pascalCase name}}.tsx',
        templateFile: 'templates/icon.tsx.hbs',
      },
      {
        type: 'modify',
        path: 'src/assets/icons/index.ts',
        pattern: /(\/\/ Icon exports)/g,
        template: "$1\nexport * from './tsx/{{pascalCase name}}'",
      },
      {
        type: 'modify',
        path: 'src/components/Icon/Icon.tsx',
        pattern: /(\/\/ Use Icon from Assets)/g,
        template: '$1\n\t{{camelCase name}}: icons.{{pascalCase name}},',
      },
    ],
  })
}
