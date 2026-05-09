const spacesCount = 4;

const makeIndent = (depth, sign = '  ') => (
  ' '.repeat(depth * spacesCount - 2) + sign
);

const stringify = (value, depth) => {
  if (
    value === null
    || typeof value !== 'object'
    || Array.isArray(value)
  ) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => (
      `${' '.repeat((depth + 1) * spacesCount)}${key}: ${stringify(val, depth + 1)}`
    ),
  );

  return [
    '{',
    ...lines,
    `${' '.repeat(depth * spacesCount)}}`,
  ].join('\n');
};

const formatValue = (key, value, depth) => {
  const stringified = stringify(value, depth);

  return stringified === ''
    ? `${key}:`
    : `${key}: ${stringified}`;
};

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.flatMap((node) => {
      switch (node.type) {
        case 'added':
          return `${makeIndent(depth, '+ ')}${formatValue(node.key, node.value, depth)}`;

        case 'removed':
          return `${makeIndent(depth, '- ')}${formatValue(node.key, node.value, depth)}`;

        case 'unchanged':
          return `${makeIndent(depth, '  ')}${formatValue(node.key, node.value, depth)}`;

        case 'changed':
          return [
            `${makeIndent(depth, '- ')}${formatValue(node.key, node.oldValue, depth)}`,
            `${makeIndent(depth, '+ ')}${formatValue(node.key, node.newValue, depth)}`,
          ];

        case 'nested':
          return `${makeIndent(depth, '  ')}${node.key}: ${iter(node.children, depth + 1)}`;

        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    });

    return [
      '{',
      ...lines,
      `${' '.repeat((depth - 1) * spacesCount)}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;