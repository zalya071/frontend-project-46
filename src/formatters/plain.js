const isObject = value => (
  value !== null && typeof value === 'object'
)

const formatValue = value => {
  if (isObject(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return String(value)
}

const plain = tree => {
  const iter = (nodes, path = '') => {
    const lines = nodes.flatMap(node => {
      const property = path
        ? `${path}.${node.key}`
        : node.key

      switch (node.type) {
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(node.value)}`

        case 'removed':
          return `Property '${property}' was removed`

        case 'changed':
          return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`

        case 'nested':
          return iter(node.children, property)

        case 'unchanged':
          return []

        default:
          throw new Error(`Unknown type: ${node.type}`)
      }
    })

    return lines.join('\n')
  }

  return iter(tree)
}

export default plain
